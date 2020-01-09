import React from "react";
import { useQuery } from "react-apollo-hooks";

import queryGetMyOfficeAgents from "../graphql/queryGetMyOfficeAgents";

const StaffContext = React.createContext({});

const StaffContextProvider = ({ children }) => {
    const { data, error, loading } = useQuery(queryGetMyOfficeAgents, {
        fetchPolicy: "cache-and-network"
    });
    if (Object.keys(data).length > 0) {
        var { getMyOfficeAgents: officesStaff } = data;

        var getStaffByOfficeId = officeId => {
            if (loading || error) {
                return null;
            }
            return officesStaff.find(x => {
                if (x.officeId === officeId)
                    return x.agents;
                else
                    return "";
            });
        };
    } else {
        officesStaff = [];
        getStaffByOfficeId = [];
    }



    return (
        <StaffContext.Provider
            value={{
                error,
                getStaffByOfficeId,
                count: officesStaff ? officesStaff.length : 0,
                officesStaff,
                loading
            }}
        >
            {children}
        </StaffContext.Provider>
    );
};

export default StaffContext;
export { StaffContextProvider };
