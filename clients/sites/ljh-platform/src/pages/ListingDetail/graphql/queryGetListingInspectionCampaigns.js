import gql from "graphql-tag";

export default gql`
  query getListingInspectionCampaigns($listingId: ID!) {
    getListingInspectionCampaigns(listingId: $listingId) {
      comments
      contractsIssuedCount
      groupsAttendedCount
      groupsInterestedCount
      inspectionId
      listingId
      marketValueOpinionDollarsMax
      marketValueOpinionDollarsMin
      offersReceivedCount
      startDateTime
      endDateTime
      published
      publishedTimestamp
    }
  }
`;
