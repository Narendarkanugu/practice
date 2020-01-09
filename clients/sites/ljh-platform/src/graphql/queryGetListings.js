import gql from 'graphql-tag';

export default gql`
  query getListings {
    getListings {
      advertHeadingText
      listedDate
      listingId
      officeId
      photoPrimaryUrl
      priceDisplay
      propertyAddress {
        street
        suburb
        state
        postcode
        country
      }
      websites {
        campaignId
        linkUrl
        name
        iconType
      }
      sortKey
      status
      statusText
    }
  }
`;
