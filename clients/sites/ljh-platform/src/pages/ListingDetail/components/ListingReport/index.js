import React from "react";
import { useQuery } from "react-apollo-hooks";
import { Grid, Typography } from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import { useMedia } from "use-media";
import moment from "moment";

// import { usePageViewTracker } from "../../../../hooks/analytics";

import queryGetListingCampaignReportForVendor from "../../graphql/queryGetListingCampaignReportForVendor";

import ListingReportStatistics from "./ListingReportStatistic";
import Loading from "@clients-modules/react/lib/components/Loading";
import Error from "@clients-modules/react/lib/components/Error";
import EmptyState from "@clients-modules/react/lib/components/EmptyState";

import styles from "./styles";
import "./chartStyling.css";

const ListingReport = ({ classes, listingId }) => {
  // usePageViewTracker("listings/report");

  const isDesktop = useMedia({ minWidth: 960 });

  const { data, error, loading } = useQuery(
    queryGetListingCampaignReportForVendor,
    {
      variables: { listingId },
      fetchPolicy: "cache-and-network"
    }
  );

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <Error message={error.message} />;
  }

  const {
    getListingCampaignReportForVendor: { sections }
  } = data;

  const formatDate = date => {
    return moment(date).format("D MMM");
  };

  return (
    <div className={classes.reportContainer}>
      {sections.length === 0 && (
        <Grid
          container
          spacing={0}
          alignItems="center"
          justify="center"
          style={{ minHeight: "100%" }}
        >
          <EmptyState
            title="No reports"
            iconName="chart-area"
            content={
              <Typography>
                There's no data for this listing yet. Please check back later.
              </Typography>
            }
          />
        </Grid>
      )}

      {sections.map((section, index) => {
        return (
          <Grid container spacing={2} key={index}>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <Typography component="h6" variant="h6" gutterBottom>
                    {section.title}
                  </Typography>
                  <Typography gutterBottom>{section.description}</Typography>
                </Grid>
              </Grid>
            </Grid>
            {section.statistics && (
              <div className={classes.statSection}>
                <Grid container>
                  <Grid item xs={12} md={12} lg={12}>
                    <ListingReportStatistics statData={section.statistics} />
                  </Grid>
                </Grid>
              </div>
            )}
            {section.charts &&
              section.charts.map((chart, index) => (
                <Grid item xs={12} md={12} lg={12} key={index}>
                  <Typography component="h6" variant="h6">
                    {chart.title}
                  </Typography>
                  {chart.data ? (
                    <Typography variant="overline" gutterBottom>
                      Total views of your property over the campaign duration
                    </Typography>
                  ) : (
                      <Typography variant="overline" gutterBottom>
                        No Page Views data yet
                    </Typography>
                    )}
                  {chart.data && (
                    <ResponsiveContainer
                      width="100%"
                      height={isDesktop ? 400 : 250}
                    >
                      <AreaChart
                        data={chart.data}
                        margin={{ top: 5, right: 30, left: 0, bottom: 0 }}
                      >
                        <defs>
                          <linearGradient
                            id="colorViews"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                          >
                            <stop
                              offset="5%"
                              stopColor="#fb0101"
                              stopOpacity={0.8}
                            />
                            <stop
                              offset="95%"
                              stopColor="#fb0101"
                              stopOpacity={0}
                            />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="date" tickFormatter={formatDate} />
                        <YAxis />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke="#fb0101"
                          fillOpacity={1}
                          fill="url(#colorViews)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </Grid>
              ))}
          </Grid>
        );
      })}
    </div>
  );
};

export default withStyles(styles)(ListingReport);