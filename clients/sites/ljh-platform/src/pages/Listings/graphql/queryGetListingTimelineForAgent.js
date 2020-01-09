import gql from 'graphql-tag';

export default gql`
  query getListingTimelineForAgent($listingId: ID!) {
    getListingTimelineForAgent(listingId: $listingId) {
      cards {
        hideable
        editable
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
        id
        iconUrl
        listingId
        links {
          text
          url
        }
        media {
          url
          variant
        }
        priority
        title
        variant
        status
      }
    }
  }
`;
