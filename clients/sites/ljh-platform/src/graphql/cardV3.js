import gql from "graphql-tag";
import { CARD_FRAGMENT } from "./cardV2";
/*
createListingActionV3(
  category: String
  content: [CardInputV2Content!]
  listingId: ID!
  notifyVendor: Boolean
  privateDocuments: [CardInputV2PrivateDocument!]
  publicDocuments: [CardInputV2PublicDocument!]
  title: String!
): CardV2
*/
export const CREATE_CARD = gql`
  mutation createCard(
    $category: String
    $content: [CardInputV2Content!]
    $listingId: ID!
    $notifyVendor: Boolean
    $privateDocuments: [CardInputV2PrivateDocument!]
    $publicDocuments: [CardInputV2PublicDocument!]
    $title: String!
  ) {
    card: createListingActionV3(
      category: $category
      content: $content
      listingId: $listingId
      notifyVendor: $notifyVendor
      privateDocuments: $privateDocuments
      publicDocuments: $publicDocuments
      title: $title
    ) {
      ...Card
    }
  }
  ${CARD_FRAGMENT}
`;

/*
  editListingActionV3(
    activityId: ID!
    category: String
    content: [CardInputV2Content!]
    privateDocuments: [CardInputV2PrivateDocument!]
    publicDocuments: [CardInputV2PublicDocument!]
    title: String!
  ): CardV2
*/
export const EDIT_CARD = gql`
  mutation editCard(
    $activityId: ID!
    $category: String
    $content: [CardInputV2Content!]
    $privateDocuments: [CardInputV2PrivateDocument!]
    $publicDocuments: [CardInputV2PublicDocument!]
    $title: String!
  ) {
    card: editListingActionV3(
      activityId: $activityId
      category: $category
      content: $content
      privateDocuments: $privateDocuments
      publicDocuments: $publicDocuments
      title: $title
    ) {
      ...Card
    }
  }
  ${CARD_FRAGMENT}
`;
