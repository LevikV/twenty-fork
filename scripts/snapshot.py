#!/usr/bin/env python3
"""Снимок конфигурации CRM: воркфлоу (с исходниками CODE-шагов) и метаданные.

Читает боевую БД через docker exec и кладёт рядом два файла:

    snapshots/workflows.json   — все воркфлоу, версии, шаги и код шагов
    snapshots/metadata.json    — объекты, поля, вьюхи, лейауты, роли

Файлы перезаписываются целиком: обычный git diff показывает, что изменилось.

Запуск: python3 scripts/snapshot.py [--out DIR]
"""
from __future__ import annotations

import argparse
import json
import subprocess
import sys
from datetime import datetime, timezone
from pathlib import Path

DB_CONTAINER = "twenty-db-1"
SRV_CONTAINER = "twenty-server-1"
STORAGE = "/app/packages/twenty-server/.local-storage"

# Таблицы метаданных: имя в core.* -> ключ в метаданных.
METADATA_TABLES = {
    "objectMetadata": "objects",
    "fieldMetadata": "fields",
    "indexFieldMetadata": "indexFields",
    "searchFieldMetadata": "searchFields",
    "view": "views",
    "viewField": "viewFields",
    "viewFieldGroup": "viewFieldGroups",
    "viewFilter": "viewFilters",
    "viewFilterGroup": "viewFilterGroups",
    "viewGroup": "viewGroups",
    "viewSort": "viewSorts",
    "pageLayout": "pageLayouts",
    "pageLayoutTab": "pageLayoutTabs",
    "pageLayoutWidget": "pageLayoutWidgets",
    "role": "roles",
    "rolePermissionFlag": "rolePermissionFlags",
    "roleTarget": "roleTargets",
}


def psql(sql: str) -> str:
    result = subprocess.run(
        ["docker", "exec", DB_CONTAINER, "psql", "-U", "postgres", "-d", "default",
         "-t", "-A", "-v", "ON_ERROR_STOP=1", "-c", sql],
        capture_output=True, text=True, check=True,
    )
    return result.stdout.strip()


def psql_json(sql: str):
    raw = psql(sql)
    return json.loads(raw) if raw else []


def read_storage_file(path: str) -> str | None:
    result = subprocess.run(
        ["docker", "exec", SRV_CONTAINER, "cat", path],
        capture_output=True, text=True,
    )
    return result.stdout if result.returncode == 0 else None


def build_workflows() -> dict:
    workflows = psql_json(
        """
        SELECT coalesce(json_agg(row_to_json(t)), '[]'::json)
        FROM (
          SELECT w.id, w.name, w."universalIdentifier", w."lastPublishedVersionId",
                 w."createdAt", w."updatedAt"
          FROM core."workflow" w
          ORDER BY w."createdAt"
        ) t
        """
    )

    # Версии берём ВСЕ: часть строк не связана с core."workflow" (наследие
    # пересборки схемы), но именно там лежит логика и активные триггеры.
    versions = psql_json(
        """
        SELECT coalesce(json_agg(row_to_json(t) ORDER BY t."createdAt"), '[]'::json)
        FROM (
          SELECT id, "workflowId", status, triggers, steps,
                 "universalIdentifier", "applicationId", "createdAt", "updatedAt"
          FROM core."workflowVersion"
        ) t
        """
    )

    by_workflow: dict[str, list] = {}
    for version in versions:
        by_workflow.setdefault(version.get("workflowId"), []).append(version)

    for workflow in workflows:
        workflow["versions"] = by_workflow.pop(workflow["id"], [])

    orphans = [
        {"workflowId": key, "versions": value} for key, value in by_workflow.items()
    ]

    # Исходники CODE-шагов лежат в локальном хранилище, а не в БД.
    function_ids: dict[str, str] = {}
    for version in versions:
        for step in version.get("steps") or []:
            if step.get("type") != "CODE":
                continue
            fn_id = ((step.get("settings") or {}).get("input") or {}).get("logicFunctionId")
            if fn_id:
                function_ids[fn_id] = step.get("name") or fn_id

    sources: dict[str, dict] = {}
    if function_ids:
        ids = ",".join(f"'{fid}'" for fid in function_ids)
        meta = psql_json(
            f"""
            SELECT coalesce(json_agg(row_to_json(t)), '[]'::json)
            FROM (
              SELECT id, name, "applicationId", "sourceHandlerPath", "builtHandlerPath"
              FROM core."logicFunction" WHERE id IN ({ids})
            ) t
            """
        )
        for row in meta:
            path = f"{STORAGE}/{row['applicationId']}/{row['sourceHandlerPath']}"
            sources[row["id"]] = {
                "name": row["name"],
                "applicationId": row["applicationId"],
                "sourceHandlerPath": row["sourceHandlerPath"],
                "source": read_storage_file(path),
            }

    return {
        "takenAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "count": len(workflows),
        "published": sum(
            1 for w in workflows
            if any(v["id"] == w.get("lastPublishedVersionId") for v in versions)
        ),
        "versions": len(versions),
        "activeVersions": sum(1 for v in versions if v.get("status") == "ACTIVE"),
        "orphanVersions": len(versions) - int(sum(len(w["versions"]) for w in workflows)),
        "codeSteps": len(sources),
        "workflows": workflows,
        "unlinkedVersions": orphans,
        "codeSources": sources,
    }


def build_metadata() -> dict:
    result: dict = {
        "takenAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "counts": {},
    }
    for table, key in METADATA_TABLES.items():
        rows = psql_json(
            f'SELECT coalesce(json_agg(row_to_json(t)), \'[]\'::json) FROM core."{table}" t'
        )
        result[key] = rows
        result["counts"][key] = len(rows)
    return result


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default=str(Path(__file__).resolve().parent.parent / "snapshots"))
    args = parser.parse_args()

    out = Path(args.out)
    out.mkdir(parents=True, exist_ok=True)

    workflows = build_workflows()
    (out / "workflows.json").write_text(
        json.dumps(workflows, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print(f"workflows.json: {workflows['count']} воркфлоу, "
          f"опубликовано {workflows['published']}, исходников CODE-шагов {workflows['codeSteps']}")

    metadata = build_metadata()
    (out / "metadata.json").write_text(
        json.dumps(metadata, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    print("metadata.json: " + ", ".join(f"{k}={v}" for k, v in metadata["counts"].items()))

    return 0


if __name__ == "__main__":
    sys.exit(main())
