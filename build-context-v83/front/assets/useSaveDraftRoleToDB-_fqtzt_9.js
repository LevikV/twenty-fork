import{o as z}from"./chunk-ChpBd9eV.js";import{t as H}from"./react-M6yZRsSc.js";import{t as X}from"./build-CngeiE9P.js";import{a as Z}from"./react-BWmhvO0Y.js";import{t as d}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{Rt as G}from"./utils-C-F-i_VV-RBaWegpX.js";import{J as ee,Ji as ae,Oi as te,Vi as se,Yi as oe,l as ie,qi as re,u as ne}from"./graphql-CCxCy0BQ.js";import{t as P}from"./lib-C3IpGLsk.js";import{t as b}from"./useMutation-BKdjtPjp.js";import{t as ce}from"./isDeeplyEqual-B5T_3Aeb.js";import{t as j}from"./useAtomFamilyStateValue-C93FaFzM.js";import{t as D}from"./useSetAtomFamilyState-C9FPh-tj.js";import{t as f}from"./getOperationName-Ddz1PZ_Z.js";import{jo as de}from"./index-BTwh_iuN.js";import{a as g,i as N}from"./SettingsRolesQueryEffect-DSvdaY4M.js";var _=P`
  fragment RowLevelPermissionPredicateFragment on RowLevelPermissionPredicate {
    id
    fieldMetadataId
    objectMetadataId
    operand
    subFieldName
    workspaceMemberFieldMetadataId
    workspaceMemberSubFieldName
    rowLevelPermissionPredicateGroupId
    positionInRowLevelPermissionPredicateGroup
    roleId
    value
  }
`,k=P`
  fragment RowLevelPermissionPredicateGroupFragment on RowLevelPermissionPredicateGroup {
    id
    parentRowLevelPermissionPredicateGroupId
    logicalOperator
    positionInRowLevelPermissionPredicateGroup
    roleId
    objectMetadataId
  }
`,le=P`
  ${_}
  ${k}
  mutation UpsertRowLevelPermissionPredicates(
    $input: UpsertRowLevelPermissionPredicatesInput!
  ) {
    upsertRowLevelPermissionPredicates(input: $input) {
      predicates {
        ...RowLevelPermissionPredicateFragment
      }
      predicateGroups {
        ...RowLevelPermissionPredicateGroupFragment
      }
    }
  }
`,pe=()=>b(le),me=P`
  fragment AgentFields on Agent {
    id
    name
    label
    description
    icon
    prompt
    modelId
    responseFormat
    roleId
    isCustom
    modelConfiguration
    evaluationInputs
    applicationId
    createdAt
    updatedAt
  }
`,Re=P`
  fragment ApiKeyForRoleFragment on ApiKeyForRole {
    id
    name
    expiresAt
    revokedAt
  }
`,ue=P`
  fragment FieldPermissionFragment on FieldPermission {
    objectMetadataId
    fieldMetadataId
    canReadFieldValue
    canUpdateFieldValue
    id
    roleId
  }
`,Pe=P`
  fragment ObjectPermissionFragment on ObjectPermission {
    objectMetadataId
    canReadObjectRecords
    canUpdateObjectRecords
    canSoftDeleteObjectRecords
    canDestroyObjectRecords
    restrictedFields
    rowLevelPermissionPredicates {
      ...RowLevelPermissionPredicateFragment
    }
    rowLevelPermissionPredicateGroups {
      ...RowLevelPermissionPredicateGroupFragment
    }
  }
  ${_}
  ${k}
`,fe=P`
  fragment RolePermissionFlagFragment on RolePermissionFlag {
    id
    flag
    roleId
  }
`,Ae=P`
  fragment RoleFragment on Role {
    id
    label
    description
    icon
    canUpdateAllSettings
    canAccessAllTools
    isEditable
    canReadAllObjectRecords
    canUpdateAllObjectRecords
    canSoftDeleteAllObjectRecords
    canDestroyAllObjectRecords
    canBeAssignedToUsers
    canBeAssignedToAgents
    canBeAssignedToApiKeys
  }
`,be=P`
  fragment PartialWorkspaceMemberQueryFragment on WorkspaceMember {
    id
    name {
      firstName
      lastName
    }
    avatarUrl
    userEmail
    userWorkspaceId
  }
`,A=P`
  ${be}
  ${Ae}
  ${me}
  ${Re}
  ${fe}
  ${Pe}
  ${ue}
  ${_}
  ${k}
  query GetRoles {
    getRoles {
      ...RoleFragment
      workspaceMembers {
        ...PartialWorkspaceMemberQueryFragment
      }
      agents {
        ...AgentFields
      }
      apiKeys {
        ...ApiKeyForRoleFragment
      }
      permissionFlags {
        ...RolePermissionFlagFragment
      }
      objectPermissions {
        ...ObjectPermissionFragment
      }
      fieldPermissions {
        ...FieldPermissionFragment
      }
      rowLevelPermissionPredicates {
        ...RowLevelPermissionPredicateFragment
      }
      rowLevelPermissionPredicateGroups {
        ...RowLevelPermissionPredicateGroupFragment
      }
    }
  }
`,ge=e=>{const r=j(g,e),o=D(g,e),[n]=b(ie);return{addAgentToRoleAndUpdateState:async({agentId:l})=>{const{data:c}=await n({variables:{agentId:l,roleId:e},awaitRefetchQueries:!0,refetchQueries:["GetRoles"]});return c?.assignRoleToAgent},updateAgentRoleDraftState:({agent:l})=>{o({...r,agents:[...r.agents,l]})},addAgentsToRole:async({roleId:l,agentIds:c})=>{await Promise.all(c.map(u=>n({variables:{roleId:l,agentId:u}})))}}},ve=e=>{const r=j(g,e),o=D(g,e),[n]=b(ne);return{addApiKeyToRoleAndUpdateState:async({apiKeyId:l})=>{const{data:c}=await n({variables:{apiKeyId:l,roleId:e},awaitRefetchQueries:!0,refetchQueries:["GetRoles"]});return c?.assignRoleToApiKey},updateApiKeyRoleDraftState:({apiKey:l})=>{o({...r,apiKeys:[...r.apiKeys,l]})},addApiKeysToRole:async({roleId:l,apiKeyIds:c})=>{await Promise.all(c.map(u=>n({variables:{roleId:l,apiKeyId:u}})))}}},Fe=e=>{const r=D(N,e),o=j(g,e),n=D(g,e),[p]=b(se);return{addWorkspaceMemberToRoleAndUpdateState:async({workspaceMemberId:c})=>{const{data:u}=await p({variables:{workspaceMemberId:c,roleId:e}});if(u?.updateWorkspaceMemberRole!==void 0){const F=u.updateWorkspaceMemberRole,U=[...o.workspaceMembers,{id:F.id,name:F.name,colorScheme:F.colorScheme,userEmail:F.userEmail}],O={...o,workspaceMembers:U};r(O),n(O)}return u?.updateWorkspaceMemberRole},updateWorkspaceMemberRoleDraftState:({workspaceMember:c})=>{n({...o,workspaceMembers:[...o.workspaceMembers,{id:c.id,name:c.name,userEmail:c.userEmail,avatarUrl:c.avatarUrl}]})},addWorkspaceMembersToRole:async({roleId:c,workspaceMemberIds:u})=>{await Promise.all(u.map(F=>p({variables:{roleId:c,workspaceMemberId:F}})))}}},we=X(),Me=(e,r)=>de(e,o=>{if(!(0,we.isNonEmptyArray)(o.fieldPermissions))return;const n=o.fieldPermissions.findIndex(p=>p.fieldMetadataId===r);return n>-1&&o.fieldPermissions.splice(n,1),o}),Oe=z(H(),1),Ie=()=>{const e=Z();return{removeFieldPermissionInDraftRole:(0,Oe.useCallback)((r,o)=>{const n=Me(e.get(g.atomFamily(r)),o);e.set(g.atomFamily(r),n)},[e])}},je=(e,r)=>{const o=r?.find(n=>n.fieldMetadataId===e.fieldMetadataId);return o?e.canReadFieldValue!==o.canReadFieldValue||e.canUpdateFieldValue!==o.canUpdateFieldValue:!0},ye=(e,r)=>{if(!r)return Object.fromEntries(Object.entries(e).filter(([,p])=>p!==void 0));const o={},n=new Set([...Object.keys(e),...Object.keys(r)]);for(const p of n){const v=e[p],M=r[p];ce(v,M)||(o[p]=v)}return o},Te=["label","description","icon","canUpdateAllSettings","canAccessAllTools","canReadAllObjectRecords","canUpdateAllObjectRecords","canSoftDeleteAllObjectRecords","canDestroyAllObjectRecords","canBeAssignedToUsers","canBeAssignedToAgents","canBeAssignedToApiKeys"],Ce=({roleId:e,isCreateMode:r,onSuccess:o})=>{const[n]=b(ee),[p]=b(te),[v]=b(oe),[M]=b(ae),[l]=b(re),[c]=pe(),{addWorkspaceMembersToRole:u}=Fe(e),{addAgentsToRole:F}=ge(e),{addApiKeysToRole:U}=ve(e),O=j(N,e),a=j(g,e),m=ye(a,O),L=a.fieldPermissions?.filter(t=>{const s=!O?.fieldPermissions?.some(T=>T.fieldMetadataId===t.fieldMetadataId);return t.canReadFieldValue!==!1&&t.canUpdateFieldValue!==!1&&s}),y=(m.fieldPermissions?.filter(t=>!L?.some(s=>t.fieldMetadataId===s.fieldMetadataId))??[]).filter(t=>je(t,O?.fieldPermissions)),{removeFieldPermissionInDraftRole:W}=Ie(),h=()=>{if(G(L)===!0)for(const t of L)W(e,t.fieldMetadataId)},V=async()=>{const{data:t}=await n({variables:{createRoleInput:{id:e,label:a.label,description:a.description,icon:a.icon,canUpdateAllSettings:a.canUpdateAllSettings,canAccessAllTools:a.canAccessAllTools,canReadAllObjectRecords:a.canReadAllObjectRecords,canUpdateAllObjectRecords:a.canUpdateAllObjectRecords,canSoftDeleteAllObjectRecords:a.canSoftDeleteAllObjectRecords,canDestroyAllObjectRecords:a.canDestroyAllObjectRecords,canBeAssignedToUsers:a.canBeAssignedToUsers,canBeAssignedToAgents:a.canBeAssignedToAgents,canBeAssignedToApiKeys:a.canBeAssignedToApiKeys}},refetchQueries:[f(A)??""]});if(!t)return;const s=t.createOneRole.id;await $(s),await C(s),d(o)&&await o(s)},Q=async()=>{d(m.permissionFlags)&&await v({variables:{upsertPermissionFlagsInput:{roleId:e,permissionFlagKeys:a.permissionFlags?.map(t=>t.flag)??[]}},refetchQueries:[f(A)??""]}),Te.some(t=>t in m)&&await p({variables:{updateRoleInput:{id:e,update:{label:a.label,description:a.description,icon:a.icon,canUpdateAllSettings:a.canUpdateAllSettings,canAccessAllTools:a.canAccessAllTools,canReadAllObjectRecords:a.canReadAllObjectRecords,canUpdateAllObjectRecords:a.canUpdateAllObjectRecords,canSoftDeleteAllObjectRecords:a.canSoftDeleteAllObjectRecords,canDestroyAllObjectRecords:a.canDestroyAllObjectRecords,canBeAssignedToUsers:a.canBeAssignedToUsers,canBeAssignedToAgents:a.canBeAssignedToAgents,canBeAssignedToApiKeys:a.canBeAssignedToApiKeys}}},refetchQueries:[f(A)??""]}),d(m.objectPermissions)&&await M({variables:{upsertObjectPermissionsInput:{roleId:e,objectPermissions:a.objectPermissions?.map(t=>({objectMetadataId:t.objectMetadataId,canReadObjectRecords:t.canReadObjectRecords,canUpdateObjectRecords:t.canUpdateObjectRecords,canSoftDeleteObjectRecords:t.canSoftDeleteObjectRecords,canDestroyObjectRecords:t.canDestroyObjectRecords}))??[]}},refetchQueries:[f(A)??""]}),G(y)===!0&&await l({variables:{upsertFieldPermissionsInput:{roleId:e,fieldPermissions:y.map(t=>({objectMetadataId:t.objectMetadataId,fieldMetadataId:t.fieldMetadataId,canReadFieldValue:t.canReadFieldValue,canUpdateFieldValue:t.canUpdateFieldValue}))??[]}},refetchQueries:[f(A)??""]}),(d(m.rowLevelPermissionPredicates)||d(m.rowLevelPermissionPredicateGroups))&&await K(e)},K=async t=>{const s=a.rowLevelPermissionPredicates??[],T=a.rowLevelPermissionPredicateGroups??[],E=s.reduce((R,I)=>{const w=I.objectMetadataId;return d(R[w])||(R[w]=[]),R[w].push(I),R},{}),x=O?.rowLevelPermissionPredicates??[],q=new Set(x.map(R=>R.objectMetadataId));for(const R of q)d(E[R])||(E[R]=[]);for(const[R,I]of Object.entries(E)){const w=new Set(I.map(i=>i.rowLevelPermissionPredicateGroupId).filter(d)),B=i=>{const S=T.find(J=>J.id===i);d(S?.parentRowLevelPermissionPredicateGroupId)&&!w.has(S.parentRowLevelPermissionPredicateGroupId)&&(w.add(S.parentRowLevelPermissionPredicateGroupId),B(S.parentRowLevelPermissionPredicateGroupId))};for(const i of w)B(i);const Y=T.filter(i=>w.has(i.id));await c({variables:{input:{roleId:t,objectMetadataId:R,predicates:I.map(i=>({id:i.id,fieldMetadataId:i.fieldMetadataId,operand:i.operand,value:i.value,subFieldName:i.subFieldName,workspaceMemberFieldMetadataId:i.workspaceMemberFieldMetadataId,workspaceMemberSubFieldName:i.workspaceMemberSubFieldName,rowLevelPermissionPredicateGroupId:i.rowLevelPermissionPredicateGroupId,positionInRowLevelPermissionPredicateGroup:i.positionInRowLevelPermissionPredicateGroup})),predicateGroups:Y.map(i=>({id:i.id,objectMetadataId:R,parentRowLevelPermissionPredicateGroupId:i.parentRowLevelPermissionPredicateGroupId,logicalOperator:i.logicalOperator,positionInRowLevelPermissionPredicateGroup:i.positionInRowLevelPermissionPredicateGroup}))}},refetchQueries:[f(A)??""],awaitRefetchQueries:!0})}},$=async t=>{d(m.permissionFlags)&&await v({variables:{upsertPermissionFlagsInput:{roleId:t,permissionFlagKeys:a.permissionFlags?.map(s=>s.flag)??[]}},refetchQueries:[f(A)??""]}),d(m.objectPermissions)&&await M({variables:{upsertObjectPermissionsInput:{roleId:t,objectPermissions:a.objectPermissions?.map(s=>({objectMetadataId:s.objectMetadataId,canReadObjectRecords:s.canReadObjectRecords,canUpdateObjectRecords:s.canUpdateObjectRecords,canSoftDeleteObjectRecords:s.canSoftDeleteObjectRecords,canDestroyObjectRecords:s.canDestroyObjectRecords}))??[]}},refetchQueries:[f(A)??""]}),G(y)===!0&&await l({variables:{upsertFieldPermissionsInput:{roleId:t,fieldPermissions:y.map(s=>({objectMetadataId:s.objectMetadataId,fieldMetadataId:s.fieldMetadataId,canReadFieldValue:s.canReadFieldValue,canUpdateFieldValue:s.canUpdateFieldValue}))??[]}},refetchQueries:[f(A)??""]}),(d(m.rowLevelPermissionPredicates)||d(m.rowLevelPermissionPredicateGroups))&&await K(t)},C=async t=>{d(m.workspaceMembers)&&a.canBeAssignedToUsers&&await u({roleId:t,workspaceMemberIds:a.workspaceMembers.map(s=>s.id)}),d(m.agents)&&a.canBeAssignedToAgents&&await F({roleId:t,agentIds:a.agents.map(s=>s.id)}),d(m.apiKeys)&&a.canBeAssignedToApiKeys&&await U({roleId:t,apiKeyIds:a.apiKeys.map(s=>s.id)}),d(o)&&await o(e)};return{saveDraftRoleToDB:async()=>{h(),r?await V():await Q()}}};export{ge as a,ve as i,ye as n,A as o,Fe as r,Ce as t};
