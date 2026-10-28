import{n as e}from"./lib-C3IpGLsk.js";var a=e`
  query Search(
    $searchInput: String!
    $limit: Int!
    $after: String
    $excludedObjectNameSingulars: [String!]
    $includedObjectNameSingulars: [String!]
    $filter: ObjectRecordFilterInput
  ) {
    search(
      searchInput: $searchInput
      limit: $limit
      after: $after
      excludedObjectNameSingulars: $excludedObjectNameSingulars
      includedObjectNameSingulars: $includedObjectNameSingulars
      filter: $filter
    ) {
      edges {
        node {
          recordId
          objectNameSingular
          objectLabelSingular
          label
          imageUrl
          tsRankCD
          tsRank
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;export{a as t};
