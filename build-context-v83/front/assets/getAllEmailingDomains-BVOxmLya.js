import{t}from"./lib-C3IpGLsk.js";var a=t`
  query GetEmailingDomains {
    getEmailingDomains {
      id
      domain
      status
      verifiedAt
      verificationRecords {
        type
        key
        value
        priority
        status
      }
      createdAt
      updatedAt
    }
  }
`;export{a as t};
