import React from "react";
import PropTypes from "prop-types";
import { Grid, Slide } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import size from "lodash/size";

import EmptyState from "@clients-modules/react/lib/components/EmptyState";
import ActivityCard from "../../../../components/ActivityCard";

import styles from "./styles";

const TimelineCards = ({ classes, cards, status, isDocumentPublished }) => {
  return (
    <Grid container direction="column" spacing={2}>
      {size(cards) === 0 ? (
        <div style={{ marginTop: 8 }}>
          <EmptyState
            title="No posts"
            iconName="sticky-note"
            iconSize={64}
            content={`There are no ${status} cards for this listing`}
          />
        </div>
      ) : (
          cards.map(card => {
              return (
                <Slide
                  key={card.id}
                  direction="up"
                  in={true}
                  mountOnEnter
                  unmountOnExit
                >
                  <Grid classes={{ root: classes.cardContainer }} item>
                    <ActivityCard
                      isDocumentPublished={isDocumentPublished}
                      publishable={card.status !== "published"}
                      {...card}
                    />
                  </Grid>
                </Slide>
              )
          })
        )}
    </Grid>
  )
};

TimelineCards.defaultProps = {
  cards: []
};

TimelineCards.propTypes = {
  cards: PropTypes.array,
  classes: PropTypes.object,
  status: PropTypes.string,
  isDocumentPublished: PropTypes.func,
};

export default withStyles(styles)(TimelineCards);
