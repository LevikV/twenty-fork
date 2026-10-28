import{t as z}from"./jsx-runtime-BmDUFisN.js";import{R as L}from"./types-BBcIjWv6-CvFpKS1r.js";import{l as p,s as q}from"./theme-constants-C0dRLi4g-DPr6G-vE.js";import{t as W}from"./build-CngeiE9P.js";import{t as d}from"./isDefined-Dtu5EYqP-_d6Dqdoe.js";import{Rt as O,xt as R}from"./utils-C-F-i_VV-RBaWegpX.js";import{t as $}from"./createAtomState-6gI79rwg.js";import{t}from"./dist-Cg5OofxW.js";import{s as Z}from"./IconX-DS8MLpvA.js";import{t as V}from"./IconDotsVertical-B8pBwOxf.js";import{t as X}from"./IconSparkles-DuCLe6KO.js";import{t as M}from"./useAtomState-CyJyrSDV.js";import{E as j}from"./data-display-kIRLbvfE-CK-WRdo3.js";import{i as _}from"./OverflowingTextWithTooltip-Db6M906f-4ZuQTTDg.js";import{q as Y,v as J}from"./feedback-vsDrQK3o-BVH5bjVn.js";import{t as K}from"./useSnackBar-OFVoWMWI.js";import{t as ee}from"./typography-Cdw1VXRg-DNidcY8R.js";import{d as re}from"./layout-VPPc6dU1-BLkr9yoB.js";import{y as E}from"./navigation-bjx_nwcB-COWOj55K.js";import{t as te}from"./index.module-BcHbo21h.js";import{t as ae}from"./lib-C3IpGLsk.js";import{t as se}from"./useQuery-BC4nwFZk.js";import{t as oe}from"./Table-C8Ys8tpH.js";import{t as o}from"./TableCell-DcW3gKKP.js";import{t as c}from"./TableHeader-q-afZFD8.js";import{t as B}from"./TableRow-DHQDpHFR.js";import{t as ie}from"./useAtomFamilyStateValue-C93FaFzM.js";import{t as ne}from"./Dropdown-CR_wRvtY.js";import{n as le,t as de}from"./DropdownMenuItemsContainer-CvxYcCK0.js";import{Et as l,Tt as v,_l as me,cs as he,ss as ce,wt as k}from"./index-BTwh_iuN.js";import{t as ge}from"./useApolloAdminClient-DHQoGswf.js";import{n as pe,t as b}from"./SortableTableHeader-DuocKUZz.js";import{t as ue}from"./TableBody-DxThLgpT.js";import{t as I}from"./SettingsEmptyPlaceholder-B2tRtvuJ.js";import{t as fe}from"./AiAdminPath-Djri_bzT.js";var e=z(),Q="1fr 1fr 1fr 80px 80px 110px 90px",g="settings-admin-chats-table",w=W(),ye=p("div")({name:"StyledFlagsContainer",class:"s18clrs0",propsAsIs:!1}),Se=p("span")({name:"StyledZeroReplies",class:"s1vygaax",propsAsIs:!1}),Ce=({thread:r})=>(0,e.jsxs)(B,{to:R(L.AdminPanelWorkspaceChatThread,{workspaceId:r.workspaceId,threadId:r.id}),gridAutoColumns:Q,isClickable:!0,children:[(0,e.jsx)(o,{minWidth:"0",overflow:"hidden",children:(0,e.jsx)(_,{text:(0,w.isNonEmptyString)(r.workspaceDisplayName)?r.workspaceDisplayName:r.workspaceId})}),(0,e.jsx)(o,{minWidth:"0",overflow:"hidden",children:(0,e.jsx)(_,{text:(0,w.isNonEmptyString)(r.userEmail)?r.userEmail:"-"})}),(0,e.jsx)(o,{color:q.font.color.primary,minWidth:"0",overflow:"hidden",children:(0,e.jsx)(_,{text:(0,w.isNonEmptyString)(r.title)?r.title:t._({id:"wja8aL"})})}),(0,e.jsx)(o,{align:"right",children:r.messageCount}),(0,e.jsx)(o,{align:"right",children:r.userReplyCount===0?(0,e.jsx)(Se,{children:r.userReplyCount}):r.userReplyCount}),(0,e.jsx)(o,{minWidth:"0",overflow:"hidden",children:(0,e.jsxs)(ye,{children:[r.hasError&&(0,e.jsx)(j,{color:"red",text:t._({id:"SlfejT"})}),d(r.deletedAt)&&(0,e.jsx)(j,{color:"gray",text:t._({id:"TdfEV7"})}),r.isOnboardingThread&&(0,e.jsx)(j,{color:"blue",text:t._({id:"gukxZ5"})})]})}),(0,e.jsx)(o,{align:"right",children:new Date(r.createdAt).toLocaleDateString()})]}),Ae=({threads:r})=>(0,e.jsxs)(oe,{children:[(0,e.jsxs)(B,{gridAutoColumns:Q,children:[(0,e.jsx)(c,{children:t._({id:"pmUArF"})}),(0,e.jsx)(c,{children:t._({id:"7PzzBU"})}),(0,e.jsx)(c,{children:t._({id:"MHrjPM"})}),(0,e.jsx)(b,{tableId:g,fieldName:l.MESSAGE_COUNT,label:t._({id:"XXzjfC"}),align:"right"}),(0,e.jsx)(b,{tableId:g,fieldName:l.REPLY_COUNT,label:t._({id:"N8UzTV"}),align:"right"}),(0,e.jsx)(c,{children:t._({id:"Xgkhyj"})}),(0,e.jsx)(b,{tableId:g,fieldName:l.CREATED_AT,label:t._({id:"d+F6q9"}),align:"right",initialSort:{fieldName:l.CREATED_AT,direction:"desc"}})]}),(0,e.jsx)(ue,{children:r.map(a=>(0,e.jsx)(Ce,{thread:a},a.id))})]}),xe=p("div")({name:"StyledTableContainer",class:"sglm1yl",propsAsIs:!1}),Te=({threads:r,loading:a,error:s})=>d(s)?(0,e.jsx)(I,{children:t._({id:"UYDPfv"})}):a&&!O(r)?(0,e.jsx)(I,{children:t._({id:"UDL15Z"})}):O(r)?(0,e.jsx)(xe,{children:(0,e.jsx)(Ae,{threads:r})}):(0,e.jsx)(I,{children:t._({id:"nU13WY"})}),je=({filterButton:r,filters:a,onFiltersChange:s})=>(0,e.jsx)(ne,{dropdownId:"settings-admin-chats-filter-dropdown",dropdownPlacement:"bottom-end",dropdownOffset:{x:0,y:8},clickableComponent:r,dropdownComponents:(0,e.jsx)(le,{children:(0,e.jsxs)(de,{children:[(0,e.jsx)(E,{LeftIcon:X,onToggleChange:()=>s({...a,onboardingOnly:!a.onboardingOnly}),toggled:a.onboardingOnly,text:t._({id:"uahNQ+"}),toggleSize:"small"}),(0,e.jsx)(E,{LeftIcon:Z,onToggleChange:()=>s({...a,hasErrorOnly:!a.hasErrorOnly}),toggled:a.hasErrorOnly,text:t._({id:"fQoUMw"}),toggleSize:"small"}),(0,e.jsx)(E,{LeftIcon:me,onToggleChange:()=>s({...a,userNeverEngagedOnly:!a.userNeverEngagedOnly}),toggled:a.userNeverEngagedOnly,text:t._({id:"ywC9IM"}),toggleSize:"small"})]})})}),_e={onboardingOnly:!1,hasErrorOnly:!1,userNeverEngagedOnly:!1},Ee=$({key:"adminChatsFilterState",defaultValue:_e}),ve=$({key:"adminChatsSearchQueryState",defaultValue:""}),be=r=>Object.values(l).includes(r),Ie=r=>!d(r)||!be(r.fieldName)?{sortBy:l.CREATED_AT,sortDirection:v.DESC}:{sortBy:r.fieldName,sortDirection:r.direction==="asc"?v.ASC:v.DESC},we=ae`
  query GetAdminChatThreads(
    $scope: AdminChatThreadScope
    $hasErrorOnly: Boolean
    $userNeverEngagedOnly: Boolean
    $searchTerm: String
    $sortBy: AdminChatThreadSortField
    $sortDirection: AdminChatThreadSortDirection
    $limit: Int
    $offset: Int
  ) {
    getAdminChatThreads(
      scope: $scope
      hasErrorOnly: $hasErrorOnly
      userNeverEngagedOnly: $userNeverEngagedOnly
      searchTerm: $searchTerm
      sortBy: $sortBy
      sortDirection: $sortDirection
      limit: $limit
      offset: $offset
    ) {
      totalCount
      hasMore
      threads {
        id
        title
        workspaceId
        workspaceDisplayName
        userWorkspaceId
        userEmail
        userFirstName
        userLastName
        messageCount
        userReplyCount
        hasError
        isOnboardingThread
        deletedAt
        createdAt
        updatedAt
      }
    }
  }
`,F=25,Ne=()=>{const r=ge(),{enqueueErrorSnackBar:a}=K(),[s,u]=M(ve),[m]=te(s,300),[i,f]=M(Ee),{sortBy:y,sortDirection:S}=Ie(ie(pe,{tableId:g})),{data:n,loading:h,error:C,fetchMore:P}=se(we,{client:r,notifyOnNetworkStatusChange:!0,variables:{limit:F,offset:0,searchTerm:m,scope:i.onboardingOnly?k.ONBOARDING:k.ALL,hasErrorOnly:i.hasErrorOnly,userNeverEngagedOnly:i.userNeverEngagedOnly,sortBy:y,sortDirection:S}}),N=n?.getAdminChatThreads.threads??[],G=n?.getAdminChatThreads.totalCount??0,H=n?.getAdminChatThreads.hasMore??!1,D=h||s!==m;return{searchQuery:s,setSearchQuery:u,filters:i,setFilters:f,threads:N,totalCount:G,hasMore:H,loading:h,isShowMoreDisabled:D,error:C,handleShowMore:async()=>{if(!D)try{await P({variables:{limit:F,offset:N.length},updateQuery:(A,{fetchMoreResult:x})=>{if(!d(x))return A;const U=new Set(A.getAdminChatThreads.threads.map(T=>T.id));return{getAdminChatThreads:{...x.getAdminChatThreads,threads:[...A.getAdminChatThreads.threads,...x.getAdminChatThreads.threads.filter(T=>!U.has(T.id))]}}}})}catch{a({message:t._({id:"HYRl4P"})})}}}},De=p("div")({name:"StyledShowMoreContainer",class:"s2ap62f",propsAsIs:!1}),pr=()=>{const{searchQuery:r,setSearchQuery:a,filters:s,setFilters:u,threads:m,totalCount:i,hasMore:f,loading:y,isShowMoreDisabled:S,error:n,handleShowMore:h}=Ne();return(0,e.jsx)(he,{links:[{children:t._({id:"/IX/7x"}),href:R(L.AdminPanel)},{children:t._({id:"05jO4l"}),href:fe},{children:t._({id:"8Q+lLG"})}],children:(0,e.jsx)(ce,{children:(0,e.jsxs)(re,{children:[(0,e.jsx)(ee,{title:t._({id:"8Q+lLG"}),description:t._({id:"041SWy",values:{totalCount:i}})}),(0,e.jsx)(J,{placeholder:t._({id:"MS72xQ"}),value:r,onChange:a,filterDropdown:C=>(0,e.jsx)(je,{filterButton:C,filters:s,onFiltersChange:u})}),(0,e.jsx)(Te,{threads:m,loading:y,error:n}),f&&!d(n)&&(0,e.jsx)(De,{children:(0,e.jsx)(Y,{title:t._({id:"fMPkxb"}),Icon:V,onClick:h,disabled:S,size:"small",variant:"secondary"})})]})})})};export{pr as SettingsAdminChats};
