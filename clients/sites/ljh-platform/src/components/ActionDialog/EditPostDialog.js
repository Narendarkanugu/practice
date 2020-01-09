import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { map, get, isEmpty, find, chain } from "lodash";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import Loading from "@clients-modules/react/lib/components/Loading";
import Error from "@clients-modules/react/lib/components/Error";

import { EDIT_CARD } from "../../graphql/cardV3";
import NotificationContext from "../../contexts/NotificationContext";
import { useForm } from "../../hooks/form";
import listingCategories from "../../data/listingCategories";

import DialogForm from "../DialogForm";
import ExpandedDialog from "../ExpandedDialog";
import { useQuery, useMutation } from "react-apollo-hooks";
import { GET_DOCUMENTS } from "../../pages/ListingDetail/graphql/document";

const EditPostDialog = ({ card, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const editCard = useMutation(EDIT_CARD);
  const { data, loading: loadingDocuments, error } = useQuery(GET_DOCUMENTS, {
    skip: !get(card, "listingId"),
    variables: { listingId: get(card, "listingId") },
    fetchPolicy: "cache-and-network"
  });
  const documents =
    chain(get(data, "documents"))
      .filter(d => d.published)
      .orderBy(["eventTimestamp"], ["desc"])
      .value() || [];

  const onEditConfirmed = async ({
    category,
    title,
    description,
    documentId
  }) => {
    const { listingId, id } = card;

    setLoading(true);
    let success = false;

    try {
      const document =
        documentId && find(documents, d => d.documentId === documentId);
      const { errors } = await editCard({
        variables: {
          activityId: id,
          category,
          content: [
            {
              text: description,
              variant: "paragraph"
            }
          ],
          title,
          privateDocuments: document
            ? [{ documentId: document.documentId }]
            : null
        }
      });
      if (!isEmpty(errors)) throw errors[0].message;

      ljhAnalytics.track("Listing Post edited", {
        category,
        listingId,
        title
      });
      success = true;
    } catch (e) {
      showNotification &&
        showNotification({
          message: e.message,
          type: "error"
        });
    }
    if (success) {
      showNotification &&
        showNotification({
          message: "Post edited successfully",
          type: "success"
        });
      onClose();
    }
    setLoading(false);
  };

  const { inputs, errors, handleChange, handleSubmit } = useForm({
    defaultInputs: {
      category: get(card, "category") || null,
      title: get(card, "title") || "",
      description: get(card, "content[0].text") || "",
      notifyVendor: false,
      documentId: get(card, "documents.[0].documentId") || null
    },
    onSubmit: onEditConfirmed,
    validation: {
      title: value => value.length > 0
    }
  });

  if (card === null) return null;

  if (isEmpty(documents) && loadingDocuments)
    return <Loading />;
  else if (error) return <Error message={get(error, "message")} />;

  return (
    <ExpandedDialog title="Edit post" onClose={onClose}>
      <DialogForm
        submitLabel="Save"
        controls={[
          {
            label: "Category",
            name: "category",
            type: "icon-select",
            value: inputs.category,
            options: listingCategories.map(({ name, icon }) => ({
              name,
              value: icon
            }))
          },
          {
            label: "Title",
            name: "title",
            type: "text",
            value: inputs.title,
            required: true
          },
          {
            label: "Description",
            name: "description",
            type: "multi-line-text",
            value: inputs.description,
            rows: 10
          },
          {
            label: "Attach document",
            name: "documentId",
            type: "select",
            value: inputs.document,
            options: map(documents, d => ({
              name: d.filename,
              value: d.documentId
            }))
          }
        ]}
        loading={loading}
        onCancel={onClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
        inputs={inputs}
        errors={errors}
      />
    </ExpandedDialog>
  );
};

EditPostDialog.propTypes = {
  card: PropTypes.object,
  editListingAction: PropTypes.func,
  listingId: PropTypes.string,
  onClose: PropTypes.func
};

export default EditPostDialog;
