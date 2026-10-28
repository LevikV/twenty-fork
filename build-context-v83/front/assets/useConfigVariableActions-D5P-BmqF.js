import{t as y}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{t as C}from"./lib-C3IpGLsk.js";import{t as i}from"./useMutation-BKdjtPjp.js";import{Gs as g,It as p,Lt as u,mn as D}from"./index-BTwh_iuN.js";import{t as m}from"./useApolloAdminClient-DHQoGswf.js";var n=C`
  query GetDatabaseConfigVariable($key: String!) {
    getDatabaseConfigVariable(key: $key) {
      name
      description
      value
      isSensitive
      isEnvOnly
      type
      options
      source
    }
  }
`,w=a=>{const t=m(),{refetch:r}=g(),[o]=i(D,{client:t}),[l]=i(p,{client:t}),[f]=i(u,{client:t}),c=async(e,b)=>{if(e===null||typeof e=="string"&&e===""||Array.isArray(e)&&e.length===0){await s();return}b?await o({variables:{key:a,value:e},refetchQueries:[{query:n,variables:{key:a}}]}):await l({variables:{key:a,value:e},refetchQueries:[{query:n,variables:{key:a}}]}),await r()},s=async e=>{y(e)&&e.preventDefault(),await f({variables:{key:a},refetchQueries:[{query:n,variables:{key:a}}]}),await r()};return{handleUpdateVariable:c,handleDeleteVariable:s}};export{n,w as t};
