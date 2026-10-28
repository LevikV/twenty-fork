import{o as on}from"./chunk-ChpBd9eV.js";import{t as rn}from"./jsx-runtime-BmDUFisN.js";import{t as cn}from"./react-M6yZRsSc.js";import{L as h,R as A}from"./types-BBcIjWv6-CvFpKS1r.js";import{l as m,s as dn}from"./theme-constants-C0dRLi4g-DPr6G-vE.js";import{t as ln}from"./useNavigationDrawerExpanded-nX41wPFt.js";import{t as c}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{X as mn,fr as w,lr as un,xt as x}from"./utils-C-F-i_VV-RBaWegpX.js";import{t as G}from"./createAtomState-6gI79rwg.js";import{t as f}from"./useAtomStateValue-fOI3coSn.js";import{t as pn}from"./useIsMobile-499ERoap.js";import{t as l}from"./dist-Cg5OofxW.js";import{t as b}from"./IconX-DS8MLpvA.js";import{t as In}from"./IconExternalLink-ulJUGaAH.js";import{t as V}from"./IconRefresh-C-yTaP7q.js";import{n as Cn,r as An,t as W}from"./useNavigateSettings-7it-VNUi.js";import{D as Sn,I as H,q as fn}from"./feedback-vsDrQK3o-BVH5bjVn.js";import{t as vn}from"./NavigationDrawerCollapseButton-CsNbH-FE.js";import{r as $}from"./dist-C0k9q2wC.js";import{a as _n,r as En}from"./useAvailableComponentInstanceIdOrThrow-BJxWokO_.js";import{t as yn}from"./useSnackBarOnQueryError-DOkgmy0U.js";import{t as q}from"./useRedirect-DMLV2ydH.js";import{t as Nn}from"./useAtomComponentStateValue-qxqyozUs.js";import{Ar as v,ai as T,v as z}from"./graphql-CCxCy0BQ.js";import{c as gn,i as Tn,n as hn,o as Pn,r as xn,s as Mn,t as On,u as _}from"./useCreditUpgradeAction-Dx9qOQI6.js";import{t as B}from"./useApolloClient-zMx7IuLG.js";import{t as E}from"./lib-C3IpGLsk.js";import{t as y}from"./useQuery-BC4nwFZk.js";import{t as K}from"./useMutation-BKdjtPjp.js";import{t as Bn}from"./currentUserState-COXd0PAx.js";import{t as Q}from"./useModal-DsNRiUr-.js";import{t as Dn}from"./ConfirmationModal-DPztjpDH.js";import{t as bn}from"./currentWorkspaceState-CMyFKDun.js";import{t as R}from"./BillingCheckoutSessionDefaultValue-BG70KRpZ.js";import{t as Rn}from"./useHandleCheckoutSession-GpBSQ1lQ.js";import{t as Y}from"./useApolloCoreClient-cYHBUwoT.js";import{t as jn}from"./useDateTimeFormat-C-F7uxwv.js";import{t as Z}from"./useSetAtomComponentState-D9S1uHP7.js";import{t as Ln}from"./useTriggerApiOAuth-DWrmPE3L.js";var t=rn(),Un=()=>({centerTitle:n})=>n?"minmax(0, 1fr) minmax(0, auto) minmax(0, 1fr)":"minmax(0, auto) minmax(min-content, 1fr)",kn=m("div")({name:"StyledHeader",class:"skbu4f7",propsAsIs:!1,vars:{"skbu4f7-0":[Un()]}}),Fn=m("div")({name:"StyledLeft",class:"s5vs2pt",propsAsIs:!1}),wn=()=>({titleColor:n})=>n??dn.font.color.primary,X=m("div")({name:"StyledTitle",class:"s9pz9l0",propsAsIs:!1,vars:{"s9pz9l0-0":[wn()]}}),Gn=()=>X,Vn=m(Gn())({name:"StyledCenteredTitle",class:"s1a1o676",propsAsIs:!0}),Wn=()=>({centerTitle:n})=>n?3:2,Hn=m("div")({name:"StyledRight",class:"sixn1z5",propsAsIs:!1,vars:{"sixn1z5-0":[Wn()]}}),mt=({links:n,breadcrumb:e,icon:a,title:s,tag:o,actionButton:d,centerTitle:r=!1,titleColor:i})=>{const u=pn(),S=ln(),C=c(a)||c(s)||c(o),p=r&&C,N=(0,t.jsxs)(t.Fragment,{children:[a,c(s)&&s,o]});return(0,t.jsxs)(kn,{centerTitle:p,children:[(0,t.jsxs)(Fn,{children:[!u&&!S&&(0,t.jsx)(vn,{direction:"right"}),c(e)?e:c(n)&&(0,t.jsx)(An,{links:n}),!p&&C&&(0,t.jsx)(X,{titleColor:i,children:N})]}),p&&(0,t.jsx)(Vn,{titleColor:i,children:N}),(0,t.jsx)(Hn,{centerTitle:p,"data-click-outside-id":Cn,children:d})]})},P=(function(n){return n.ONGOING_CREATION="ONGOING_CREATION",n.PENDING_CREATION="PENDING_CREATION",n.CREATED="CREATED",n.ACTIVE="ACTIVE",n.INACTIVE="INACTIVE",n.SUSPENDED="SUSPENDED",n})({}),$n=[P.CREATED,P.ACTIVE,P.SUSPENDED],ut=n=>c(n)&&$n.includes(n.activationStatus),J=_n(),D=En({key:"informationBannerIsOpenComponentState",defaultValue:!0,componentInstanceContext:J}),qn=m("div")({name:"StyledText",class:"s128d8pp",propsAsIs:!1}),zn=()=>H,Kn=m(zn())({name:"StyledInvertedIconButton",class:"so4xzke",propsAsIs:!0}),Qn=()=>({hasCloseButton:n})=>n?"24px":"0",Yn=m("div")({name:"StyledContent",class:"s1t9d1p2",propsAsIs:!1,vars:{"s1t9d1p2-0":[Qn()]}}),I=({message:n,color:e="blue",variant:a="primary",buttonTitle:s,buttonIcon:o,buttonOnClick:d,isButtonDisabled:r=!1,onClose:i,componentInstanceId:u})=>{const S=Nn(D,u),C=a==="primary",p=e==="danger"?"danger":"blue";return(0,t.jsx)(J.Provider,{value:{instanceId:u},children:S&&(0,t.jsxs)(Sn,{color:e,variant:a,children:[(0,t.jsxs)(Yn,{hasCloseButton:!!i,children:[(0,t.jsx)(qn,{children:n}),s&&d&&(0,t.jsx)(fn,{variant:"secondary",accent:p,title:s,Icon:o,size:"small",inverted:C,onClick:d,disabled:r})]}),i&&(C?(0,t.jsx)(Kn,{Icon:b,size:"small",variant:"tertiary",onClick:i,ariaLabel:l._({id:"uYADQM"})}):(0,t.jsx)(H,{Icon:b,size:"small",variant:"tertiary",accent:p,onClick:i,ariaLabel:l._({id:"uYADQM"})}))]})})},Zn=()=>{const{redirect:n}=q(),{data:e,loading:a,error:s}=y(z,{variables:{returnUrlPath:x(A.Billing)}});yn(s);const{[v.WORKSPACE]:o}=_(),d=()=>{c(e)&&c(e.billingPortalSession.url)&&n(e.billingPortalSession.url)};return(0,t.jsx)(I,{componentInstanceId:"information-banner-billing-subscription-paused",color:"danger",variant:"secondary",message:o?l._({id:"y985qL"}):l._({id:"wN0jHF"}),buttonTitle:o?l._({id:"EkH9pt"}):void 0,buttonOnClick:()=>d(),isButtonDisabled:a||!c(e)})},M="information-banner-end-trial-period-modal",Xn=()=>{const{endTrialPeriod:n,isLoading:e}=Tn(),{i18n:a,_:s}=$(),{openModal:o}=Q(),{[v.BILLING]:d}=_(),r=f(Pn);return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(I,{componentInstanceId:"information-banner-end-trial-period",color:"danger",variant:"secondary",message:d?a._({id:"QEUZoG"}):a._({id:"cByGGA"}),buttonTitle:d?r===!1?a._({id:"NKMrde"}):a._({id:"k1i50B"}):void 0,buttonOnClick:()=>o(M),isButtonDisabled:e}),d&&(r===!1?(0,t.jsx)(gn,{modalInstanceId:M,onPaymentMethodAdded:async()=>{await n({skipPaymentMethodRedirect:!0})}}):(0,t.jsx)(Mn,{modalInstanceId:M,hasPaymentMethod:r,onConfirmClick:async()=>{await n()},loading:e}))]})},Jn=()=>{const{redirect:n}=q(),{data:e,loading:a}=y(z,{variables:{returnUrlPath:x(A.Billing)}}),{[v.WORKSPACE]:s}=_(),o=()=>{c(e)&&c(e.billingPortalSession.url)&&n(e.billingPortalSession.url)};return(0,t.jsx)(I,{componentInstanceId:"information-banner-fail-payment-info",color:"danger",variant:"secondary",message:s?l._({id:"3u/3zO"}):l._({id:"s0kiVA"}),buttonTitle:s?l._({id:"XeFxgX"}):void 0,buttonOnClick:()=>o(),isButtonDisabled:a||!c(e)})},ne=()=>{const{handleCheckoutSession:n,isSubmitting:e}=Rn({recurringInterval:R.interval,plan:R.plan,requirePaymentMethod:!0,successUrlPath:x(A.Billing)}),{[v.WORKSPACE]:a}=_();return(0,t.jsx)(I,{componentInstanceId:"information-banner-no-billing-subscription",color:"danger",variant:"secondary",message:a?l._({id:"oC6WBs"}):l._({id:"QBTEtW"}),buttonTitle:a?l._({id:"EDl9kS"}):void 0,buttonOnClick:()=>n(),isButtonDisabled:e})},ee=G({key:"enterpriseInstanceTypeState",defaultValue:w.PRODUCTION}),te=()=>{const n=f(ee);return!c(n)||n===w.PRODUCTION?null:(0,t.jsx)(I,{componentInstanceId:"information-banner-non-production-instance",variant:"secondary",message:l._({id:"MGWsz+"})})},ae=G({key:"maintenanceModeState",defaultValue:null}),g=on(cn(),1),se=E`
  mutation DismissMaintenanceModeBanner {
    dismissMaintenanceModeBanner
  }
`,oe=E`
  query IsMaintenanceModeBannerDismissed {
    isMaintenanceModeBannerDismissed
  }
`,re=({enabled:n,maintenanceStartAt:e})=>{const a=Y(),[s,o]=(0,g.useState)(!1),{data:d,loading:r,refetch:i}=y(oe,{client:a,skip:!n,fetchPolicy:"network-only"}),[u]=K(se,{client:a});return(0,g.useEffect)(()=>{if(!n){o(!1);return}},[n]),(0,g.useEffect)(()=>{n&&(o(!1),i())},[n,e,i]),{dismissBanner:async()=>{await u(),o(!0)},isDismissed:s||d?.isMaintenanceModeBannerDismissed===!0,isLoading:n?r:!1}},j=(n,e)=>un.Instant.from(n).toZonedDateTimeISO(e).toLocaleString(void 0,{month:"short",day:"numeric",hour:"numeric",minute:"numeric",timeZoneName:"short"}),ie=()=>{const n=f(ae),{timeZone:e}=jn(),{dismissBanner:a,isDismissed:s,isLoading:o}=re({enabled:c(n),maintenanceStartAt:n?.startAt});if(!c(n)||o||s)return null;const d=j(n.startAt,e),r=j(n.endAt,e),i=l._({id:"f5yMQc",values:{startFormatted:d,endFormatted:r}}),u=mn(n.link?.trim());return(0,t.jsx)(I,{componentInstanceId:"information-banner-maintenance",variant:"secondary",message:i,buttonTitle:c(u)?l._({id:"zwWKhA"}):void 0,buttonIcon:c(u)?In:void 0,buttonOnClick:c(u)?()=>window.open(u,"_blank","noopener,noreferrer"):void 0,onClose:a})},ce=E`
  query MyConnectedAccounts {
    myConnectedAccounts {
      id
      handle
      provider
      authFailedAt
      archivedAt
      scopes
      handleAliases
      lastSignedInAt
      userWorkspaceId
      connectionProviderId
      name
      visibility
      lastCredentialsRefreshedAt
      connectionParameters {
        IMAP {
          host
          port
          connectionSecurity
          username
        }
        SMTP {
          host
          port
          connectionSecurity
          username
        }
        CALDAV {
          host
          username
        }
      }
      createdAt
      updatedAt
    }
  }
`,de=E`
  query MyCalendarChannels($connectedAccountId: UUID) {
    myCalendarChannels(connectedAccountId: $connectedAccountId) {
      id
      handle
      visibility
      syncStatus
      syncStage
      syncStageStartedAt
      isContactAutoCreationEnabled
      contactAutoCreationPolicy
      isSyncEnabled
      connectedAccountId
      createdAt
      updatedAt
    }
  }
`,le=()=>{const{data:n,loading:e}=y(de,{client:B()});return{channels:n?.myCalendarChannels??[],loading:e}},me=E`
  query MyMessageChannels($connectedAccountId: UUID) {
    myMessageChannels(connectedAccountId: $connectedAccountId) {
      id
      handle
      displayName
      visibility
      type
      isContactAutoCreationEnabled
      contactAutoCreationPolicy
      messageFolderImportPolicy
      excludeNonProfessionalEmails
      excludeGroupEmails
      isSyncEnabled
      syncStatus
      syncStage
      syncStageStartedAt
      connectedAccountId
      connectedAccount {
        id
        handle
      }
      createdAt
      updatedAt
    }
  }
`,ue=()=>{const{data:n,loading:e}=y(me,{client:B()});return{channels:n?.myMessageChannels??[],loading:e}},pe=new Set([h.GOOGLE,h.MICROSOFT,h.IMAP_SMTP_CALDAV]),Ie=()=>{const{data:n,loading:e}=y(ce,{client:B()}),{channels:a,loading:s}=ue(),{channels:o,loading:d}=le();return{accounts:(0,g.useMemo)(()=>n?.myConnectedAccounts?n.myConnectedAccounts.filter(r=>pe.has(r.provider)).map(r=>({...r,messageChannels:a.filter(i=>i.connectedAccountId===r.id),calendarChannels:o.filter(i=>i.connectedAccountId===r.id)})):[],[n,a,o]),loading:e||s||d}},nn=n=>{const e=f(Bn)?.userVars?.[n]?.[0],{accounts:a}=Ie();return{accountToReconnect:a.find(s=>s.id===e)}},Ce=E`
  mutation DismissReconnectAccountBanner($connectedAccountId: UUID!) {
    dismissReconnectAccountBanner(connectedAccountId: $connectedAccountId)
  }
`,en=n=>{const[e]=K(Ce,{client:Y()}),a=Z(D,n);return{dismissReconnectAccountBanner:async o=>{await e({variables:{connectedAccountId:o}}),a(!1)}}},tn=(function(n){return n.ACCOUNTS_TO_RECONNECT_INSUFFICIENT_PERMISSIONS="ACCOUNTS_TO_RECONNECT_INSUFFICIENT_PERMISSIONS",n.ACCOUNTS_TO_RECONNECT_EMAIL_ALIASES="ACCOUNTS_TO_RECONNECT_EMAIL_ALIASES",n})({}),an=()=>{const{triggerApisOAuth:n}=Ln(),e=W();return{triggerProviderReconnect:(0,g.useCallback)(async(a,s,o)=>{if(a===h.IMAP_SMTP_CALDAV){if(!s){e(A.NewImapSmtpCaldavConnection);return}e(A.EditImapSmtpCaldavConnection,{connectedAccountId:s});return}await n(a,{...o,redirectLocation:x(A.Accounts)})},[n,e])}},L="information-banner-reconnect-account-email-aliases",Ae=()=>{const{accountToReconnect:n}=nn(tn.ACCOUNTS_TO_RECONNECT_EMAIL_ALIASES),{triggerProviderReconnect:e}=an(),{dismissReconnectAccountBanner:a}=en(L);if(!n)return null;const s=async()=>{await a(n.id)},o=n.handle;return(0,t.jsx)(I,{componentInstanceId:L,variant:"secondary",message:l._({id:"qg68zg",values:{mailboxHandle:o}}),buttonTitle:l._({id:"gcoiFh"}),buttonIcon:V,buttonOnClick:()=>e(n.provider,n.id),onClose:s})},U="information-banner-reconnect-account-insufficient-permissions",Se=()=>{const{accountToReconnect:n}=nn(tn.ACCOUNTS_TO_RECONNECT_INSUFFICIENT_PERMISSIONS),{triggerProviderReconnect:e}=an(),{dismissReconnectAccountBanner:a}=en(U);if(!n)return null;const s=async()=>{await a(n.id)},o=n.handle;return(0,t.jsx)(I,{componentInstanceId:U,variant:"secondary",message:l._({id:"ZS+BPb",values:{mailboxHandle:o}}),buttonTitle:l._({id:"gcoiFh"}),buttonIcon:V,buttonOnClick:()=>e(n.provider,n.id),onClose:s})},fe=n=>f(bn)?.activationStatus===n,k="information-banner-no-more-credits",F="information-banner-upgrade-credit-plan-modal",ve=()=>{const{i18n:n,_:e}=$(),{[v.BILLING]:a}=_(),s=W(),{openModal:o}=Q(),d=Z(D,k),{nextPrice:r,nextResourceCreditsAmount:i,nextResourceCreditPrice:u,nextTierInterval:S,upgradeCreditPlan:C,isUpgrading:p}=On(),N=a&&c(r),sn=a?N?()=>o(F):()=>s(A.Billing):void 0;return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(I,{componentInstanceId:k,color:"danger",variant:"secondary",message:a?n._({id:"2rAG3K"}):n._({id:"iSuLEw"}),buttonTitle:a?n._({id:"tIoZo5"}):void 0,buttonOnClick:sn,isButtonDisabled:p,onClose:()=>d(!1)}),N&&(0,t.jsx)(Dn,{modalInstanceId:F,title:n._({id:"Et23WT"}),subtitle:n._({id:"nCRRVY",values:{0:i??"",1:u??"",2:S??""}}),onConfirmClick:C,confirmButtonText:n._({id:"kwkhPe"}),confirmButtonAccent:"blue",loading:p})]})},_e=m("div")({name:"StyledInformationBannerWrapper",class:"s1qhyhf",propsAsIs:!1}),Ee=()=>{const n=xn(),e=_()[v.CONNECTED_ACCOUNTS],a=fe(P.SUSPENDED),s=f(hn),o=a&&n===T.Paused,d=a&&!c(n),r=n===T.PastDue||n===T.Unpaid,i=s&&n===T.Trialing;return(0,t.jsxs)(_e,{children:[(0,t.jsx)(te,{}),(0,t.jsx)(ie,{}),e&&(0,t.jsx)(Se,{}),e&&(0,t.jsx)(Ae,{}),o&&(0,t.jsx)(Zn,{}),d&&(0,t.jsx)(ne,{}),r&&(0,t.jsx)(Jn,{}),i&&(0,t.jsx)(Xn,{}),!a&&!r&&!i&&s&&(0,t.jsx)(ve,{})]})},ye=m("div")({name:"StyledRoot",class:"s1fsgade",propsAsIs:!1}),Ne=m("div")({name:"StyledMainCardWrapper",class:"s18h5wyx",propsAsIs:!1}),ge=m("div")({name:"StyledCard",class:"s9iz60d",propsAsIs:!1}),Te=m("div")({name:"StyledBodyContent",class:"s1tjxzq8",propsAsIs:!1}),O=m("div")({name:"StyledPrintHidden",class:"s72opd7",propsAsIs:!1}),pt=({header:n,secondaryBar:e,children:a,showInformationBanner:s=!0})=>(0,t.jsx)(ye,{children:(0,t.jsx)(Ne,{children:(0,t.jsxs)(ge,{children:[(0,t.jsx)(O,{children:n}),(0,t.jsx)(O,{children:e}),(0,t.jsxs)(Te,{children:[s&&(0,t.jsx)(O,{children:(0,t.jsx)(Ee,{})}),a]})]})})});export{ue as a,de as c,ee as d,I as f,mt as h,Ie as i,ce as l,P as m,fe as n,me as o,ut as p,an as r,le as s,pt as t,ae as u};
