import {
  Grid,
  Grow,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import classNames from "classnames";
import ljhAnalytics from "@clients-modules/js/ljhAnalytics";
import React, { Component } from "react";
import RealHubWarningDialog from "./RealHubWarningDialog";
import styles from "./styles";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";

class DashboardLinksSection extends Component {
  state = {
    showRealHubWarningDialog: false
  };

  handleItemClick = async (linkUrl, title, linkVariant) => {
    let link;

    if (linkVariant === "system.realhub-login" && !linkUrl) {
      this.setState({
        showRealHubWarningDialog: true
      });
    }
    link = linkUrl;

    if (!link) return;

    this.routeToLink(linkUrl, title);
  };

  routeToLink = (linkUrl, title, linkVariant) => {
    ljhAnalytics.track("Dashboard link click", { linkUrl, title });
    if (linkVariant === "link.external") {
      window.open(linkUrl, "_blank");
    }
    window.open(linkUrl);
  };

  render() {
    const { showRealHubWarningDialog } = this.state;
    const { classes, offices, serviceSections } = this.props;

    if (!serviceSections) {
      return null;
    }

    return serviceSections.map(section => (
      <Grow key={section.title} in>
        <Grid item xs={12} md={4}>
          <RealHubWarningDialog
            show={showRealHubWarningDialog}
            offices={offices}
            onClose={() => this.setState({ showRealHubWarningDialog: false })}
          />
          <Paper className={classes.sectionContainer}>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeadCell}>
                    {section.title}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {section.items.map(
                  ({ linkUrl, title, linkVariant, iconUrl }) => (
                    <TableRow
                      className={classNames(
                        classes.tableRow,
                        classes.tableRowHover
                      )}
                      key={title}
                      onClick={() =>
                        this.handleItemClick(linkUrl, title, linkVariant)
                      }
                    >
                      <TableCell className={classes.tableCell}>
                        <img
                          className={classes.serviceIcon}
                          src={iconUrl}
                          width="24"
                          height="24"
                          alt=""
                        />
                        {title}
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grow>
    ));
  }
}

DashboardLinksSection.propTypes = {
  classes: PropTypes.object
};

export default withStyles(styles)(DashboardLinksSection);
