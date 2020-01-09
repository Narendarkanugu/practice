import gql from "graphql-tag";

export default gql`
  query {
    getListingActions: getListingActionsV2 {
      cards {
        calendar {
          allDay
          description
          endDate
          location
          startDate
          title
        }
        category
        content {
          text
          value
          variant
        }
        eventDateTime
        listingId
        id
        iconUrl
        links {
          text
          url
        }
        listingId
        media {
          url
          variant
        }
        priority
        title
        variant
        editable
        hideable
        status
      }
    }
  }
`;
