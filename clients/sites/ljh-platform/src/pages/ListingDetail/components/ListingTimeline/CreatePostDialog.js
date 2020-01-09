import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { map, get, isEmpty, chain } from "lodash";
import { useQuery, useMutation } from "react-apollo-hooks";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import Loading from "@clients-modules/react/lib/components/Loading";
import Error from "@clients-modules/react/lib/components/Error";

import NotificationContext from "../../../../contexts/NotificationContext";
import DialogForm from "../../../../components/DialogForm";
import ExpandedDialog from "../../../../components/ExpandedDialog";
import { listingTimelineCache } from "../../../../helpers/cache";
import { useForm } from "../../../../hooks/form";
import listingCategories from "../../../../data/listingCategories";
import { GET_DOCUMENTS } from "../../graphql/document";
import { CREATE_CARD } from "../../../../graphql/cardV3";

// import PostPreview from './PostPreview';

const CreatePostDialog = ({ createListingAction, listingId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);
  const createCard = useMutation(CREATE_CARD);

  const { data, loading: loadingDocuments, error } = useQuery(GET_DOCUMENTS, {
    variables: { listingId },
    fetchPolicy: "cache-and-network"
  });
  const documents =
    chain(get(data, "documents"))
      .filter(d => d.published)
      .orderBy(["eventTimestamp"], ["desc"])
      .value() || [];

  const onCreateConfirmed = async ({
    category,
    title,
    description,
    notifyVendor,
    document
  }) => {
    const card = {
      category,
      content: [{ text: description, variant: "paragraph" }],
      title,
      privateDocuments: document ? [{ documentId: document.documentId }] : null
    };

    setLoading(true);

    try {
      const { errors } = await createCard({
        variables: {
          ...card,
          listingId,
          notifyVendor
        },
        update: (cache, { data: { card } }) => {
          const { addCard } = listingTimelineCache(cache, listingId);
          addCard(card);
        }
      });

      if (!isEmpty(errors)) throw errors[0].message;

      showNotification({
        message: "Post created successfully",
        type: "success"
      });

      ljhAnalytics.track("Listing Post created", {
        category,
        listingId,
        title,
        vendorNotified: notifyVendor
      });
    } catch (e) {
      showNotification({
        message: e.message,
        type: "error"
      });
    }

    setLoading(false);
    onClose(true);
  };

  const { inputs, errors, handleChange, handleSubmit } = useForm({
    defaultInputs: {
      category: null,
      title: null,
      description: null,
      document: null,
      notifyVendor: null
    },
    onSubmit: onCreateConfirmed,
    validation: {
      title: value => value.length > 0
    }
  });

  if (isEmpty(documents) && loadingDocuments)
    return <Loading />;
  else if (error) return <Error message={get(error, "message")} />;

  return (
    <ExpandedDialog title="Create post" onClose={() => onClose()}>
      {/* 
      TODO: Re-visit styling for custom post form preview. Disabling for now.
      <PostPreview
        card={{
          title: inputs.title || 'Title',
          content: [{ text: inputs.description || 'Description', variant: 'paragraph' }],
          eventDateTime: new Date()
        }}
      /> 
      */}
      <DialogForm
        submitLabel="Publish"
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
            value: inputs.content && inputs.content[0].text,
            rows: 8
          },
          {
            label: "Attach document",
            name: "document",
            type: "select",
            value: inputs.document,
            options: map(documents, d => ({
              name: d.filename,
              value: d
            }))
          },
          {
            label: "Notify vendor",
            name: "notifyVendor",
            type: "checkbox",
            value: inputs.notifyVendor,
            tooltip:
              "Checking this box will send a notification to all the vendors you have adding to this listing"
          }
        ]}
        loading={loading}
        onCancel={() => onClose()}
        onChange={handleChange}
        onSubmit={handleSubmit}
        inputs={inputs}
        errors={errors}
      />
    </ExpandedDialog>
  );
};

CreatePostDialog.propTypes = {
  createListingAction: PropTypes.func,
  listingId: PropTypes.string,
  onClose: PropTypes.func
};

export default CreatePostDialog;
