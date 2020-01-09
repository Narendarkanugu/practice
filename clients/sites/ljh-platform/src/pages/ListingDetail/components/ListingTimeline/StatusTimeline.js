import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography
} from "@material-ui/core";
import { ExpandMore } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";

import TimelineCards from "./TimelineCards";

import styles from "./styles";

const StatusTimeline = ({
  cards,
  classes,
  defaultExpanded,
  status,
  expandable,
  isDocumentPublished
}) => {
  const [expanded, setExpanded] = useState(defaultExpanded);
  return (
    <ExpansionPanel
      classes={{ root: classes.expandPanel }}
      elevation={2}
      expanded={expanded}
      onChange={() => (expandable ? setExpanded(!expanded) : {})}
      square={true}
    >
      <ExpansionPanelSummary expandIcon={expandable ? <ExpandMore /> : null}>
        <Typography classes={{ root: classes.statusHeader }}>
          {status}
        </Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails>
        <TimelineCards cards={cards} status={status} isDocumentPublished={isDocumentPublished} />
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

StatusTimeline.propTypes = {
  cards: PropTypes.array,
  classes: PropTypes.object,
  defaultExpanded: PropTypes.bool,
  status: PropTypes.string
};

StatusTimeline.defaultProps = {
  defaultExpanded: false,
  expandable: true
};

export default withStyles(styles)(StatusTimeline);
