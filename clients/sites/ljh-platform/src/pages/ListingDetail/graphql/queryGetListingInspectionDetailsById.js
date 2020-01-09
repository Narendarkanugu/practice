import gql from 'graphql-tag';

export default gql`
  query getListingInspectionDetailsById($listingId: ID!) {
    getListingDetailsById(listingId: $listingId) {
      inspections {
        inspectionId
        startDateTime
        endDateTime
      }
    }
  }
`;
