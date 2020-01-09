import React from "react";
import PropTypes from "prop-types";

import MaterialIcons from "@material-ui/core/Icon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = props => {
  const { iconName, iconColor, iconSize, iconType } = props;

  const style = {
    fontSize: iconSize,
    color: iconColor
  };

  let icon = null;

  if (iconType === "Material") {
    icon = <MaterialIcons fontSize="inherit">{iconName}</MaterialIcons>;
  } else if (iconType === "FontAwesome") {
    icon = <FontAwesomeIcon icon={iconName} />;
  }

  return <i style={style}>{icon}</i>;
};

Icon.propTypes = {
  iconName: PropTypes.string,
  iconColor: PropTypes.string,
  iconType: PropTypes.string,
  iconSize: PropTypes.number
};

Icon.defaultProps = {
  iconName: "",
  iconColor: "",
  iconType: "FontAwesome",
  iconSize: 24
};

export default Icon;
