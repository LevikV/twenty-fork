import{o as b}from"./chunk-ChpBd9eV.js";import{t as P}from"./jsx-runtime-BmDUFisN.js";import{t as B}from"./react-M6yZRsSc.js";import{R as i}from"./types-BBcIjWv6-CvFpKS1r.js";import{xt as y}from"./utils-C-F-i_VV-RBaWegpX.js";import{t as I}from"./useNavigateSettings-7it-VNUi.js";import{t as W}from"./useSnackBar-OFVoWMWI.js";import{r as $}from"./dist-C0k9q2wC.js";import{t as S}from"./typography-Cdw1VXRg-DNidcY8R.js";import{d as m}from"./layout-VPPc6dU1-BLkr9yoB.js";import{n as k}from"./lib-C3IpGLsk.js";import{t as q}from"./useQuery-BC4nwFZk.js";import{t as R}from"./useMutation-BKdjtPjp.js";import{t as c}from"./SettingsTextInput-Dk0VAvDe.js";import{t as H}from"./useApolloCoreClient-cYHBUwoT.js";import{t as M}from"./downloadFile-Sco-AQ-M.js";import{cs as U,ns as F,ss as Q,us as V}from"./index-BTwh_iuN.js";import{i as z,n as X,r as Z,t as Y}from"./getDpaPreview-BJ8V2prs.js";var t=P(),r=b(B(),1),J=k`
  mutation GenerateSignedDpa($input: GenerateSignedDpaInput!) {
    generateSignedDpa(input: $input) {
      downloadUrl
      agreement {
        id
        type
        templateVersion
        region
        processorEntity
        customerLegalEntityName
        signatoryName
        signatoryTitle
        acceptedByEmail
        acceptedAt
        createdAt
      }
    }
  }
`,ye=()=>{const{i18n:e,_:K}=$(),d=I(),{enqueueSuccessSnackBar:h,enqueueErrorSnackBar:v}=W(),p=H(),[n,E]=(0,r.useState)(""),[s,x]=(0,r.useState)(""),[o,N]=(0,r.useState)(""),[u,g]=(0,r.useState)(!1),{data:j,loading:w}=q(Y,{client:p}),[D]=R(J,{client:p,refetchQueries:[{query:X}],awaitRefetchQueries:!0}),a=j?.dpaPreview,_=n.trim()!==""&&s.trim()!==""&&o.trim()!==""&&!a?.notice&&!u,L=async()=>{if(!_)return;g(!0);const f=n.trim(),A=s.trim(),T=o.trim();try{const{data:C}=await D({variables:{input:{customerLegalEntityName:f,signatoryName:A,signatoryTitle:T}}}),l=C?.generateSignedDpa;if(!l)throw new Error("No result returned");const G=f.replace(/[/\\:*?"<>|]+/g,"-");await M(l.downloadUrl,`Twenty-DPA-${l.agreement.templateVersion}-${G}.pdf`),h({message:e._({id:"Z2Wg9g"})}),d(i.LegalDpa)}catch{v({message:e._({id:"NonvA5"})})}finally{g(!1)}};return w?(0,t.jsx)(V,{}):(0,t.jsx)(U,{title:e._({id:"H3rta9"}),links:[{children:e._({id:"pmUArF"}),href:y(i.General)},{children:e._({id:"vifyyw"}),href:y(i.LegalDpa)},{children:e._({id:"ziAjHi"})}],actionButton:(0,t.jsx)(F,{isSaveDisabled:!_,isLoading:u,onCancel:()=>d(i.LegalDpa),onSave:L}),children:(0,t.jsxs)(Q,{children:[a?.notice&&(0,t.jsx)(m,{children:(0,t.jsx)(Z,{text:a.notice})}),(0,t.jsxs)(m,{children:[(0,t.jsx)(S,{title:e._({id:"mmGBWT"}),description:e._({id:"Ya1wb4"})}),(0,t.jsx)(c,{instanceId:"dpa-legal-entity-name",label:e._({id:"nc/jNe"}),placeholder:e._({id:"BXMLsb"}),value:n,onChange:E,fullWidth:!0}),(0,t.jsx)(c,{instanceId:"dpa-signatory-name",label:e._({id:"3yzHpm"}),placeholder:e._({id:"A1CyH/"}),value:s,onChange:x,fullWidth:!0}),(0,t.jsx)(c,{instanceId:"dpa-signatory-title",label:e._({id:"a6TaW9"}),placeholder:e._({id:"Gpb1xF"}),value:o,onChange:N,fullWidth:!0})]}),a&&(0,t.jsxs)(m,{children:[(0,t.jsx)(S,{title:e._({id:"rdUucN"}),description:e._({id:"21Xjwu"})}),(0,t.jsx)(z,{document:a})]})]})})};export{ye as SettingsLegalDpaNew};
