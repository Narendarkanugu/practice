import React from "react";
import PropTypes from "prop-types";
import { CardHeader } from "@material-ui/core";
import moment from "moment";
import { CARD_STATUSES } from "../../constants";
import Icon from "@clients-modules/react/lib/components/Icon";

const StandardCardHeader = ({
  classes,
  iconUrl,
  eventDateTime,
  status,
  title,
  category
}) => {
  // Force un-published cards to display the current date
  const displayDate =
    status === CARD_STATUSES["published"] ? eventDateTime : new Date();

  return (
    <CardHeader
      classes={{
        title: classes.cardHeader,
        subheader: classes.cardHeader,
        action: classes.cardIcon
      }}
      title={title}
      subheader={moment(displayDate).format("ddd D MMM")}
      action={
        iconUrl ? (
          <span style={{ backgroundImage: `url("${iconUrl}")` }} />
        ) : (
          category && <Icon iconName={category} iconSize={28} />
        )
      }
    />
  );
};

StandardCardHeader.propTypes = {
  classes: PropTypes.object,
  eventDateTime: PropTypes.string,
  status: PropTypes.oneOf(["pending", "hidden", "published"])
};

export default StandardCardHeader;
