import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { orderBy as _orderBy, map } from "lodash";
import moment from "moment";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  Switch,
  Tooltip,
  IconButton,
  withStyles,
  Typography
} from "@material-ui/core";
import { OpenInNew, Delete } from "@material-ui/icons";

import styles from "./styles";

//'Date', 'Name', 'Created by', 'Published'
const labels = {
  eventTimestamp: "Date",
  Filename: "Name",
  CreatedBy: "Created by",
  published: "Published"
};

function DocumentTable({
  classes,
  documents,
  onPublishChange,
  onDownloadClick,
  onDeleteClick,
  disableActions
}) {
  const [orderBy, setOrderBy] = useState("eventTimestamp");
  const [order, setOrder] = useState("desc");
  const [orderDocuments, setOrderDocuments] = useState([]);

  const handleSort = ob => () => {
    const isDesc = orderBy === ob && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(ob);
  };

  useEffect(() => {
    setOrderDocuments(_orderBy(documents, [orderBy], [order]));
  }, [documents, order, orderBy]);

  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          {map(labels, (v, k) => (
            <TableCell
              key={k}
              sortDirection={orderBy === k ? order : false}
              padding={k === "published" ? "checkbox" : "default"}
            >
              <TableSortLabel
                active={orderBy === k}
                direction={order}
                onClick={handleSort(k)}
              >
                {v}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell padding="none" />
        </TableRow>
      </TableHead>
      <TableBody>
        {map(orderDocuments, d => {
          const {
            documentId,
            filename,
            eventTimestamp,
            createdByEmail,
            published
          } = d;
          return (
            <TableRow key={documentId}>
              <TableCell padding="none" style={{ paddingLeft: 16, width: 16 }}>
                <Typography noWrap>
                  {moment(eventTimestamp).format("DD MMM YY")}
                </Typography>
              </TableCell>
              <TableCell style={{ maxWidth: '20%' }}>
                <Typography>{filename}</Typography>
              </TableCell>
              <TableCell style={{ maxWidth: 0 }}>
                <Typography noWrap>{createdByEmail}</Typography>
              </TableCell>
              <TableCell padding="none">
                <Switch
                  color="default"
                  checked={published}
                  onChange={onPublishChange(d)}
                  disabled={disableActions}
                />
              </TableCell>
              <TableCell padding="checkbox">
                <div className={classes.flexAlignCenter}>
                  <Tooltip title="Download">
                    <IconButton onClick={onDownloadClick(d)}>
                      <OpenInNew />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton
                      onClick={onDeleteClick(d)}
                      disabled={disableActions}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

DocumentTable.propTypes = {
  classes: PropTypes.object.isRequired,
  documents: PropTypes.array,
  onPublishChange: PropTypes.func.isRequired,
  onDownloadClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default withStyles(styles)(DocumentTable);
