"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "NotificationModule", {
    enumerable: true,
    get: function() {
        return NotificationModule;
    }
});
const _common = require("@nestjs/common");
const _notificationgateway = require("./notification.gateway");
const _notificationcontroller = require("./notification.controller");
const _tokenmodule = require("../../engine/core-modules/auth/token/token.module");
const _workspacecachestoragemodule = require("../../engine/workspace-cache-storage/workspace-cache-storage.module");
function _ts_decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for(var i = decorators.length - 1; i >= 0; i--)if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}
// notify-v50: модуль импортирует TokenModule и WorkspaceCacheStorageModule,
// чтобы работал JwtAuthGuard на эндпоинтах /api/notify/mine и /api/notify/read.
let NotificationModule = class NotificationModule {
};
NotificationModule = _ts_decorate([
    (0, _common.Module)({
        imports: [
            _tokenmodule.TokenModule,
            _workspacecachestoragemodule.WorkspaceCacheStorageModule
        ],
        providers: [
            _notificationgateway.NotificationGateway
        ],
        controllers: [
            _notificationcontroller.NotificationController
        ]
    })
], NotificationModule);

//# sourceMappingURL=notification.module.js.map
