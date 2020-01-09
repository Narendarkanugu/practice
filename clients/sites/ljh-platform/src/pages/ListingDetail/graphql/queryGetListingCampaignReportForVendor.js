import gql from 'graphql-tag';

export default gql`
  query getListingCampaignReportForVendor($listingId: ID!) {
    getListingCampaignReportForVendor:getListingCampaignReportForVendorV3(listingId:$listingId){
      sections {
        charts {
          ... on ChartDateSeries {
            data {
            date
            value
          }
          description
          domain
          id
          measure
          title
          updatedDateTime
          }
          ... on ChartNameSeries {
          data {
            value
          }
          description
          domain
          id
          measure
          title
          updatedDateTime
        }
        }
        description
        statistics {
          text
          value
        }
        title
      }
    }
  }
`;
