import React from "react";
import { withRouter } from "react-router-dom";

const MainLayout = ({ children }) => {
  return (
    <div id="layout-wrapper">
      <main className="blur-target">{children}</main>
    </div>
  );
};

export default withRouter(MainLayout);
