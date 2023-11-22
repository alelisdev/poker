import React, { useContext, useEffect, useState } from "react";
import Container from "../components/layout/Container";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import globalContext from "../context/global/globalContext";
import Header from "../layouts/Header";
import CardItem from "../components/CardItem";
import SystemImg from "../assets/img/system.png";
import BounsImg from "../assets/img/bonus.png";
import GiveawyasmImg from "../assets/img/giveaways.png";
import RainImg from "../assets/img/rain.png";
import BonusBgImg from "../assets/img/bonusbg.png";
import GamePanImage from "../assets/img/gamepan.png";
import GameTable from "../components/Table/GameTable";
import Tabs from "../components/Tabs";
import BottomCard from "../components/BottomCard";
import SearchIcon from "../components/icons/SearchIcon";
import {
  SideWrapper,
  MainWrapper,
  TableWrapper,
  SearchInput,
  SearchWrapper,
  SearchButton,
  CardContainer,
  BoounsItem,
} from "../components/styledcompoents";

const PlayerNames = styled.div`
  height: 264px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  border: solid 1px #333541;
  filter: drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.8));
`;

const PlayerNameTitle = styled.div`
  color: #fff;
  width: 100%;
  height: 44px;
  border-radius: 8px 8px 0px 0px;
  background-color: #181a26;
  display: flex;
  padding: 0px 20px;
  align-items: center;
  font-size: 14px;
  font-weight: 400;

  .player-name {
    width: 65%;
    text-wrap: nowrap;
  }
  .credit {
    width: 35%;
    text-wrap: nowrap;
  }
`;

const PlayerContents = styled.div`
  height: 220px;
  display: flex;
  flex-direction: column;
  background-color: #333541;
  padding: 18px 20px;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const PlayerRow = styled.div`
  font-size: 16px;
  font-weight: 400;
  padding: 6px 0px;
  color: #fff;
  display: flex;
  .player-name {
    width: 65%;
    text-wrap: nowrap;
  }
  .credit {
    width: 35%;
    text-wrap: nowrap;
  }
`;

const GamePanel = styled.div`
  margin-top: 16px;
  height: 240px;
  padding: 10px;
  width: 100%;
  border-radius: 8px;
  border: solid 1px #333541;
  filter: drop-shadow(0px 0px 24px rgba(0, 0, 0, 0.8));
`;

const BottomCardsWrapper = styled.div`
  margin-top: 11px;
  display: flex;
  gap: 12px;
  width: 98.5%;
`;

const MainPage = ({ history }) => {
  const { tables, nativeToken, setActiveTab, previewTable } =
    useContext(globalContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setActiveTab("cash");
  }, []);

  useEffect(() => {
    if (tables !== null) {
      setTableData(tables);
    }
  }, [tables]);

  const cardsData = [
    {
      imgUrl: SystemImg,
      title: "RakeBack System",
      desc: "Flexible system, get a big bonus from the rake.",
      width: "51px",
      height: "57px",
    },
    {
      imgUrl: BounsImg,
      title: "Weekly Bonus",
      desc: "Come to us more often & earn bonuses!",
      width: "76px",
      height: "57px",
    },
    {
      imgUrl: GiveawyasmImg,
      title: "Giveaways",
      desc: "The higher rank you are, the more surprising it will be.",
      width: "76px",
      height: "57px",
    },
    {
      imgUrl: RainImg,
      title: "Chat Rain",
      desc: "Randomly reward players in chat room every 6 hours.",
      width: "76px",
      height: "57px",
    },
  ];

  const bottomCardsData = [
    {
      title: "Mini",
      value: "8 176.88",
    },
    {
      title: "Minor",
      value: "8 176.88",
    },
    {
      title: "Major",
      value: "8 176.88",
    },
    {
      title: "Mega",
      value: "8 176.88",
    },
  ];

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
    >
      <Header showIcon={true} />
      <MainWrapper>
        <SideWrapper width="72.9%">
          <CardContainer>
            {cardsData.map((item, idx) => {
              return (
                <CardItem
                  key={idx}
                  imgUrl={item.imgUrl}
                  title={item.title}
                  desc={item.desc}
                  width={item.width}
                  height={item.height}
                />
              );
            })}
          </CardContainer>
          <TableWrapper>
            <Tabs />
            <SearchWrapper>
              <SearchInput placeholder="Search" />
              <SearchButton>
                <SearchIcon />
              </SearchButton>
            </SearchWrapper>
          </TableWrapper>
          <GameTable tableData={tableData} />
          <BottomCardsWrapper>
            {bottomCardsData.map((item, idx) => {
              return (
                <BottomCard
                  key={idx}
                  title={item.title}
                  value={item.value}
                ></BottomCard>
              );
            })}
          </BottomCardsWrapper>
        </SideWrapper>
        <SideWrapper width="25%">
          <BoounsItem>
            <img src={BonusBgImg} alt="bouns" width="100%" height="118px" />
            <span
              style={{
                fontSize: "24px",
                position: "absolute",
                textWrap: "nowrap",
                fontWeight: "700",
                lineHeight: "18px",
                top: "50%",
                left: "50%",
                color: "#FFF",
                transform: "translate(-50%, -240%)",
              }}
            >
              GET UP TO <span style={{ color: "#F1BB3A" }}>$500</span> BONUS!
            </span>
            <span
              style={{
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                textWrap: "nowrap",
                color: "#FFF",
                fontWeight: "600",
                lineHeight: "15.6px",
                left: "50%",
                transform: "translate(-50%, -70%)",
              }}
            >
              REFFER A FRIEND & EARN!
            </span>
            <div
              style={{
                width: "142px",
                height: "33px",
                fontSize: "12px",
                position: "absolute",
                top: "50%",
                textWrap: "nowrap",
                color: "#FFF",
                left: "50%",
                cursor: "pointer",
                lineHeight: "15.6px",
                backgroundColor: "rgba(255, 255, 255, 0.26)",
                padding: "8px 14px",
                borderRadius: "8px",
                transform: "translate(-50%, 40%)",
              }}
            >
              Get Referal Code
            </div>
          </BoounsItem>
          <PlayerNames>
            <PlayerNameTitle>
              <span className="player-name"># PLAYER NAME</span>
              <span className="credit">CREDIT</span>
            </PlayerNameTitle>
            <PlayerContents>
              {previewTable &&
                previewTable.players.map((player, idx) => {
                  return (
                    <PlayerRow key={idx}>
                      <span className="player-name">{`${idx + 1} ${
                        player.name
                      }`}</span>
                      <span className="credit">
                        {`${parseFloat(player.balance).toFixed(
                          4
                        )} ${nativeToken}`}
                      </span>
                    </PlayerRow>
                  );
                })}
            </PlayerContents>
          </PlayerNames>
          <GamePanel>
            <img src={GamePanImage} alt="game-pan" height="212px" />
          </GamePanel>
        </SideWrapper>
      </MainWrapper>
    </Container>
  );
};

export default withRouter(MainPage);
