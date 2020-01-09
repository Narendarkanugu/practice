import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { graphql } from "react-apollo";
import flowRight from "lodash/flowRight";
import moment from "moment";
import isArray from "lodash/isArray";

import { listingInspectionsCache } from "../../../../helpers/cache";
import ExpandedDialog from "../../../../components/ExpandedDialog";
import DialogForm from "../../../../components/DialogForm";
import PostPreview from "../../../../components/PostPreview";

import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import mutationPutListingInspectionCampaign from "../../graphql/mutationPutListingInspectionCampaign";
import NotificationContext from "../../../../contexts/NotificationContext";

import { useForm } from "../../../../hooks/form";

const EditInspectionDialog = ({
  classes,
  listingId,
  onClose,
  putListingInspectionCampaign,
  selectedInspection
}) => {
  const [loading, setLoading] = useState(false);
  const { showNotification } = useContext(NotificationContext);

  const onCreateConfirmed = async ({
    comments,
    contractsIssuedCount,
    groupsAttendedCount,
    groupsInterestedCount,
    marketValueOpinionDollarsMax,
    marketValueOpinionDollarsMin,
    offersReceivedCount
  }) => {
    setLoading(true);

    try {
      const { inspectionId, published } = selectedInspection;

      const updatedInspection = {
        comments: typeof comments === "string" ? comments.split(/\n/) : [],
        contractsIssuedCount,
        groupsAttendedCount,
        groupsInterestedCount,
        marketValueOpinionDollarsMax,
        marketValueOpinionDollarsMin,
        offersReceivedCount,
        inspectionId,
        listingId,
        published
      };

      await putListingInspectionCampaign({
        variables: updatedInspection,
        update: cache => {
          const { updateInspection } = listingInspectionsCache(
            cache,
            listingId
          );
          updateInspection(updatedInspection);
        }
      });

      showNotification({
        message: "Inspection updated successfully",
        type: "success"
      });

      ljhAnalytics.track("Inspection Report updated", {
        inspectionId,
        listingId
      });
    } catch (e) {
      showNotification({
        message: "Something went wrong updating this inspection",
        type: "error"
      });
    }

    setLoading(false);
    onClose();
  };

  const getParagraphFromStringArray = val => {
    if (!val) {
      return null;
    }
    return isArray(val) ? val.join("\r\n") : "";
  };

  const isNumber = val => !isNaN(val);

  const { inputs, errors, handleChange, handleSubmit } = useForm({
    defaultInputs: {
      comments: getParagraphFromStringArray(selectedInspection.comments),
      contractsIssuedCount: selectedInspection.contractsIssuedCount || 0,
      groupsAttendedCount: selectedInspection.groupsAttendedCount || 0,
      groupsInterestedCount: selectedInspection.groupsInterestedCount || 0,
      marketValueOpinionDollarsMax:
        selectedInspection.marketValueOpinionDollarsMax || 0,
      marketValueOpinionDollarsMin:
        selectedInspection.marketValueOpinionDollarsMin || 0,
      offersReceivedCount: selectedInspection.offersReceivedCount || 0
    },
    onSubmit: onCreateConfirmed,
    validation: {
      contractsIssuedCount: isNumber,
      groupsAttendedCount: isNumber,
      groupsInterestedCount: isNumber,
      marketValueOpinionDollarsMax: isNumber,
      marketValueOpinionDollarsMin: isNumber,
      offersReceivedCount: isNumber
    }
  });

  return (
    <ExpandedDialog title="Edit inspection" onClose={onClose}>
      <React.Fragment>
        <React.Fragment>
          <div className={classes.inspectionCardPreview}>
            <PostPreview
              card={{
                title:
                  inputs.title ||
                  `Open Home Summary - ${moment(
                    selectedInspection.startDateTime
                  ).format("ddd D MMM")}`,
                content: [
                  inputs.groupsAttendedCount > 0
                    ? {
                      text: "Groups attended",
                      value: inputs.groupsAttendedCount,
                      variant: "text_with_value"
                    }
                    : {},
                  inputs.groupsInterestedCount > 0
                    ? {
                      text: "Groups interested",
                      value: inputs.groupsInterestedCount,
                      variant: "text_with_value"
                    }
                    : {},
                  inputs.contractsIssuedCount > 0
                    ? {
                      text: "Contracts issued",
                      value: inputs.contractsIssuedCount,
                      variant: "text_with_value"
                    }
                    : {},
                  inputs.offersReceivedCount > 0
                    ? {
                      text: "Offers received",
                      value: inputs.offersReceivedCount,
                      variant: "text_with_value"
                    }
                    : {},
                  inputs.marketValueOpinionDollarsMin > 0 ||
                    inputs.marketValueOpinionDollarsMax > 0
                    ? {
                      text: `Buyer opinion of market value: $${inputs.marketValueOpinionDollarsMin} to $${inputs.marketValueOpinionDollarsMax}`,
                      variant: "paragraph"
                    }
                    : {},
                  ...(isArray(inputs.comments)
                    ? inputs.comments.map(text => ({
                      text,
                      variant: "paragraph"
                    }))
                    : inputs.comments
                      ? inputs.comments.split(/\n/).map(text => ({
                        text,
                        variant: "paragraph"
                      }))
                      : [])
                ],
                eventDateTime: new Date().toISOString(),
                priority: 70
              }}
            />
          </div>
          <DialogForm
            submitLabel="Save"
            controls={[
              {
                label: "Groups attended",
                name: "groupsAttendedCount",
                type: "number",
                value: inputs.groupsAttendedCount,
                size: "half"
              },
              {
                label: "Groups interested",
                name: "groupsInterestedCount",
                type: "number",
                value: inputs.groupsInterestedCount,
                size: "half"
              },
              {
                label: "Contracts issued",
                name: "contractsIssuedCount",
                type: "number",
                value: inputs.contractsIssuedCount,
                size: "half"
              },
              {
                label: "Offers received",
                name: "offersReceivedCount",
                type: "number",
                value: inputs.offersReceivedCount,
                size: "half"
              },
              {
                label: "Min OMV",
                name: "marketValueOpinionDollarsMin",
                type: "number",
                value: inputs.marketValueOpinionDollarsMin,
                size: "half"
              },
              {
                label: "Max OMV",
                name: "marketValueOpinionDollarsMax",
                type: "number",
                value: inputs.marketValueOpinionDollarsMax,
                size: "half"
              },
              {
                label: "Comments",
                name: "comments",
                type: "multi-line-text",
                value: inputs.comments,
                size: "full",
                rows: 8
              }
            ]}
            loading={loading}
            onCancel={onClose}
            onChange={handleChange}
            onSubmit={handleSubmit}
            inputs={inputs}
            errors={errors}
          />
        </React.Fragment>
      </React.Fragment>
    </ExpandedDialog>
  );
};

const graphqlMutationPutListingInspectionCampaign = graphql(
  mutationPutListingInspectionCampaign,
  {
    name: "putListingInspectionCampaign"
  }
);

EditInspectionDialog.propTypes = {
  card: PropTypes.object,
  classes: PropTypes.object,
  onClose: PropTypes.func,
  listingId: PropTypes.string,
  putListingInspectionCampaign: PropTypes.func,
  selectedInspection: PropTypes.object
};

export default flowRight(graphqlMutationPutListingInspectionCampaign)(
  EditInspectionDialog
);
