import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Link, withRouter } from "react-router-dom";
import flowRight from "lodash/flowRight";
import { Typography, Paper, Tabs, Tab } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import Error from "@clients-modules/react/lib/components/Error";
import Loading from "@clients-modules/react/lib/components/Loading";
import Icon from "@clients-modules/react/lib/components/Icon";
import ListingsContext from "../../contexts/ListingsContext";
import ListingTabContent from "./components/ListingTabContent";

import styles from "./styles";

const tabs = ["timeline", "listing", "inspections", "documents", "report"];

const ListingDetail = ({ classes, match: { params } }) => {
  const { getListingById, loading, error } = useContext(ListingsContext);

  if (loading) {
    return (
      <div style={{ minHeight: "90vh" }}>
        <Loading />
      </div>
    );
  } else if (error) {
    return <Error message={error.message} />;
  }

  let listing = getListingById(params.listingId);

  if (!listing) {
    return <Error message="Listing does not exist" />;
  }
  if (!listing.propertyAddress) {
    listing.propertyAddress = {};
  }

  return (
    <div className={classes.listingDetail}>
      <div className={classes.listingBarContainer}>
        <div className={classes.listingBar}>
          <div>
            <Link
              to="/listings"
              className={classes.listingBackButton}
              style={{ textDecoration: "none" }}
            >
              <Icon
                className={classes.listingBackIcon}
                iconName={"arrow-left"}
                iconSize={20}
                iconColor="#bdbdbd"
              />
              <Typography className={classes.listingBackText} color="inherit">
                Back to listings
              </Typography>
            </Link>
          </div>
          <div className={classes.addressDiv}>
            <Typography
              className={classes.listingTitle}
              variant="h4"
              color="inherit"
            >
              {listing.propertyAddress.street}
            </Typography>
          </div>
        </div>
      </div>
      <Paper classes={{ root: classes.tabHeader }} square={true}>
        <Tabs
          value={params.tab}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
        >
          {tabs.map(name => (
            <Tab
              key={name}
              label={name}
              component={Link}
              to={`/listings/${params.listingId}/${name}`}
              value={name}
            />
          ))}
        </Tabs>
      </Paper>
      <ListingTabContent listing={listing} currentTab={params.tab} />
    </div>
  );
};

ListingDetail.propTypes = {
  classes: PropTypes.object
};

export default flowRight(withRouter, withStyles(styles))(ListingDetail);
