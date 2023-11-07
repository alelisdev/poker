import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import styled from "styled-components";
import globalContext from "../../context/global/globalContext";

const TabsWrapper = styled.div`
  margin-top: 22px;
  display: flex;
  gap: 4px;
`;

const TabItem = styled.span`
  position: relative;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  width: 160px;
  background: rgba(255, 255, 255, 0.04);
  height: 34px;
  line-height: 28px;
  color: #fff;
  border-radius: 4px;
  padding: 4px 8px 4px 8px;
  cursor: pointer;
  &.active {
    background: linear-gradient(90deg, #da367f, #f95e42);
  }
`;

const TabDecorator = styled.div`
  position: absolute;
  height: 5px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  width: 96px;
  top: 30px;
  background-color: ${(props) => (props.active ? "#011718" : "#0f0f0f")};
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
`;

const Tabs = () => {
  const { activeTab, setActiveTab } = useContext(globalContext);
  const history = useHistory();

  const handleClickCash = (e) => {
    setActiveTab("cash");
    history.push("/");
  };

  const handleClickTournament = (e) => {
    setActiveTab("tournament");
    history.push("/tournament");
  };

  const handleClickSpin = (e) => {
    setActiveTab("spin");
  };

  return (
    <TabsWrapper>
      <TabItem
        className={`${activeTab === "cash" ? `active` : ``}`}
        onClick={(e) => handleClickCash(e)}
      >
        Cash Games
        <TabDecorator active={activeTab === "cash"} />
      </TabItem>
      <TabItem
        className={`${activeTab === "tournament" ? `active` : ``}`}
        onClick={(e) => handleClickTournament(e)}
      >
        Tournament
        <TabDecorator active={activeTab === "tournament"} />
      </TabItem>
      <TabItem
        className={`${activeTab === "spin" ? `active` : ``}`}
        onClick={(e) => handleClickSpin(e)}
      >
        Spin&Go
        <TabDecorator active={activeTab === "spin"} />
      </TabItem>
    </TabsWrapper>
  );
};

export default Tabs;
