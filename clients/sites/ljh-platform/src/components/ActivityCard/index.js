import React, { useState } from "react";
import PropTypes from "prop-types";
import { get } from "lodash";
import { Card } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";

import StandardCardContent from "./StandardCardContent";
import StandardCardLinks from "./StandardCardLinks";
import StandardCardHeader from "./StandardCardHeader";

import styles from "./styles";
import Document from "./Document";
import SecondaryLinks from "./SecondaryLinks";

const PropertyCard = ({ classes, isDocumentPublished, cardIn, ...cardData }) => {
  const {
    content,
    editable,
    eventDateTime,
    hideable,
    iconUrl,
    links,
    media,
    priority,
    publishable,
    status,
    title,
    variant,
    documents
  } = cardData;

  const cardType = variant && variant.split(".")[1];

  const getCardBackground = priority => {
    if (priority > 50) {
      return "#F2F3F2";
    } else {
      return "#FFFFFF";
    }
  };

  const showDocument = get(documents, "[0].documentId") || false;

  // code for toggle lengthy text
  const [expandCard, setExpandCard] = useState(false);

  const toggleExtraText = () => {
    setExpandCard(!expandCard);
  }
  const hideExtraText = () => {
    setExpandCard(false);
  }


  return (
    <Card
      className={classes.card}
      style={{ backgroundColor: getCardBackground(priority) }}
      elevation={3}
    // onMouseLeave={hideExtraText}
    >
      <StandardCardHeader
        classes={classes}
        iconUrl={iconUrl}
        eventDateTime={eventDateTime}
        status={status}
        title={title}
        category={get(cardData, "category")}
      />
      <StandardCardContent classes={classes} content={content} media={media} cardIn={cardIn} handleContent={toggleExtraText} expandCard={expandCard} />
      {showDocument && (
        <Document
          classes={classes}
          document={documents[0]}
          isDocumentPublished={isDocumentPublished}
        />
      )}
      <StandardCardLinks
        links={links || []}
        publishable={publishable}
        hideable={hideable}
        cardData={cardData}
      />
      <SecondaryLinks
        classes={classes}
        links={links || []}
        editable={editable}
        hideable={hideable}
        cardData={cardData}
        cardType={cardType}
        status={status}
      />
    </Card>
  );
};

PropertyCard.propTypes = {
  content: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string
    })
  ),
  eventDateTime: PropTypes.string,
  iconUrl: PropTypes.string,
  key: PropTypes.string,
  title: PropTypes.string
};

PropertyCard.defaultProps = {
  content: [],
  eventDateTime: "",
  iconUrl: "",
  key: "",
  links: [],
  title: ""
};

export default withStyles(styles)(PropertyCard);
