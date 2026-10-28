import{o as m}from"./chunk-ChpBd9eV.js";import{t as u}from"./react-M6yZRsSc.js";import{L as d}from"./types-BBcIjWv6-CvFpKS1r.js";import{l}from"./PageCardLayout-D6EvYRN6.js";import{t as f}from"./useRedirect-DMLV2ydH.js";import{kn as C}from"./graphql-CCxCy0BQ.js";import{t as A}from"./useApolloClient-zMx7IuLG.js";import{t as P}from"./lib-C3IpGLsk.js";import{t as c}from"./useQuery-BC4nwFZk.js";import{t as T}from"./useMutation-BKdjtPjp.js";import{t as _}from"./config-B1E7I59J.js";var h=P`
  query ApplicationConnectionProviders($applicationId: UUID!) {
    applicationConnectionProviders(applicationId: $applicationId) {
      id
      applicationId
      type
      name
      displayName
      oauth {
        scopes
        isClientCredentialsConfigured
      }
    }
  }
`,w=t=>{const{data:e,loading:r,refetch:o}=c(h,{skip:!t,variables:{applicationId:t??""},fetchPolicy:"cache-first"});return{connectionProviders:e?.applicationConnectionProviders??[],loading:r,refetch:o}},L=()=>{const{data:t,loading:e,refetch:r}=c(l,{client:A(),fetchPolicy:"cache-and-network"});return{accounts:(t?.myConnectedAccounts??[]).filter(o=>o.provider===d.APP),loading:e,refetch:r}},v=m(u(),1),M=()=>{const[t]=T(C),{redirect:e}=f();return{triggerAppOAuth:(0,v.useCallback)(async({applicationId:r,providerName:o,visibility:p,reconnectingConnectedAccountId:a,redirectLocation:i})=>{const s=(await t()).data?.generateTransientToken.transientToken.token;if(!s)return;const n=new URLSearchParams({applicationId:r,providerName:o,transientToken:s,visibility:p});a&&n.set("reconnectingConnectedAccountId",a),i&&n.set("redirectLocation",i),e(`${_}/auth/apps/authorize?${n.toString()}`)},[t,e])}};export{L as n,w as r,M as t};
