import React from "react";
import PropTypes from "prop-types";
import {
  Checkbox,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import ActionButton from "@clients-modules/react/lib/components/ActionButton";
import Icon from "@clients-modules/react/lib/components/Icon";

import isNil from "lodash/isNil";

const styles = () => ({
  fullWidth: {
    display: "inline-block",
    width: "100%",
    "&:not(:first-child)": {
      marginTop: "1rem"
    }
  },
  halfWidth: {
    display: "inline-block",
    width: "49%",
    "&:nth-child(odd)": {
      marginRight: "2%"
    }
  }
});

const DialogForm = ({
  classes,
  controls,
  disabled,
  errors,
  inputs,
  loading,
  onCancel,
  onChange,
  onSubmit,
  submitLabel
}) => {
  const renderFormInput = ({
    label,
    name,
    disabled,
    disableMargin,
    disableShrink,
    required,
    tooltip,
    type,
    rows,
    options
  }) => {
    switch (type) {
      case "text":
        return (
          <TextField
            fullWidth
            id={name}
            label={label}
            disabled={disabled}
            margin={disableMargin ? "none" : "normal"}
            name={name}
            onChange={onChange}
            required={required}
            value={inputs[name]}
            variant="outlined"
            error={errors[name]}
            InputLabelProps={disableShrink ? { shrink: true } : undefined}
          />
        );
      case "number":
        return (
          <TextField
            fullWidth
            id={name}
            inputProps={{ min: 0 }}
            label={label}
            margin={disableMargin ? "none" : "normal"}
            name={name}
            onChange={onChange}
            required={required}
            type="number"
            value={inputs[name]}
            variant="outlined"
            error={errors[name]}
          />
        );
      case "multi-line-text":
        return (
          <TextField
            fullWidth
            id={name}
            label={label}
            multiline
            name={name}
            onChange={onChange}
            required={required}
            rows={rows || 5}
            value={inputs[name]}
            variant="outlined"
            error={errors[name]}
          />
        );
      case "select":
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor="select">{label}</InputLabel>
            <Select
              inputProps={{
                id: "select",
                name
              }}
              fullWidth
              onChange={onChange}
              style={{ minHeight: 40 }}
              value={inputs[name] || ""}
              variant="outlined"
              error={errors[name]}
              SelectDisplayProps={{ style: { paddingLeft: 8 } }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map(({ name, value }) => (
                <MenuItem key={value} value={value}>
                  <Typography variant="subtitle1">{name}</Typography>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "icon-select":
        return (
          <FormControl fullWidth>
            <InputLabel htmlFor="icon-select">{label}</InputLabel>
            <Select
              inputProps={{
                id: "icon-select",
                name
              }}
              fullWidth
              onChange={onChange}
              style={{ minHeight: 40 }}
              value={inputs[name] || ""}
              variant="outlined"
              error={errors[name]}
              SelectDisplayProps={{ style: { paddingLeft: 8 } }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {options.map(({ name, value }) => (
                <MenuItem key={value} value={value}>
                  <Grid
                    container
                    zeroMinWidth
                    spacing={24}
                    alignItems="center"
                    style={{
                      display: "flex",
                      flexDirection: "row"
                    }}
                  >
                    <Grid item style={{ width: '36px' }}>
                      <Icon iconName={value} iconSize={16} />
                    </Grid>
                    <Grid item>
                      <Typography variant="subtitle1">{name}</Typography>
                    </Grid>
                  </Grid>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case "checkbox":
        return (
          <Tooltip title={tooltip} placement="bottom-start">
            <FormControlLabel
              control={
                <Checkbox
                  name={name}
                  checked={inputs[name]}
                  onChange={onChange}
                />
              }
              label={label}
            />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const isInvalid = () =>
    Object.keys(errors).length > 0 ||
    Object.values(inputs).every(x => isNil(x));

  return (
    <React.Fragment>
      <DialogContent>
        {controls.map(control => (
          <div
            key={control.name}
            className={
              control.size === "half" ? classes.halfWidth : classes.fullWidth
            }
          >
            {renderFormInput(control)}
          </div>

        ))}
      </DialogContent>
      <DialogActions>
        <ActionButton onClick={onCancel}>Cancel</ActionButton>
        <ActionButton
          disabled={isInvalid()}
          onClick={() => onSubmit(inputs)}
          loading={loading}
        >
          {submitLabel}
        </ActionButton>
      </DialogActions>
    </React.Fragment>
  );
};

DialogForm.propTypes = {
  submitLabel: PropTypes.string,
  controls: PropTypes.array,
  loading: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func,
  title: PropTypes.string,
  size: PropTypes.oneOf(["half", "full"])
};

export default withStyles(styles)(DialogForm);
