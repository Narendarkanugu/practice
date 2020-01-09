import React, { useContext } from "react";
import PropTypes from "prop-types";
import { CardActions, Grid, Button } from "@material-ui/core";

import { ACTION_DIALOGS } from "../../constants";
import ActionsContext from "../../contexts/ActionsContext";

const StandardCardLinks = ({ cardData, links, publishable, hideable }) => {
  const { toggleDialog } = useContext(ActionsContext);

  const renderPrimaryLinks = () => {
    let primaryLinks = [];

    if (publishable) {
      primaryLinks = (
        <React.Fragment>
          <Button
            onClick={() =>
              toggleDialog(ACTION_DIALOGS["publish-confirm"], cardData)
            }
            color="secondary"
          >
            Publish
          </Button>
          {hideable && (
            <Button
              onClick={() =>
                toggleDialog(ACTION_DIALOGS["hide-confirm"], cardData)
              }
              color="secondary"
            >
              Hide
            </Button>
          )}

          {links.length > 0 && (
            <Button href={links[0].url} target="_blank" color="secondary"
            >
              {links[0].text}
            </Button>)}
        </React.Fragment>
      );
    } else {
      primaryLinks = links.map(({ text, url }) => (
        <Button key={text} href={url} target="_blank" color="secondary">
          {text}
        </Button>
      ));
    }

    return <Grid item>{primaryLinks}</Grid>;
  };

  return <CardActions>{renderPrimaryLinks()}</CardActions>;
};

StandardCardLinks.propTypes = {
  cardData: PropTypes.object,
  cardType: PropTypes.string,
  editable: PropTypes.bool,
  hideable: PropTypes.bool,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      url: PropTypes.string
    })
  ),
  publishable: PropTypes.bool,
  status: PropTypes.string
};

export default StandardCardLinks;
