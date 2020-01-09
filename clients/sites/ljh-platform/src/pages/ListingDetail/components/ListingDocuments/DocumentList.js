import React from "react";
import PropTypes from "prop-types";
import { map } from "lodash";
import moment from "moment";
import cn from "classnames";
import {
  Grid,
  Paper,
  List,
  ListItem,
  Typography,
  IconButton,
  Switch
} from "@material-ui/core";
import { OpenInNew, Delete } from "@material-ui/icons";
import { withStyles } from "@material-ui/styles";
import { ReactComponent as PdfIcon } from "./pdf.svg";

import styles from "./styles";

function DocumentList({
  classes,
  documents,
  onPublishChange,
  onDownloadClick,
  onDeleteClick,
  disableActions
}) {
  return (
    <Grid container direction="column" spacing={3}>
      {map(documents, d => {
        const {
          documentId,
          filename,
          eventTimestamp,
          createdByEmail,
          published
        } = d;
        return (
          <Grid item key={documentId}>
            <Paper elevation={2} className={classes.card}>
              <List disablePadding>
                <ListItem
                  divider
                  className={classes.header}
                  style={{ maxWidth: "calc(100vw - 48px)" }}
                >
                  <div className={cn(classes.flex, classes.overflowHidden)}>
                    <PdfIcon className={classes.icon} />
                    <Typography component="span">
                      {filename}
                    </Typography>
                  </div>

                  <div className={classes.flex}>
                    <IconButton
                      onClick={onDownloadClick(d)}
                      disabled={disableActions}
                    >
                      <OpenInNew />
                    </IconButton>
                    <IconButton
                      onClick={onDeleteClick(d)}
                      disabled={disableActions}
                    >
                      <Delete />
                    </IconButton>
                  </div>
                </ListItem>
                <ListItem divider className={classes.flexColumn}>
                  <Typography variant="caption">Created by</Typography>
                  <Typography>{createdByEmail}</Typography>
                </ListItem>
                <ListItem divider className={classes.flexSpaceBetween}>
                  <Typography>Published</Typography>
                  <Switch
                    color="default"
                    checked={published}
                    onChange={onPublishChange(d)}
                    disabled={disableActions}
                  />
                </ListItem>
                <ListItem>
                  <Typography>
                    {moment(eventTimestamp).format("DD MMM YY")}
                  </Typography>
                </ListItem>
              </List>
            </Paper>
          </Grid>
        );
      })}
    </Grid>
  );
}

DocumentList.propTypes = {
  classes: PropTypes.object.isRequired,
  documents: PropTypes.array,
  onPublishChange: PropTypes.func.isRequired,
  onDownloadClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  disableActions: PropTypes.bool
};

export default withStyles(styles)(DocumentList);
