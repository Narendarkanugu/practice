import keymirror from "keymirror";

export const DEFAULT_LISTING_IMAGE =
  "http://assets.ljhooker.com/cache/e1e1583ed6828c4e9c89e9abf15534e4eb2108ef.png";
export const DEMO_LISTING = "00000000-0000-0000-0000-000000000001";
export const ROLE_UNKNOWN = "unknown";
export const LJH_ROLES = {
  administration: "administration",
  "franchise owner": "franchise-owner",
  "franchise services": "franchise-services",
  "property manager": "property-manager",
  salesperson: "salesperson"
};
export const ACTION_DIALOGS = keymirror({
  "hide-confirm": null,
  "publish-confirm": null
});
export const CARD_TYPES = keymirror({
  action: null,
  "inspection-report": null
});
export const CARD_SOURCES = keymirror({
  agent: null,
  managed: null,
  system: null
});
export const CARD_TARGETS = keymirror({
  listing: null
});
export const CARD_STATUSES = keymirror({
  pending: null,
  hidden: null,
  published: null
});
