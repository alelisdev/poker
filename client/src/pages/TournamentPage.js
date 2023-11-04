import React, { useContext } from "react";
import Container from "../components/layout/Container";
import Header from "../layouts/Header";
import MainWrapper from "../components/Wrappers/MainWrapper";
import SideWrapper from "../components/Wrappers/SideWrapper";
import Tabs from "../components/Tabs";
import globalContext from "../context/global/globalContext";

const TournamentPage = () => {
  const { activeTab, setActiveTab } = useContext(globalContext);

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
    >
      <Header showIcon={true} />
      <MainWrapper>
        <SideWrapper>
          <Tabs activeTab="" />
        </SideWrapper>
      </MainWrapper>
    </Container>
  );
};

export default TournamentPage;
