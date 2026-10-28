import{B as f,I as o}from"./types-BBcIjWv6-CvFpKS1r.js";import{t as a}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{en as y,i as $,q as R}from"./utils-C-F-i_VV-RBaWegpX.js";import{Kt as E}from"./graphql-CCxCy0BQ.js";import{t as T}from"./isUndefinedOrNull-BgCnd9uY.js";import{n as l}from"./useObjectPermissions-D7ohHxW1.js";import{t as h}from"./isNonCompositeField-DegAGlcp.js";var _=t=>t.type===o.MORPH_RELATION?(t.morphRelations??[]).map(e=>$({fieldName:t.name,relationType:e.type,targetObjectMetadataNameSingular:e.targetObjectMetadata.nameSingular,targetObjectMetadataNamePlural:e.targetObjectMetadata.namePlural})):[y({name:t.name})],C=({objectMetadataItems:t,gqlField:e,fieldMetadata:n,relationRecordGqlFields:O,computeReferences:u=!1,objectPermissionsByObjectMetadataId:m})=>{const s=n.type;if(h(s))return e;if(s===o.MORPH_RELATION&&(n.settings?.relationType===f.ONE_TO_MANY||n.settings?.relationType===f.MANY_TO_ONE)){let p="";for(const r of n.morphRelations??[]){const i=R({fieldName:n.name,relationType:n.settings?.relationType,targetObjectMetadataNameSingular:r.targetObjectMetadata.nameSingular,targetObjectMetadataNamePlural:r.targetObjectMetadata.namePlural}),N=t.find(L=>L.id===r.targetObjectMetadata.id);if(a(N)){if(a(m)&&a(N.id)){if(!a(r.targetObjectMetadata.id))throw new Error(`Target object metadata id not found with field metadata ${n.name}`);if(!l(m,r.targetObjectMetadata.id).canReadObjectRecords)continue}if(n.settings?.relationType===f.ONE_TO_MANY){if(e!==i)continue;p+=`${i}
{
  edges {
    node ${c({objectMetadataItems:t,objectMetadataItem:N,recordGqlFields:O,computeReferences:u,isRootLevel:!1,objectPermissionsByObjectMetadataId:m})}
  }
}`}if(n.settings?.relationType===f.MANY_TO_ONE){if(e===`${i}Id`){p+=`${e}
    `;continue}if(e!==i)continue;p+=`${i}
${c({objectMetadataItems:t,objectMetadataItem:N,recordGqlFields:O,computeReferences:u,isRootLevel:!1,objectPermissionsByObjectMetadataId:m})}`}}}return`${p}`}if(s===o.RELATION&&n.relation?.type===f.MANY_TO_ONE){const p=t.find(r=>r.id===n.relation?.targetObjectMetadata.id);if(!a(p))return"";if(a(m)&&a(p.id)){if(!a(n.relation?.targetObjectMetadata.id))throw new Error(`Target object metadata id not found with field metadata ${n.name}`);if(!l(m,n.relation?.targetObjectMetadata.id).canReadObjectRecords)return""}return e===y({name:n.name})?`${e}`:`${e}
${c({objectMetadataItems:t,objectMetadataItem:p,recordGqlFields:O,computeReferences:u,isRootLevel:!1,objectPermissionsByObjectMetadataId:m})}`}if(s===o.RELATION&&n.relation?.type===f.ONE_TO_MANY){const p=t.find(r=>r.id===n.relation?.targetObjectMetadata.id);if(!a(p))return"";if(a(m)&&a(p.id)){if(!a(n.relation?.targetObjectMetadata.id))throw new Error(`Target object metadata id not found with field metadata ${n.name}`);if(!l(m,n.relation?.targetObjectMetadata.id).canReadObjectRecords)return""}return`${e}
{
  edges {
    node ${c({objectMetadataItems:t,objectMetadataItem:p,recordGqlFields:O,computeReferences:u,isRootLevel:!1,objectPermissionsByObjectMetadataId:m})}
  }
}`}return s===o.LINKS?`${e}
{
  primaryLinkUrl
  primaryLinkLabel
  secondaryLinks
}`:s===o.CURRENCY?`${e}
{
  amountMicros
  currencyCode
}
    `:s===o.FULL_NAME?`${e}
{
  firstName
  lastName
}`:s===o.ADDRESS?`${e}
{
  addressStreet1
  addressStreet2
  addressCity
  addressState
  addressCountry
  addressPostcode
  addressLat
  addressLng
}`:s===o.ACTOR?`${e}
{
    source
    workspaceMemberId
    name
    context
}`:s===o.EMAILS?`${e}
{
  primaryEmail
  additionalEmails
}`:s===o.PHONES?`${e}
    {
      primaryPhoneNumber
      primaryPhoneCountryCode
      primaryPhoneCallingCode
      additionalPhones
    }`:s===o.FILES?`${e}
    {
      fileId
      label
      extension
      url
    }`:s===o.RICH_TEXT?`${e}
{
  blocknote
  markdown
}`:""},d=t=>t.type===E.MORPH_RELATION,g=t=>t.type===E.RELATION,S=({gqlField:t,fieldMetadata:e,recordGqlFields:n})=>{const O=(g(e)||d(e))&&_(e).includes(t);return!!(T(n)&&!g(e)&&!d(e)||T(n)&&O||a(n)&&a(n[t])&&n[t]!==!1)},b=t=>a(t)&&typeof t=="object"&&t!==null&&!Array.isArray(t),c=({objectMetadataItems:t,objectMetadataItem:e,recordGqlFields:n,computeReferences:O=!1,isRootLevel:u=!0,objectPermissionsByObjectMetadataId:m})=>{if(!u&&a(m)&&a(e.id)&&!l(m,e.id).canReadObjectRecords)return"";const s=(e?.readableFields.filter(r=>r.isActive).filter(r=>r.type===o.RELATION?r.relation?.type===f.MANY_TO_ONE:r.type===o.MORPH_RELATION?r.settings?.relationType===f.MANY_TO_ONE:!1)).flatMap(r=>_(r).map(i=>({gqlField:i,fieldMetadata:r}))),p=[...e.readableFields.filter(r=>r.isActive).flatMap(r=>r.type!==o.MORPH_RELATION?[{gqlField:r.name,fieldMetadata:r}]:a(r.morphRelations)?r.morphRelations.map(i=>({gqlField:R({fieldName:r.name,relationType:i.type,targetObjectMetadataNameSingular:i.targetObjectMetadata.nameSingular,targetObjectMetadataNamePlural:i.targetObjectMetadata.namePlural}),fieldMetadata:r})):[]),...s].sort((r,i)=>r.gqlField.localeCompare(i.gqlField)).filter(r=>S({gqlField:r.gqlField,fieldMetadata:r.fieldMetadata,recordGqlFields:n}));return!u&&O?`{
      __ref
    }`:`{
__typename
${p.map(r=>{const i=n?.[r.gqlField],N=b(i)?i:void 0;return C({objectMetadataItems:t,gqlField:r.gqlField,fieldMetadata:r.fieldMetadata,relationRecordGqlFields:N,computeReferences:O,objectPermissionsByObjectMetadataId:m})}).filter(r=>r!=="").join(`
`)}
}`},w=({recordConnection:t})=>t?.edges?.map(e=>A({recordNode:e.node})),A=({recordNode:t})=>{const{id:e,__typename:n}=t;return{...Object.fromEntries(Object.entries(t).map(([O,u])=>T(u)||Array.isArray(u)||typeof u!="object"?[O,u]:a(u.edges)?[O,w({recordConnection:u})]:[O,A({recordNode:u})])),...a(e)?{id:e}:{},...a(n)?{__typename:n}:{}}};export{d as a,g as i,w as n,_ as o,c as r,A as t};
