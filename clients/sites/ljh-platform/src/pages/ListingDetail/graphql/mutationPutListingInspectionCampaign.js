import gql from "graphql-tag";

export default gql`
  mutation putListingInspectionCampaign(
    $comments: [String!]
    $contractsIssuedCount: Int
    $groupsAttendedCount: Int
    $groupsInterestedCount: Int
    $inspectionId: ID!
    $listingId: ID!
    $marketValueOpinionDollarsMax: Float
    $marketValueOpinionDollarsMin: Float
    $offersReceivedCount: Int
    $published: Boolean
    $notifyVendor: Boolean
  ) {
    putListingInspectionCampaign(
      comments: $comments
      contractsIssuedCount: $contractsIssuedCount
      groupsAttendedCount: $groupsAttendedCount
      groupsInterestedCount: $groupsInterestedCount
      inspectionId: $inspectionId
      listingId: $listingId
      marketValueOpinionDollarsMax: $marketValueOpinionDollarsMax
      marketValueOpinionDollarsMin: $marketValueOpinionDollarsMin
      offersReceivedCount: $offersReceivedCount
      published: $published
      notifyVendor: $notifyVendor
    ) {
      inspectionId
    }
  }
`;
