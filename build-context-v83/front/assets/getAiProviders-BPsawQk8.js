import{t as e}from"./lib-C3IpGLsk.js";var o=e`
  query GetAdminAiModels {
    getAdminAiModels {
      defaultSmartModelId
      defaultFastModelId
      models {
        modelId
        label
        modelFamily
        sdkPackage
        isAvailable
        isAdminEnabled
        isDeprecated
        isRecommended
        contextWindowTokens
        maxOutputTokens
        inputCostPerMillionTokens
        outputCostPerMillionTokens
        providerName
        providerLabel
        name
        dataResidency
      }
    }
  }
`,i=e`
  query GetAiProviders {
    getAiProviders
  }
`;export{o as n,i as t};
