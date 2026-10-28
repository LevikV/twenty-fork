import{o as Ee}from"./chunk-ChpBd9eV.js";import{t as Te}from"./jsx-runtime-BmDUFisN.js";import{t as Re}from"./react-M6yZRsSc.js";import{H as we}from"./utilities-Dwo-CMN9-BAYdDu64.js";import{H as Ne,R as Y}from"./types-BBcIjWv6-CvFpKS1r.js";import{l as R,s as q}from"./theme-constants-C0dRLi4g-DPr6G-vE.js";import{t as Oe}from"./build-CngeiE9P.js";import{t as c}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{xt as Z}from"./utils-C-F-i_VV-RBaWegpX.js";import{t as K}from"./useAtomStateValue-fOI3coSn.js";import{t as i}from"./dist-Cg5OofxW.js";import{t as Pe}from"./IconBox-8fIKV1qQ.js";import{t as De}from"./IconCalendarEvent-C4ZuQ3RY.js";import{t as X}from"./IconCalendarRepeat-Blp2taHS.js";import{t as Ue}from"./IconChartBar-B6Jn00D8.js";import{t as H}from"./IconCoins-B0r0Kos5.js";import{t as Le}from"./IconDotsVertical-B8pBwOxf.js";import{t as Ge}from"./IconExternalLink-ulJUGaAH.js";import{t as Fe}from"./IconEyeShare-CSqIRONr.js";import{t as $e}from"./IconSettings2-K0Y6HyU2.js";import{t as Me}from"./IconTrash-h0izILIX.js";import{t as Be}from"./useAtomState-CyJyrSDV.js";import{E as F,a as ce}from"./data-display-kIRLbvfE-CK-WRdo3.js";import{i as Ce}from"./OverflowingTextWithTooltip-Db6M906f-4ZuQTTDg.js";import{i as We}from"./surfaces-D3IxB2EF-DcPk5ns8.js";import{f as qe,g as Ke,q as se}from"./feedback-vsDrQK3o-BVH5bjVn.js";import{l as xe}from"./errors-CNNrflUJ.js";import{t as oe}from"./useSnackBar-OFVoWMWI.js";import{r as ne}from"./dist-C0k9q2wC.js";import{a as He,o as Ve,t as L}from"./typography-Cdw1VXRg-DNidcY8R.js";import{c as ze,d as P,n as Qe}from"./layout-VPPc6dU1-BLkr9yoB.js";import{S as Ye}from"./navigation-bjx_nwcB-COWOj55K.js";import{t as Ze}from"./useAtomComponentStateValue-qxqyozUs.js";import{_ as B}from"./graphql-CCxCy0BQ.js";import{t as $}from"./lib-C3IpGLsk.js";import{t as V}from"./useQuery-BC4nwFZk.js";import{t as ie}from"./useMutation-BKdjtPjp.js";import{t as Xe}from"./currentUserState-COXd0PAx.js";import{t as Je}from"./billingState-UOgp0ewh.js";import{t as et}from"./ModalStatefulWrapper-CxThtnHo.js";import{t as le}from"./useModal-DsNRiUr-.js";import{t as pe}from"./SettingsTextInput-Dk0VAvDe.js";import{t as tt}from"./ConfirmationModal-DPztjpDH.js";import{t as ve}from"./currentWorkspaceState-CMyFKDun.js";import{t as he}from"./useNumberFormat-GAXVvfgR.js";import{t as J}from"./Table-C8Ys8tpH.js";import{t as T}from"./TableCell-DcW3gKKP.js";import{t as O}from"./TableHeader-q-afZFD8.js";import{t as U}from"./TableRow-DHQDpHFR.js";import{t as rt}from"./activeTabIdComponentState-BijRLsKD.js";import{t as at}from"./useCloseDropdown-Dy3MXQtr.js";import{t as st}from"./Dropdown-CR_wRvtY.js";import{t as ue}from"./getAbsoluteImageUrl-Di3hY8G1.js";import{n as ot,t as nt}from"./DropdownMenuItemsContainer-CvxYcCK0.js";import{n as W}from"./date-utils-B7A9jaH-.js";import{t as it}from"./Select-Crp62nTI.js";import{Ac as lt,Al as dt,Nt as x,Pc as ct,Wl as pt,_l as ut,cs as mt,en as ft,eu as je,gn as It,ht as gt,iu as ee,ln as me,oc as At,ss as _t,un as m,us as St,vc as ke,ws as Ct}from"./index-BTwh_iuN.js";import{t as te}from"./SettingsTableCard-Bkas4moW.js";import{t as z}from"./useApolloAdminClient-DHQoGswf.js";import{t as fe}from"./TableBody-DxThLgpT.js";import{t as ye}from"./SettingsSectionSkeletonLoader-BnCzBKix.js";import{t as xt}from"./AiAdminPath-Djri_bzT.js";import{n as vt,t as ht}from"./useHandleImpersonate-CgDSBNYW.js";import{t as jt}from"./SettingsTableListSection-C-8HcNm8.js";var e=Te(),G=Ee(Re(),1),kt=Oe(),be={[x.COMPENSATION]:{id:"amPBVF"},[x.SALES]:{id:"mUv9U4"},[x.ONBOARDING_REWARD]:{id:"wxvgdv"},[x.ROLLOVER]:{id:"Q6o/eX"}},yt=[x.COMPENSATION,x.SALES],bt=$`
  mutation GrantWorkspaceCredits(
    $workspaceId: UUID!
    $amount: Float!
    $type: BillingCreditGrantType!
    $reason: String
    $clientOperationId: UUID!
  ) {
    grantWorkspaceCredits(
      workspaceId: $workspaceId
      amount: $amount
      type: $type
      reason: $reason
      clientOperationId: $clientOperationId
    ) {
      id
      amount
      type
      effectiveAt
      expiresAt
      revokedAt
      reason
      isActive
      createdAt
    }
  }
`,de=$`
  query WorkspaceBillingAdminPanel($workspaceId: UUID!) {
    workspaceBillingAdminPanel(workspaceId: $workspaceId) {
      stripeCustomerId
      creditBalance
      creditGrants {
        id
        amount
        type
        effectiveAt
        expiresAt
        revokedAt
        reason
        isActive
        createdAt
      }
      usage {
        periodStart
        periodEnd
        usedCredits
        grantedCredits
        rolloverCredits
        totalGrantedCredits
        remainingCredits
      }
      subscription {
        stripeSubscriptionId
        status
        interval
        currency
        planKey
        currentPeriodStart
        currentPeriodEnd
        trialStart
        trialEnd
        cancelAt
        canceledAt
        cancelAtPeriodEnd
        items {
          productName
          productKey
          stripePriceId
          quantity
          unitAmount
          includedCredits
        }
      }
    }
  }
`,Et=R("div")({name:"StyledCenteredTitle",class:"s1mndy8p",propsAsIs:!1}),Tt=R("div")({name:"StyledSectionContainer",class:"skq093g",propsAsIs:!1}),Rt=R("div")({name:"StyledFields",class:"s1wy8nlj",propsAsIs:!1}),wt=R("div")({name:"StyledModalActions",class:"si2xe4k",propsAsIs:!1}),Nt=({modalInstanceId:t,workspaceId:r})=>{const{i18n:d,_:n}=ne(),{closeModal:k}=le(),{enqueueErrorSnackBar:h,enqueueSuccessSnackBar:v}=oe(),w=z(),[j,y]=(0,G.useState)(""),[A,a]=(0,G.useState)(x.COMPENSATION),[u,_]=(0,G.useState)(""),[p,f]=(0,G.useState)(null),[b,{loading:N}]=ie(bt,{client:w,refetchQueries:[de]}),o=Number(j),g=Number.isFinite(o)&&o>0,D=()=>{y(""),a(x.COMPENSATION),_(""),f(null),k(t)},M=async()=>{if(!g)return;const l=u.trim(),S=JSON.stringify([o,A,l]),s=p?.payload===S?p.clientOperationId:Ne();f({payload:S,clientOperationId:s});try{await b({variables:{workspaceId:r,amount:o,type:A,reason:l||null,clientOperationId:s}}),v({message:d._({id:"Tbxf45",values:{parsedAmount:o}})}),D()}catch(I){h({apolloError:xe.is(I)?I:void 0})}};return(0,e.jsxs)(et,{modalInstanceId:t,onClose:D,isClosable:!0,size:"medium",padding:"large",overlay:"dark",width:"360px",dataGloballyPreventClickOutside:!0,renderInDocumentBody:!0,smallBorderRadius:!0,autoHeight:!0,children:[(0,e.jsx)(Et,{children:(0,e.jsx)(Ve,{title:d._({id:"5O8DG6"}),fontColor:He.Primary})}),(0,e.jsx)(Tt,{children:(0,e.jsx)(P,{alignment:Qe.Center,fontColor:ze.Primary,children:d._({id:"AaNZqp"})})}),(0,e.jsxs)(Rt,{children:[(0,e.jsx)(pe,{instanceId:`${t}-amount`,label:d._({id:"hehnjM"}),placeholder:"200",type:"number",min:0,leftAdornment:"$",value:j,onChange:y,autoFocusOnMount:!0,fullWidth:!0}),(0,e.jsx)(it,{dropdownId:`${t}-type`,label:d._({id:"+zy2Nq"}),value:A,options:yt.map(l=>({value:l,label:d._(be[l])})),onChange:a,isDropdownInModal:!0,fullWidth:!0}),(0,e.jsx)(pe,{instanceId:`${t}-reason`,label:d._({id:"VJScHU"}),placeholder:d._({id:"+g90tY"}),value:u,onChange:_,maxLength:500,fullWidth:!0})]}),(0,e.jsxs)(wt,{children:[(0,e.jsx)(se,{onClick:D,variant:"secondary",title:d._({id:"dEgA5A"}),fullWidth:!0,justify:"center"}),(0,e.jsx)(se,{onClick:M,variant:"primary",accent:"blue",title:d._({id:"nE5VAt"}),disabled:!g||N,fullWidth:!0,justify:"center"})]})]})},Ot=({creditGrantId:t,onRevoke:r})=>{const d=`settings-admin-credit-grant-row-${t}`,{closeDropdown:n}=at();return(0,e.jsx)(st,{dropdownId:d,dropdownPlacement:"right-start",clickableComponent:(0,e.jsx)(qe,{Icon:Le,accent:"tertiary"}),dropdownComponents:(0,e.jsx)(ot,{children:(0,e.jsx)(nt,{children:(0,e.jsx)(Ye,{accent:"danger",LeftIcon:Me,text:i._({id:"GXsAby"}),onClick:()=>{r(),n(d)}})})})})},Pt={[x.COMPENSATION]:"orange",[x.SALES]:"purple",[x.ONBOARDING_REWARD]:"blue",[x.ROLLOVER]:"green"},Dt=$`
  mutation RevokeWorkspaceCreditGrant(
    $workspaceId: UUID!
    $creditGrantId: UUID!
  ) {
    revokeWorkspaceCreditGrant(
      workspaceId: $workspaceId
      creditGrantId: $creditGrantId
    ) {
      id
      amount
      type
      effectiveAt
      expiresAt
      revokedAt
      reason
      isActive
      createdAt
    }
  }
`,Ut="88px 152px 96px 112px 1fr 36px",Ie="revoke-credit-grant-modal",Lt="—",Gt=t=>c(t.revokedAt)?{label:{id:"xGiT1z"},color:"red"}:t.isActive?{label:{id:"F6pfE9"},color:"green"}:{label:{id:"M1RnFv"},color:"gray"},Ft=({workspaceId:t,creditGrants:r,onGrantCreditsClick:d})=>{const{i18n:n,_:k}=ne(),{formatNumber:h}=he(),{enqueueErrorSnackBar:v,enqueueSuccessSnackBar:w}=oe(),j=z(),{openModal:y}=le(),[A,a]=(0,G.useState)(null),[u,_]=(0,G.useState)(!1),[p]=ie(Dt,{client:j,refetchQueries:[de]}),f=o=>h(o,{decimals:2}),b=o=>{a(o),y(Ie)},N=async o=>{_(!0);try{await p({variables:{workspaceId:t,creditGrantId:o}}),w({message:n._({id:"zH6NZT"})})}catch(g){v({apolloError:xe.is(g)?g:void 0})}finally{_(!1),a(null)}};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)(jt,{title:n._({id:"fqtGOd"}),description:n._({id:"MnLFOj"}),items:r,columns:[{label:n._({id:"hehnjM"}),Cell:({item:o})=>(0,e.jsx)(e.Fragment,{children:f(o.amount)})},{label:n._({id:"+zy2Nq"}),Cell:({item:o})=>(0,e.jsx)(F,{color:Pt[o.type],text:n._(be[o.type])})},{label:n._({id:"uAQUqI"}),Cell:({item:o})=>{const g=Gt(o);return(0,e.jsx)(F,{color:g.color,text:n._(g.label)})}},{label:n._({id:"KnN1Tu"}),Cell:({item:o})=>(0,e.jsx)(e.Fragment,{children:W(o.expiresAt)})},{label:n._({id:"VJScHU"}),overflow:"hidden",Cell:({item:o})=>(0,e.jsx)(Ce,{text:o.reason??Lt})},{label:"",align:"right",Cell:({item:o})=>o.isActive?(0,e.jsx)(Ot,{creditGrantId:o.id,onRevoke:()=>b(o)}):null}],gridAutoColumns:Ut,footerButtonLabel:n._({id:"5O8DG6"}),onFooterButtonClick:d}),(0,e.jsx)(tt,{modalInstanceId:Ie,title:n._({id:"CCR+qC"}),subtitle:c(A)?n._({id:"ddMLFL",values:{0:f(A.amount)}}):"",confirmButtonText:n._({id:"GXsAby"}),loading:u,onConfirmClick:()=>{c(A)&&N(A.id)},onClose:()=>a(null)})]})},$t=R("div")({name:"StyledTagsWrapper",class:"sx9h5mh",propsAsIs:!1}),Mt=({plan:t,isTrialPeriod:r=!1})=>{const d=t===B.PRO?{color:"sky",label:i._({id:"3fPjUY"})}:{color:"purple",label:i._({id:"ucgZ0o"})};return(0,e.jsxs)($t,{children:[(0,e.jsx)(F,{color:d.color,text:d.label}),r&&(0,e.jsx)(F,{color:"blue",text:i._({id:"lhkaAC"}),preventShrink:!0})]})},Bt="https://dashboard.stripe.com",Wt="BASE_PRODUCT",qt="RESOURCE_CREDIT",re="—",ge="settings-admin-grant-workspace-credits",ae=R("div")({name:"StyledContainer",class:"s1hgnhrg",propsAsIs:!1}),Kt=R("a")({name:"StyledExternalLink",class:"s19t4op2",propsAsIs:!1}),Ht=R("span")({name:"StyledMono",class:"spfurqs",propsAsIs:!1}),Vt=R("div")({name:"StyledItemValue",class:"spsfm74",propsAsIs:!1}),zt={[m.Active]:"green",[m.Trialing]:"blue",[m.PastDue]:"orange",[m.Canceled]:"red",[m.Unpaid]:"red",[m.Paused]:"gray",[m.Incomplete]:"gray",[m.IncompleteExpired]:"gray"},Qt={[m.Active]:"Active",[m.Trialing]:"Trialing",[m.PastDue]:"Past Due",[m.Canceled]:"Canceled",[m.Unpaid]:"Unpaid",[m.Paused]:"Paused",[m.Incomplete]:"Incomplete",[m.IncompleteExpired]:"Incomplete Expired"},Yt=(t,r)=>{const d=r.toUpperCase();try{return new Intl.NumberFormat("en-US",{style:"currency",currency:d}).format(t/100)}catch{return`${(t/100).toFixed(2)} ${d}`}},Zt=t=>t===B.PRO?B.PRO:t===B.ENTERPRISE?B.ENTERPRISE:null,Ae=({path:t,id:r})=>(0,e.jsxs)(Kt,{href:`${Bt}/${t}/${r}`,target:"_blank",rel:"noopener noreferrer",children:[(0,e.jsx)(Ht,{children:r}),(0,e.jsx)(Ge,{size:12})]}),Xt=({workspaceId:t})=>{const{i18n:r,_:d}=ne(),{formatNumber:n}=he(),{openModal:k}=le(),{data:h,loading:v}=V(de,{client:z(),variables:{workspaceId:t},skip:!t});if(v)return(0,e.jsx)(ae,{children:(0,e.jsx)(ye,{rowCount:6})});const w=h?.workspaceBillingAdminPanel??null;if(!w)return(0,e.jsx)(ae,{children:(0,e.jsx)(P,{children:(0,e.jsx)(L,{title:r._({id:"R+w/Va"}),description:r._({id:"8whThc"})})})});const{stripeCustomerId:j,creditBalance:y,creditGrants:A,subscription:a,usage:u}=w,_=l=>n(l,{abbreviate:!0,decimals:2}),p=[{Icon:dt,label:r._({id:"zHJ27S"}),value:c(j)?(0,e.jsx)(Ae,{path:"customers",id:j}):re},{Icon:H,label:r._({id:"3hkXRB"}),value:c(y)?`${n(y,{abbreviate:!0,decimals:2})} ${r._({id:"UQ4Hjl"})}`:re}],f=a?.interval===me.Month?r._({id:"+8Nek/"}):a?.interval===me.Year?r._({id:"zkWmBh"}):null,b=(l,S)=>`${W(l)} → ${W(S)}`,N=c(a?.planKey)?Zt(a.planKey):null,o=a?.status===m.Trialing,g=c(u)?[{Icon:Ue,label:r._({id:"yLljbQ"}),value:`${_(u.usedCredits)} / ${_(u.totalGrantedCredits)}`},...o?[]:[{Icon:H,label:r._({id:"b2ghLW"}),value:_(u.grantedCredits)}],...u.rolloverCredits>0?[{Icon:H,label:r._({id:"fqtGOd"}),value:_(u.rolloverCredits)}]:[],{Icon:X,label:r._({id:"6SbZqO"}),value:b(u.periodStart,u.periodEnd)}]:[],D=l=>{const S=[];return c(l.quantity)&&S.push(`${n(l.quantity)} ${r._({id:"MpFIca"})}`),c(l.includedCredits)&&S.push(`${n(l.includedCredits,{abbreviate:!0,decimals:2})} ${r._({id:"5oMPMN"})}`),c(l.unitAmount)&&c(a)&&S.push(Yt(l.unitAmount,a.currency)),S.length>0?S.join(" · "):re},M=a?[{Icon:je,label:r._({id:"Yiplcx"}),value:(0,e.jsx)(Ae,{path:"subscriptions",id:a.stripeSubscriptionId})},{Icon:ct,label:r._({id:"uAQUqI"}),value:(0,e.jsx)(F,{color:zt[a.status],text:Qt[a.status]})},...c(N)?[{Icon:lt,label:r._({id:"GdgCoi"}),value:(0,e.jsx)(Mt,{plan:N,isTrialPeriod:o})}]:[],...c(f)?[{Icon:De,label:r._({id:"nJGwRf"}),value:f}]:[],{Icon:X,label:r._({id:"nSK0mT"}),value:b(a.currentPeriodStart,a.currentPeriodEnd)},...c(a.trialStart)&&c(a.trialEnd)?[{Icon:X,label:r._({id:"67waeA"}),value:b(a.trialStart,a.trialEnd)}]:[],...a.cancelAtPeriodEnd?[{Icon:ee,label:r._({id:"2CAby/"}),value:r._({id:"l75CjT"})}]:[],...c(a.cancelAt)?[{Icon:ee,label:r._({id:"zbbpgB"}),value:W(a.cancelAt)}]:[],...c(a.canceledAt)?[{Icon:ee,label:r._({id:"dC0BTo"}),value:W(a.canceledAt)}]:[],...a.items.map(l=>({Icon:l.productKey===Wt?ke:l.productKey===qt?H:Pe,label:l.productName||r._({id:"a3Hy65"}),value:(0,e.jsxs)(Vt,{children:[(0,e.jsx)("span",{children:D(l)}),c(l.productKey)&&(0,e.jsx)(F,{color:"gray",text:l.productKey})]})}))]:[];return(0,e.jsxs)(ae,{children:[(0,e.jsxs)(P,{children:[(0,e.jsx)(L,{title:r._({id:"876pfE"}),description:r._({id:"Zk8585"})}),(0,e.jsx)(te,{rounded:!0,items:p,gridAutoColumns:"3fr 8fr"})]}),(0,e.jsxs)(P,{children:[(0,e.jsx)(L,{title:r._({id:"7FaY4u"}),description:c(u)?r._({id:"Woqoyp"}):r._({id:"YrBAQE"})}),c(u)&&(0,e.jsx)(te,{rounded:!0,items:g,gridAutoColumns:"3fr 8fr"})]}),(0,e.jsxs)(P,{children:[(0,e.jsx)(L,{title:r._({id:"WVzGc2"}),description:a?r._({id:"C6vAhD"}):r._({id:"glQp+P"})}),a&&(0,e.jsx)(te,{rounded:!0,items:M,gridAutoColumns:"3fr 8fr"})]}),(0,e.jsx)(Ft,{workspaceId:t,creditGrants:A,onGrantCreditsClick:()=>k(ge)}),(0,e.jsx)(Nt,{modalInstanceId:ge,workspaceId:t})]})},Jt=$`
  query GetAdminWorkspaceChatThreads($workspaceId: UUID!) {
    getAdminWorkspaceChatThreads(workspaceId: $workspaceId) {
      id
      title
      totalInputTokens
      totalOutputTokens
      conversationSize
      messageCount
      createdAt
      updatedAt
    }
  }
`,er=$`
  fragment UserInfoFragment on UserInfo {
    id
    email
    firstName
    lastName
    createdAt
  }
`,_e=$`
  ${er}
  query WorkspaceLookupAdminPanel($workspaceId: UUID!) {
    workspaceLookupAdminPanel(workspaceId: $workspaceId) {
      user {
        ...UserInfoFragment
      }
      workspaces {
        id
        name
        allowImpersonation
        logo
        totalUsers
        activationStatus
        createdAt
        workspaceUrls {
          customUrl
          subdomainUrl
        }
        users {
          id
          email
          firstName
          lastName
          avatarUrl
        }
        featureFlags {
          key
          value
        }
      }
    }
  }
`,tr=()=>{const[t,r]=Be(ve);return{updateFeatureFlagState:(n,k,h)=>{c(t)&&t.id===n&&r({...t,featureFlags:t.featureFlags?.map(v=>v.key===k?{...v,value:h}:v)})}}},Se="settings-admin-workspace-detail-tabs",C={INFO:"info",BILLING:"billing",MEMBERS:"members",FEATURE_FLAGS:"feature-flags",CHATS:"chats"},ua=()=>{const{workspaceId:t}=we(),r=z(),d=Ze(rt,Se),n=K(Xe),k=K(ve),h=K(Je)?.isBillingEnabled??!1,v=K(At),{enqueueErrorSnackBar:w}=oe(),{updateFeatureFlagState:j}=tr(),{handleImpersonate:y,impersonatingUserId:A}=ht(),[a]=ie(It,{client:r,refetchQueries:[{query:_e,variables:{workspaceId:t}}]}),{data:u,loading:_}=V(_e,{client:r,variables:{workspaceId:t},skip:!t}),p=u?.workspaceLookupAdminPanel?.workspaces?.[0],f=d||C.INFO,{data:b,loading:N}=V(Jt,{client:r,variables:{workspaceId:t},skip:!t||!p?.allowImpersonation||f!==C.CHATS}),{data:o}=V(ft,{client:r,variables:{workspaceIds:t?[t]:[]},skip:!t,fetchPolicy:"network-only"}),g=b?.getAdminWorkspaceChatThreads??[],D=async(s,I)=>{if(!t)return;const E=p?.featureFlags?.find(Q=>Q.key===s)?.value;j(t,s,I),await a({variables:{workspaceId:t,featureFlag:s,value:I},onError:Q=>{c(E)&&j(t,s,E),w({message:`Failed to update feature flag. ${Q.message}`})}})},M=[{id:C.INFO,title:i._({id:"CE+M2e"}),Icon:$e},...h?[{id:C.BILLING,title:i._({id:"R+w/Va"}),Icon:je}]:[],...n?.canImpersonate?[{id:C.MEMBERS,title:i._({id:"wlQNTg"}),Icon:ke}]:[],...v?[{id:C.FEATURE_FLAGS,title:i._({id:"+ZqAYI"}),Icon:pt}]:[],...p?.allowImpersonation?[{id:C.CHATS,title:i._({id:"8Q+lLG"}),Icon:ut}]:[]],l=p?.name||t||"",S=(0,kt.isNonEmptyString)(p?.logo)?p.logo:Ct;return _?(0,e.jsx)(St,{}):(0,e.jsx)(mt,{title:l,icon:(0,e.jsx)(ce,{avatarUrl:ue(S),placeholder:l,placeholderColorSeed:p?.id,size:"md"}),links:[{children:i._({id:"/IX/7x"}),href:Z(Y.AdminPanel)},{children:i._({id:"05jO4l"}),href:xt},{children:l}],children:(0,e.jsxs)(_t,{children:[(0,e.jsx)(gt,{tabs:M,behaveAsLinks:!1,componentInstanceId:Se}),f===C.INFO&&p&&(0,e.jsx)(vt,{activeWorkspace:p,workspaceUpgradeStatus:o?.getUpgradeStatus?.find(s=>s?.workspaceId===t)}),f===C.BILLING&&h&&t&&(0,e.jsx)(Xt,{workspaceId:t}),f===C.MEMBERS&&p&&(0,e.jsxs)(P,{children:[(0,e.jsx)(L,{title:i._({id:"wlQNTg"}),description:i._({id:"wtxjAY"})}),(0,e.jsx)(J,{children:(0,e.jsxs)(fe,{children:[(0,e.jsxs)(U,{gridTemplateColumns:"1fr 2fr 100px",children:[(0,e.jsx)(O,{children:i._({id:"6YtxFj"})}),(0,e.jsx)(O,{children:i._({id:"O3oNi5"})}),(0,e.jsx)(O,{align:"right",children:i._({id:"7L01XJ"})})]}),p.users?.map(s=>{const I=s.id;return c(I)?(0,e.jsxs)(U,{gridTemplateColumns:"1fr 2fr 100px",to:Z(Y.AdminPanelUserDetail,{userId:I}),children:[(0,e.jsxs)(T,{color:q.font.color.primary,gap:q.spacing[2],overflow:"hidden",children:[(0,e.jsx)(ce,{avatarUrl:ue(s.avatarUrl),placeholder:`${s.firstName||""} ${s.lastName||""}`.trim()||s.email,placeholderColorSeed:s.id,size:"md",type:"rounded"}),(0,e.jsx)(Ce,{text:`${s.firstName||""} ${s.lastName||""}`.trim()||"—"})]}),(0,e.jsx)(T,{children:s.email}),(0,e.jsx)(T,{align:"right",children:p.allowImpersonation&&c(n?.id)&&I!==n.id&&(0,e.jsx)(se,{Icon:Fe,variant:"secondary",size:"small",title:i._({id:"tSVr6t"}),onClick:E=>{E.preventDefault(),E.stopPropagation(),y(I,t)},disabled:A===I})})]},I):null})]})})]}),f===C.FEATURE_FLAGS&&p&&(0,e.jsxs)(P,{children:[(0,e.jsx)(L,{title:i._({id:"+ZqAYI"}),description:i._({id:"Dt05oz"})}),(0,e.jsx)(J,{children:(0,e.jsxs)(fe,{children:[(0,e.jsxs)(U,{gridAutoColumns:"1fr 100px",mobileGridAutoColumns:"1fr 80px",children:[(0,e.jsx)(O,{children:i._({id:"YXjpZx"})}),(0,e.jsx)(O,{align:"right",children:i._({id:"uAQUqI"})})]}),p.featureFlags?.map(s=>{const I=(k?.id===t?k?.featureFlags?.find(E=>E.key===s.key)?.value:void 0)??s.value;return(0,e.jsxs)(U,{gridAutoColumns:"1fr 100px",mobileGridAutoColumns:"1fr 80px",children:[(0,e.jsx)(T,{children:s.key}),(0,e.jsx)(T,{align:"right",children:c(s.key)&&(0,e.jsx)(Ke,{value:I,onChange:E=>D(s.key,E)})})]},s.key)})]})})]}),f===C.CHATS&&(0,e.jsxs)(P,{children:[(0,e.jsx)(L,{title:i._({id:"jTS+KY"}),description:i._({id:"qiD/6r"})}),N?(0,e.jsx)(ye,{}):g.length===0?(0,e.jsx)(We,{rounded:!0,children:(0,e.jsx)(U,{gridTemplateColumns:"1fr",children:(0,e.jsx)(T,{color:q.font.color.tertiary,align:"center",children:i._({id:"NjIy4U"})})})}):(0,e.jsxs)(J,{children:[(0,e.jsxs)(U,{gridTemplateColumns:"1fr 120px 120px",children:[(0,e.jsx)(O,{children:i._({id:"MHrjPM"})}),(0,e.jsx)(O,{align:"right",children:i._({id:"t7TeQU"})}),(0,e.jsx)(O,{align:"right",children:i._({id:"+b7T3G"})})]}),g.map(s=>(0,e.jsxs)(U,{gridTemplateColumns:"1fr 120px 120px",to:Z(Y.AdminPanelWorkspaceChatThread,{workspaceId:t??"",threadId:s.id}),children:[(0,e.jsx)(T,{color:q.font.color.primary,children:s.title||i._({id:"wja8aL"})}),(0,e.jsx)(T,{align:"right",children:s.messageCount}),(0,e.jsx)(T,{align:"right",children:new Date(s.updatedAt).toLocaleDateString()})]},s.id))]})]})]})})};export{ua as SettingsAdminWorkspaceDetail};
