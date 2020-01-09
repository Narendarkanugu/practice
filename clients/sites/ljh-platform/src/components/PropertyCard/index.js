import React from "react";
import { withRouter } from "react-router-dom";
import { flowRight, head } from "lodash";
import {
  Avatar,
  Divider,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import ActivityCard from "../ActivityCard";

import styles from "./styles";

const PropertyCard = ({
  actionCount = 0,
  actions,
  addressState = "",
  addressStreet = "",
  addressSuburb = "",
  classes,
  date,
  history,
  hideAction = false,
  hideMediaAndContent = false,
  imageUrl = "",
  listingId,
  price = "",
  status = "",
  pendingAction = null
}) => {
  const onSelect = (history, listingId) => {
    history.push(`/listings/${listingId}`);
  };
  const hasActions = actionCount > 0;
  const pendingActivity = head(actions);
  return (
    <Card className={classes.cardContainer}>
      <CardActionArea onClick={() => onSelect(history, listingId)}>
        {hasActions && (
          <Avatar className={classes.actionCount}>{actionCount}</Avatar>
        )}
        <CardHeader
          classes={ hasActions && !hideAction ? { title: classes.cardTitle }: { title: classes.cardTitleListings }}
          title={addressStreet}
          subheader={`${addressSuburb} ${addressState}`}
        />
        {!hideMediaAndContent && (
          <React.Fragment>
            <CardMedia
              className={classes.listingCardMedia}
              image={imageUrl}
              title={addressStreet}
            />
            <CardContent>
              <Grid container alignItems="center" justify="space-between">
                <Grid item>
                  <div>
                    <Typography variant="body2">{status}</Typography>
                    <Typography color="textSecondary" variant="body2">
                      {date}
                    </Typography>
                  </div>
                </Grid>
                <Grid item>
                  <Typography variant="body2">{price} </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </React.Fragment>
        )}
      </CardActionArea>
      {pendingAction ? (
        <React.Fragment>
          <Divider />
          {pendingAction}
        </React.Fragment>
      ) : null}
      {hasActions && !hideAction ? (
        <React.Fragment>
          <Divider />
          {/* {actions.map((pendingAction) => (
            <ActivityCard
              {...pendingAction}
              activityId={pendingAction.key}
              publishable={true}
              cardIn="actions"
            />

          ))} */}
          <ActivityCard
            {...pendingActivity}
            activityId={pendingActivity.key}
            publishable={true}
            cardIn="actions"
          />

        </React.Fragment>
      ) : null}
    </Card>
  );
};

export default flowRight(
  withStyles(styles),
  withRouter
)(PropertyCard);
