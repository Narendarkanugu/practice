import gql from 'graphql-tag';

export default gql`
  mutation removeVendor($listingId: ID!, $email: String!) {
    removeVendorFromListing(listingId: $listingId, email: $email) {
      listingId
      statusCode
    }
  }
`;
