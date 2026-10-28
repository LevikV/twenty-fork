import{t as i}from"./jsx-runtime-BmDUFisN.js";import{l as a}from"./theme-constants-C0dRLi4g-DPr6G-vE.js";import{u as d}from"./feedback-vsDrQK3o-BVH5bjVn.js";import{n as l}from"./lib-C3IpGLsk.js";var e=i(),n=a("div")({name:"StyledDocument",class:"s6fh7ms",propsAsIs:!1}),p=a("h1")({name:"StyledTitle",class:"s1y1fhs",propsAsIs:!1}),o=a("div")({name:"StyledLastUpdated",class:"s1varq34",propsAsIs:!1}),c=a("h2")({name:"StyledHeading",class:"s9lqrqx",propsAsIs:!1}),m=a("p")({name:"StyledParagraph",class:"s7n1jt2",propsAsIs:!1}),y=a("div")({name:"StyledSignatureField",class:"sc11bfg",propsAsIs:!1}),v=a("div")({name:"StyledSignatureLabel",class:"scectfi",propsAsIs:!1}),u=a("div")({name:"StyledSignatureValue",class:"s1wqux1q",propsAsIs:!1}),A=({document:s})=>(0,e.jsxs)(n,{tabIndex:0,role:"region","aria-label":s.title,children:[(0,e.jsx)(p,{children:s.title}),(0,e.jsxs)(o,{children:["Last Updated: ",s.lastUpdatedLabel]}),s.blocks.map((t,r)=>t.kind==="heading"?(0,e.jsx)(c,{children:t.text},r):t.kind==="signatureField"?(0,e.jsxs)(y,{children:[(0,e.jsx)(v,{children:t.label}),(0,e.jsx)(u,{children:t.value})]},r):(0,e.jsx)(m,{children:t.text},r))]}),S=a("div")({name:"StyledFullWidthInfo",class:"s8b0izj",propsAsIs:!1}),j=({text:s})=>(0,e.jsx)(S,{children:(0,e.jsx)(d,{accent:"danger",text:s})}),I=l`
  query GetDpaAgreements {
    dpaAgreements {
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
      downloadUrl
    }
  }
`,E=l`
  query GetDpaPreview {
    dpaPreview {
      title
      lastUpdatedLabel
      templateVersion
      region
      processorEntity
      sccSectionActive
      notice
      blocks {
        kind
        text
        label
        value
      }
    }
  }
`;export{A as i,I as n,j as r,E as t};
