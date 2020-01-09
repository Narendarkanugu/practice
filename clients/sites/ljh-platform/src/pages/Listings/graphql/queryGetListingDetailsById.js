import gql from 'graphql-tag';

export default gql`
  query getListingDetailsById($listingId: ID!) {
    getListingDetailsById(listingId: $listingId) {
      vendors {
        name
        email
        lastActive
        pictureUrl
        sourceCrm
      }
      websites {
        campaignId
        linkUrl
        name
        iconType
      }
      agents {
        agentUuid
        name
        roleDisplay
        email
        mobile
        photoUrl
      }
      inspections {
        inspectionId
        startDateTime
        endDateTime
      }
    }
  }
`;
