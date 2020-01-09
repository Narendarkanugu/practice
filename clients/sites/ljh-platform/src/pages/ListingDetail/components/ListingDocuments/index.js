import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { isEmpty, get } from "lodash";
import { useQuery, useMutation, useApolloClient } from "react-apollo-hooks";
import { withStyles } from "@material-ui/styles";
import { Hidden, Fab, Typography, CircularProgress } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import Loading from "@clients-modules/react/lib/components/Loading";
import Error from "@clients-modules/react/lib/components/Error";

import styles from "./styles";
import Header from "../Header";
import DocumentTable from "./DocumentTable";
import DocumentList from "./DocumentList";
import ConfirmDialog from "../../../../components/ConfirmDialog";
import {
  GET_DOCUMENTS,
  GET_DOCUMENT,
  DELETE_DOCUMENT,
  PUBLISH_DOCUMENT,
  CREATE_DOCUMENT,
  COMPLETE_DOCUMENT_UPLOAD
} from "../../graphql/document";
import NotificationContext from "../../../../contexts/NotificationContext";

function ListingDocuments({ classes, listingId, disableActions }) {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showPublishConfirm, setShowPublishConfirm] = useState(false);
  const [tempDocument, setTempDocument] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const {
    data: _getDocuments,
    loading: loadingDocuments,
    error,
    refetch: refetchDocuments
  } = useQuery(GET_DOCUMENTS, {
    variables: { listingId },
    fetchPolicy: "cache-and-network"
  });

  const client = useApolloClient();

  const deleteDocument = useMutation(DELETE_DOCUMENT);
  const publishDocument = useMutation(PUBLISH_DOCUMENT);
  const createDocument = useMutation(CREATE_DOCUMENT);
  const completeDocumentUpload = useMutation(COMPLETE_DOCUMENT_UPLOAD);

  const documents = get(_getDocuments, "documents") || [];

  if (isEmpty(documents) && loadingDocuments)
    return <Loading />;
  else if (error) return <Error message={get(error, "message")} />;

  const handleDelete = async () => {
    setConfirmLoading(true);
    let success = false;
    try {
      const { data } = await deleteDocument({
        variables: {
          listingId,
          documentId: tempDocument.documentId
        }
      });
      success = get(data, "documentResponse.statusCode") === "200";
    } catch (error) {
      success = false;
    }

    if (success) {
      refetchDocuments();
      showNotification({
        message: `Document "${tempDocument.filename}" deleted successfully.`,
        type: "success"
      });
    } else
      showNotification({
        message:
          "There's a problem deleting this document. Please try again later.",
        type: "error"
      });

    setConfirmLoading(false);
    setShowDeleteConfirm(false);
  };
  const handleCancelDelete = () => {
    setTempDocument(null);
    setShowDeleteConfirm(false);
  };
  const handleOnDeleteClick = d => () => {
    setTempDocument(d);
    setShowDeleteConfirm(true);
  };
  const handlePublish = async () => {
    setConfirmLoading(true);
    const published = tempDocument.published;
    try {
      const { errors } = await publishDocument({
        variables: {
          listingId,
          documentId: tempDocument.documentId,
          published: !published
        }
      });
      if (!isEmpty(errors)) throw Error(errors[0].message);
      refetchDocuments();
      showNotification({
        message: `Document ${
          published ? "unpublished" : "published"
          } successfully.`,
        type: "success"
      });
    } catch (e) {
      showNotification({
        message: e.message,
        type: "error"
      });
    }

    setConfirmLoading(false);
    setShowPublishConfirm(false);
  };
  const handleCancelPublish = () => {
    setTempDocument(null);
    setShowPublishConfirm(false);
  };
  const handleOnPublishChange = d => () => {
    setTempDocument(d);
    setShowPublishConfirm(true);
  };
  const handleOnDownloadClick = d => async () => {
    setDownloading(true);
    let success = false;
    try {
      const { data } = await client.query({
        query: GET_DOCUMENT,
        variables: {
          listingId,
          documentId: d.documentId,
        },
        fetchPolicy: "network-only"
      });
      const documentUrl = get(data, "document.linkUrl");
      if (documentUrl) {
        window.open(documentUrl, "_blank", "noopener noreferrer");
        success = true;
      }
    } catch (error) {
      success = false;
    }
    if (!success)
      showNotification({
        message: `Error getting "${d.filename}" document, please try again later`,
        type: "error"
      });
    setDownloading(false);
  };

  const handleFileUpload = async ({ target: { files } }) => {
    setUploading(true);
    const file = files[0];
    const filename = file.name;
    // check file size isn't larger than 10MB
    const fileSizeMB = file.size / 1024 / 1024;
    if (fileSizeMB > 10)
      showNotification({
        message: "File size exceeds 10 MB. Please pick another file.",
        type: "error"
      });
    else
      try {
        /*
      This is a 3 stage file upload
      1. Call create mutation to get uploadUrl
      2. Upload file to uploadUrl
      3. Call complete upload mutation to get the document
      */
        const { data } = await createDocument({
          variables: {
            listingId,
            filename
          }
        });
        if (!isEmpty(data.errors)) throw Error(data.errors[0].message);
        else {
          const res = await fetch(data.createDocumentResponse.uploadUrl, {
            method: "PUT",
            body: file
          });
          if (!res.ok) throw Error(res.message);
          else {
            const result = await completeDocumentUpload({
              variables: {
                documentId: data.createDocumentResponse.documentId,
                listingId
              }
            });
            if (!isEmpty(result.errors)) throw Error(result.errors[0].message);
            refetchDocuments();
            showNotification({
              message: `Document "${filename}" uploaded successfully.`,
              type: "success"
            });
          }
        }
      } catch (error) {
        showNotification({
          message: error.message,
          type: "error"
        });
      }

    setUploading(false);
  };

  const disabled = disableActions || uploading;
  return (
    <div className={classes.container}>
      <input
        accept=".pdf"
        style={{ display: "none" }}
        id="file-upload"
        type="file"
        onChange={handleFileUpload}
      />
      <Header
        title="Documents"
        actionButton={
          <label htmlFor={disabled ? "" : "file-upload"}>
            <Fab size="small" disabled={disabled} component="span">
              {uploading ? (
                <CircularProgress
                  size={24}
                  className={classes.buttonProgress}
                />
              ) : (
                  <Add />
                )}
            </Fab>
          </label>
        }
      />

      {isEmpty(documents) ? (
        <Typography align="center">
          There are no documents.
          <br />
          Why not upload one now?
        </Typography>
      ) : (
          <React.Fragment>
            <Hidden mdUp>
              {/* Mobile */}
              <DocumentList
                documents={documents}
                onDeleteClick={handleOnDeleteClick}
                onDownloadClick={handleOnDownloadClick}
                onPublishChange={handleOnPublishChange}
                disableActions={disableActions || downloading}
              />
            </Hidden>

            <Hidden smDown>
              {/* Desktop */}
              <DocumentTable
                documents={documents}
                onDeleteClick={handleOnDeleteClick}
                onDownloadClick={handleOnDownloadClick}
                onPublishChange={handleOnPublishChange}
                disableActions={disableActions || downloading}
              />
            </Hidden>
          </React.Fragment>
        )}
      <ConfirmDialog
        open={showDeleteConfirm}
        title="Delete document?"
        contentText="Deleting this document will remove it from the platform."
        onCancel={handleCancelDelete}
        onConfirm={handleDelete}
        loading={confirmLoading}
      />
      <ConfirmDialog
        open={showPublishConfirm}
        title={`${
          tempDocument && tempDocument.published ? "Unpublish" : "Publish"
          } to vendor?`}
        contentText={
          tempDocument && tempDocument.published
            ? "Vendor will no longer be able to access this document"
            : "Vendor will be able to access this document"
        }
        onCancel={handleCancelPublish}
        onConfirm={handlePublish}
        loading={confirmLoading}
      />
    </div>
  );
}

ListingDocuments.propTypes = {
  classes: PropTypes.object.isRequired,
  disableActions: PropTypes.bool
};

export default withStyles(styles)(ListingDocuments);
