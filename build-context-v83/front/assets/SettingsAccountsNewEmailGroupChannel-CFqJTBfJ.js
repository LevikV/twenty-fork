import{o as S}from"./chunk-ChpBd9eV.js";import{t as y}from"./jsx-runtime-BmDUFisN.js";import{t as G}from"./react-M6yZRsSc.js";import{R as s}from"./types-BBcIjWv6-CvFpKS1r.js";import{Lt as v}from"./schemas-pe6acdm4.js";import{xt as h}from"./utils-C-F-i_VV-RBaWegpX.js";import{t as x}from"./useNavigateSettings-7it-VNUi.js";import{l as A,o as N}from"./PageCardLayout-D6EvYRN6.js";import{t as b}from"./useSnackBar-OFVoWMWI.js";import{r as j}from"./dist-C0k9q2wC.js";import{t as C}from"./typography-Cdw1VXRg-DNidcY8R.js";import{d as E}from"./layout-VPPc6dU1-BLkr9yoB.js";import{t as I}from"./lib-C3IpGLsk.js";import{t as L}from"./useMutation-BKdjtPjp.js";import{t as f}from"./SettingsTextInput-Dk0VAvDe.js";import{cs as M,ns as q,ss as D}from"./index-BTwh_iuN.js";import{t as T}from"./getAllEmailingDomains-BVOxmLya.js";var a=y(),c=S(G(),1),k=I`
  mutation CreateEmailGroupChannel($input: CreateEmailGroupChannelInput!) {
    createEmailGroupChannel(input: $input) {
      messageChannel {
        id
        handle
        visibility
        type
        isSyncEnabled
        excludeGroupEmails
        contactAutoCreationPolicy
      }
      forwardingAddress
    }
  }
`,P=()=>{const{enqueueErrorSnackBar:e}=b(),[u,{loading:n,error:o}]=L(k,{refetchQueries:[{query:A},{query:N},{query:T}]});return{createEmailGroupChannel:(r,l)=>u({variables:{input:{handle:r,displayName:l}},onError:i=>{e({apolloError:i})}}),loading:n,error:o}},ee=()=>{const{i18n:e,_:u}=j(),n=x(),{createEmailGroupChannel:o,loading:t}=P(),[r,l]=(0,c.useState)(""),[i,g]=(0,c.useState)(""),m=v().safeParse(r).success&&!t,p=(0,c.useCallback)(async()=>{const d=i.trim(),_=(await o(r,d.length>0?d:void 0)).data?.createEmailGroupChannel.messageChannel.id;_&&n(s.EmailGroupChannelDetail,{messageChannelId:_})},[o,i,r,n]);return(0,a.jsx)(M,{title:e._({id:"papEbS"}),links:[{children:e._({id:"pmUArF"}),href:h(s.General)},{children:e._({id:"hZotg6"}),href:h(s.WorkspaceCommunications)},{children:e._({id:"papEbS"})}],actionButton:(0,a.jsx)(q,{isSaveDisabled:!m,isCancelDisabled:t,isLoading:t,onCancel:()=>n(s.WorkspaceCommunications),onSave:p}),children:(0,a.jsxs)(D,{children:[(0,a.jsxs)(E,{children:[(0,a.jsx)(C,{title:e._({id:"hzKQCy"}),description:e._({id:"Z4WP0F"})}),(0,a.jsx)(f,{instanceId:"email-group-source",label:e._({id:"5f1fxa"}),placeholder:"support@mycompany.com",value:r,onChange:l,onInputEnter:()=>{m&&p()},disabled:t})]}),(0,a.jsxs)(E,{children:[(0,a.jsx)(C,{title:e._({id:"0gS7M5"}),description:e._({id:"+/y8+6"})}),(0,a.jsx)(f,{instanceId:"email-group-display-name",label:e._({id:"0gS7M5"}),placeholder:e._({id:"yYneQW"}),value:i,maxLength:255,onChange:g,onInputEnter:()=>{m&&p()},disabled:t})]})]})})};export{ee as SettingsAccountsNewEmailGroupChannel};
