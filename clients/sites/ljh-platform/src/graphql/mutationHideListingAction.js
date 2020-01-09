import gql from 'graphql-tag';

export default gql`
  mutation hideListingAction($activityId: ID!) {
    hideListingAction: hideListingActionV2(activityId: $activityId) {
      statusCode
      card {
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
