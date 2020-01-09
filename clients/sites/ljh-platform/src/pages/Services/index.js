import React, { useContext } from "react";
import PropTypes from "prop-types";

import AuthContext from "@clients-modules/react/lib/contexts/AuthContext";

import PageContainer from "@clients-modules/react/lib/components/PageContainer";
import DashboardLinks from "@clients-modules/react/lib/components/DashboardLinks";

const Services = () => {
  const {
    currentServices: { sections }
  } = useContext(AuthContext);
  return (
    <PageContainer title="Services">
      <DashboardLinks sections={sections} />
    </PageContainer>
  );
};

Services.propTypes = {
  currentServices: PropTypes.shape({
    sections: PropTypes.array
  })
};

export default Services;
