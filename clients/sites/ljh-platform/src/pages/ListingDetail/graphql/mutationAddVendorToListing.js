import gql from 'graphql-tag';

export default gql`
  mutation addVendor($listingId: ID!, $email: String!, $name: String) {
    addVendorToListing(listingId: $listingId, email: $email, name: $name) {
      listingId
      statusCode
    }
  }
`;
