import gql from "graphql-tag";

/*
type ListingDocument {
  createdByEmail: String!
  documentId: String!
  eventTimestamp: String
  fileExtension: String!
  filename: String!
  listingId: String!
  published: Boolean!
}
*/
const LISTING_DOCUMENT = gql`
  fragment Document on ListingDocument {
    createdByEmail
    documentId
    eventTimestamp
    fileExtension
    filename
    listingId
    published
  }
`;

export const GET_DOCUMENTS = gql`
  query getDocuments($listingId: ID!) {
    documents: getListingDocumentsByListingId(listingId: $listingId) {
      ...Document
    }
  }
  ${LISTING_DOCUMENT}
`;

const GET_LISTING_DOCUMENT_BY_ID_RESPONSE = gql`
  fragment DocumentUrl on getListingDocumentByIdResponse {
    linkUrl
    documentId
  }
`;

export const GET_DOCUMENT = gql`
  query getDocument($listingId: ID!, $documentId: ID!, $attachment: Boolean) {
    document: getListingDocumentById(
      listingId: $listingId
      documentId: $documentId
      attachment: $attachment
    ) {
      ...DocumentUrl
    }
  }
  ${GET_LISTING_DOCUMENT_BY_ID_RESPONSE}
`;

const LISTING_DOCUMENT_RESPONSE = gql`
  fragment DocumentResponse on ListingDocumentResponse {
    documentId
    statusCode
  }
`;

export const DELETE_DOCUMENT = gql`
  mutation deleteDocument($listingId: ID!, $documentId: ID!) {
    documentResponse: removeDocumentFromListing(
      listingId: $listingId
      documentId: $documentId
    ) {
      ...DocumentResponse
    }
  }
  ${LISTING_DOCUMENT_RESPONSE}
`;

export const PUBLISH_DOCUMENT = gql`
  mutation publishDocument(
    $listingId: ID!
    $documentId: ID!
    $published: Boolean
  ) {
    document: publishListingDocument(
      listingId: $listingId
      documentId: $documentId
      published: $published
    ) {
      ...Document
    }
  }
  ${LISTING_DOCUMENT}
`;

/*
createListingDocument(
  listingId: ID!
  filename: String!
): createListingDocumentResponse!

type createListingDocumentResponse {
  documentId: String!
  uploadUrl: String!
}
*/
export const CREATE_DOCUMENT = gql`
  mutation createDocument($listingId: ID!, $filename: String!) {
    createDocumentResponse: createListingDocument(
      listingId: $listingId
      filename: $filename
    ) {
      documentId
      uploadUrl
    }
  }
`;

/*
publishListingDocument(
  documentId: ID!
  listingId: ID!
  published: Boolean
): ListingDocument
*/
export const COMPLETE_DOCUMENT_UPLOAD = gql`
  mutation completeDocumentUpload(
    $documentId: ID!
    $listingId: ID!
    $published: Boolean
  ) {
    document: publishListingDocument(
      documentId: $documentId
      listingId: $listingId
      published: $published
    ) {
      ...Document
    }
  }
  ${LISTING_DOCUMENT}
`;
