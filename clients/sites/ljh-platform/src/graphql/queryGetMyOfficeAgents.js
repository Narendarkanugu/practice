import gql from 'graphql-tag';

export default gql`
query getMyOfficeAgents{
    getMyOfficeAgents{
     officeId
     newStaffFormUrl
     agents{
       agentId
       name
       email
       mobile
       startDate
       roleDisplay
       terminationFormUrl
       updateFormUrl
     }
    }
    }
`;