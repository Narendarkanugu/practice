import gql from 'graphql-tag';

export default gql`
  mutation publishListingAction($activityId: ID!, $notifyVendor: Boolean) {
    publishListingAction: publishListingActionV2(
      activityId: $activityId
      notifyVendor: $notifyVendor
    ) {
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
