import gql from "graphql-tag";

/*
type CardV2Calendar {
  allDay: Boolean
  description: String
  endDate: String
  location: String
  startDate: String
  title: String
}
*/
const CALENDAR_FRAGMENT = gql`
  fragment Calendar on CardV2Calendar {
    allDay
    description
    endDate
    location
    startDate
    title
  }
`;

/*
type CardV2Content {
  text: String
  value: String
  variant: String
}
*/
const CONTENT_FRAGMENT = gql`
  fragment Content on CardV2Content {
    text
    value
    variant
  }
`;

/*
type CardV2Document {
  documentId: String
  fileExtension: String
  listingId: String
  text: String
  url: String
  variant: String
}
*/
const DOCUMENT_FRAGMENT = gql`
  fragment Document on CardV2Document {
    documentId
    fileExtension
    listingId
    text
    url
    variant
  }
`;

/*
type CardV2Link {
  text: String
  url: String
}
*/
const LINK_FRAGMENT = gql`
  fragment Link on CardV2Link {
    text
    url
  }
`;

/*
type CardV2Media {
  url: String
  variant: String
}
 */
const MEDIA_FRAGMENT = gql`
  fragment Media on CardV2Media {
    url
    variant
  }
`;

/*
type CardV2 {
  activityId: String
  calendar: CardV2Calendar
  category: String
  content: [CardV2Content!]
  documents: [CardV2Document]
  editable: Boolean
  eventDateTime: String
  eventTimeStamp: String
  hideable: Boolean
  iconUrl: String
  id: String
  links: [CardV2Link!]
  listingId: String
  media: CardV2Media
  priority: Int
  status: String
  title: String!
  variant: String!
}
*/
export const CARD_FRAGMENT = gql`
  fragment Card on CardV2 {
    activityId
    calendar {
      ...Calendar
    }
    category
    content {
      ...Content
    }
    documents {
      ...Document
    }
    editable
    eventDateTime
    eventTimeStamp
    hideable
    iconUrl
    id
    links {
      ...Link
    }
    listingId
    media {
      ...Media
    }
    priority
    status
    title
    variant
  }
  ${CALENDAR_FRAGMENT}
  ${CONTENT_FRAGMENT}
  ${DOCUMENT_FRAGMENT}
  ${LINK_FRAGMENT}
  ${MEDIA_FRAGMENT}
`;

/*getListingActionsV2: ListingActionsV2 */
export const GET_CARDS = gql`
  query getCards {
    cards: getListingActionsV2 {
      ...Card
    }
  }
  ${CARD_FRAGMENT}
`;
