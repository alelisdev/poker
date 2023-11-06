import React from "react";

const MainLayout = ({ children }) => {
  return (
    <div id="layout-wrapper">
      <main className="blur-target">{children}</main>
    </div>
  );
};

export default MainLayout;
