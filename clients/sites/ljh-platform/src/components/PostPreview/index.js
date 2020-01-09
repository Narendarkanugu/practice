import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ActivityCard from "../ActivityCard";

import styles from "./styles";

const PostPreview = ({ card, classes }) => {
  return (
    <div className={classes.postPreviewContainer}>
      <div className={classes.postContainer}>
        <ActivityCard {...card} />
      </div>
    </div>
  );
};

export default withStyles(styles)(PostPreview);
