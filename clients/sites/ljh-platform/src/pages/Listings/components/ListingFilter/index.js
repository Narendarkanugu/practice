import React from "react";
import PropTypes from "prop-types";
import InputBase from "@material-ui/core/InputBase";
import withStyles from "@material-ui/core/styles/withStyles";

import Icon from "@clients-modules/react/lib/components/Icon";

import styles from "./styles";

const ListingFilter = ({ classes, onChange, clear, value }) => {
  return (
    <div className={classes.filterContainer}>
      <InputBase
        classes={{
          root: classes.searchBox,
          input: classes.searchBox
        }}
        placeholder="Search address"
        value={value}
        onChange={onChange}
      />
      {value && (
        <button className={classes.filterCancelBtn} onClick={clear}>
          <Icon iconName="times" iconSize={20} iconColor="#bdbdbd" />
        </button>
      )}
    </div>
  );
};

ListingFilter.propTypes = {
  classes: PropTypes.object,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  clear: PropTypes.func
};

ListingFilter.defaultProps = {
  classes: {},
  value: "",
  clear: () => {}
};

export default withStyles(styles)(ListingFilter);
