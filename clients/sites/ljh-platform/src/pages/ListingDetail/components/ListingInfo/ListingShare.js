import React, { useContext, useState } from "react";
import { graphql } from "react-apollo";
import flowRight from "lodash/flowRight";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import emailValidator from "email-validator";
import { get } from "lodash";

import DialogForm from "../../../../components/DialogForm";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import mutationAddVendorToListing from "../../graphql/mutationAddVendorToListing";
import NotificationContext from "../../../../contexts/NotificationContext";
import { useForm } from "../../../../hooks/form";
import { listingVendorCache } from "../../../../helpers/cache";

import styles from "./styles";

const ListingShare = ({
  addVendorToListing,
  classes,
  listingId,
  handleClose,
  vendors
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedVendorIndex, setSelectedVendorIndex] = useState(null);
  const { showNotification } = useContext(NotificationContext);

  const onShareConfirmed = ({ email, name }) => {
    setLoading(true);

    addVendorToListing({
      variables: { listingId, email, name },
      update: cache => {
        const { addVendor } = listingVendorCache(cache, listingId);
        addVendor({ name, email });
      }
    })
      .then(() => {
        showNotification({
          message: `Listing successfully shared with ${email}`,
          type: "success"
        });
        ljhAnalytics.track("Listing shared with Vendor", { listingId, email });
      })
      .catch(() => {
        showNotification({
          message: "Something went wrong sharing this listing",
          type: "error"
        });
      })
      .then(() => {
        handleClose();
      });
  };

  const { inputs, errors, handleChange, handleSubmit, reset } = useForm({
    defaultInputs: {
      email: null,
      name: null
    },
    onSubmit: onShareConfirmed,
    validation: {
      email: value => emailValidator.validate(value),
      name: value => value.length > 0
    }
  });

  const onVendorSelect = e => {
    setSelectedVendorIndex(e.target.value);
    const vendor = Number.isInteger(e.target.value)
      ? vendors[e.target.value]
      : { name: "", email: "" };
    reset(vendor);
  };

  return (
    <Dialog fullWidth open={true} onClose={handleClose}>
      <DialogTitle>Share with vendor</DialogTitle>
      <DialogContent>
        <Typography>
          Sharing will send an email to the email address below with a link to
          the Vendor App.
        </Typography>
        {/* Only show vendor select dropdown if listing has existing vendors */}
        {vendors.length > 0 && (
          <FormControl classes={{ root: classes.vendorDropdown }} fullWidth>
            <InputLabel htmlFor="vendor-select">Select vendor</InputLabel>
            <Select
              inputProps={{
                id: "vendor-select",
                name: "vendor-select"
              }}
              fullWidth
              onChange={onVendorSelect}
              style={{ minHeight: 40 }}
              value={
                Number.isInteger(selectedVendorIndex) ? selectedVendorIndex : ""
              }
              variant="outlined"
            >
              <MenuItem value="">
                <em>New</em>
              </MenuItem>
              {vendors.map(({ name }, index) => (
                <MenuItem key={name} value={index}>
                  <Typography variant="subtitle1">{name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>
      <DialogForm
        submitLabel="Share"
        controls={[
          {
            label: "Email",
            name: "email",
            type: "text",
            value: inputs.email,
            required: true,
            disabled: get(vendors[selectedVendorIndex], "email"),
            disableShrink: true
          },
          {
            label: "Name",
            name: "name",
            type: "text",
            value: inputs.name,
            required: true,
            disabled: get(vendors[selectedVendorIndex], "name"),
            disableMargin: true,
            disableShrink: true
          }
        ]}
        loading={loading}
        onCancel={handleClose}
        onChange={handleChange}
        onSubmit={handleSubmit}
        inputs={inputs}
        errors={errors}
      />
    </Dialog>
  );
};

const graphqlMutationAddVendorToListing = graphql(mutationAddVendorToListing, {
  name: "addVendorToListing"
});

export default flowRight(
  graphqlMutationAddVendorToListing,
  withStyles(styles)
)(ListingShare);
