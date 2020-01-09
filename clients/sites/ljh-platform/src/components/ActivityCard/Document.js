import React, { useContext } from "react";
import PropTypes from "prop-types";
import { get, isEmpty } from "lodash";
import { Link } from "@material-ui/core";

import { useApolloClient } from "react-apollo-hooks";
import { GET_DOCUMENT } from "../../pages/ListingDetail/graphql/document";
import NotificationContext from "../../contexts/NotificationContext";

function Document({ classes, document, isDocumentPublished }) {
  const client = useApolloClient();
  const { showNotification } = useContext(NotificationContext);

  if (!document) return null;

  const handleOnClick = async () => {
    try {
      const documentId = get(document, "documentId");
      // Check that the document exist and that it is published
      // else ignore user click
      if (isDocumentPublished(documentId) === false) {
        showNotification &&
          showNotification({
            message: `Please publish "${document.text}" to view it.`,
            type: "info"
          }); return;
      }

      const { data, errors } = await client.query({
        query: GET_DOCUMENT,
        variables: {
          listingId: get(document, "listingId"),
          documentId,
          attachment: false
        },
        fetchPolicy: "network-only"
      });
      if (!isEmpty(errors)) throw errors[0].message;
      const documentUrl = get(data, "document.linkUrl");
      if (documentUrl) {
        window.open(documentUrl, "_blank", "noopener noreferrer");
      }
    } catch (e) {
      showNotification &&
        showNotification({
          message: e.message.replace("GraphQL error:", "").trim(),
          type: "error"
        });
    }
  };

  return (
    <Link
      color="secondary"
      onClick={handleOnClick}
      className={classes.document}
    >
      {document.text.toUpperCase()}
    </Link>
  );
}

Document.propTypes = {
  classes: PropTypes.object,
  document: PropTypes.object
};

export default Document;
