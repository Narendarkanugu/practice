import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Menu, MenuItem, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { ACTION_DIALOGS, CARD_TYPES, CARD_STATUSES } from "../../constants";
import ActionsContext from "../../contexts/ActionsContext";
const openInNewTab = url => {
  window.open(url, "_blank");
};

function SecondaryLinks({
  classes,
  cardData,
  cardType,
  status,
  editable,
  links,
  hideable
}) {
  const [menuElement, setMenuElement] = useState(null);
  const { toggleDialog } = useContext(ActionsContext);
  let secondaryLinks = [];

  // Don't allow direct editing for Open Home Summary cards. Currently needs to be done from the inspection table.
  if (editable && cardType !== CARD_TYPES["inspection-report"]) {
    secondaryLinks.push({
      text: "edit",
      onClick: () => {
        toggleDialog(ACTION_DIALOGS["edit-post"], cardData);
        setMenuElement(null);
      }
    });
  }

  // Primary links for pending cards already have a hide button so don't repeat.
  if (hideable && status !== CARD_STATUSES["pending"]) {
    secondaryLinks.push({
      text: "hide",
      onClick: () => {
        toggleDialog(ACTION_DIALOGS["hide-confirm"], cardData)
        setMenuElement(null);
      }
    });
  }

  // Render the rest of the card links (e.g. "More") in the context menu if there are multiple.
  if (links.length > 1) {
    secondaryLinks = [
      ...secondaryLinks,
      ...links.map(({ text, url }) => ({
        text,
        onClick: () => openInNewTab(url)
      }))
    ];
  }

  return (
    secondaryLinks.length > 0 && (
      <div className={classes.secondaryLinks}>
        <IconButton onClick={e => setMenuElement(e.currentTarget)}>
          <MoreVertIcon />
        </IconButton>

        <Menu
          anchorEl={menuElement}
          open={menuElement !== null}
          onClose={() => setMenuElement(null)}
        >
          {/* 
            This next line is a workaround for an issue with the first item always being stuck on a hover state
            https://github.com/mui-org/material-ui/issues/5186#issuecomment-337278330
          */}
          <MenuItem key="placeholder" style={{ display: "none" }} />
          {secondaryLinks.map(({ text, onClick }, i) => (
            <MenuItem key={`${text}-${i}`} onClick={onClick}>
              {text.toUpperCase()}
            </MenuItem>
          ))}
        </Menu>
      </div>
    )
  );
}

SecondaryLinks.propTypes = {
  classes: PropTypes.object,
  cardData: PropTypes.object,
  cardType: PropTypes.string,
  status: PropTypes.string,
  editable: PropTypes.bool,
  links: PropTypes.array,
  hideable: PropTypes.bool
};

export default SecondaryLinks;
