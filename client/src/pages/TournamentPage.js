import React, { useContext, useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Container from "../components/layout/Container";
import Header from "../layouts/Header";
import Tabs from "../components/Tabs";
import SearchIcon from "../components/icons/SearchIcon";
import globalContext from "../context/global/globalContext";
import {
  MainWrapper,
  SideWrapper,
  TableWrapper,
  SearchWrapper,
  SearchInput,
  SearchButton,
  CardContainer,
  BoounsItem,
} from "../components/styledcompoents";
import TournamentTable from "../components/Table/TournamentTable";
import { ReactComponent as IconRefresh } from "../assets/icons/refresh-icon.svg";
import styled from "styled-components";
import GradientButton from "../components/GradientButton";
import CardItem from "../components/CardItem";
import SystemImg from "../assets/img/system.png";
import BounsImg from "../assets/img/bonus.png";
import GiveawyasmImg from "../assets/img/giveaways.png";
import RainImg from "../assets/img/rain.png";
import BonusBgImg from "../assets/img/bonusbg.png";

const ChamponShip = styled.div`
  display: flex;
  flex-direction: column;
  border: solid 1px #333541;
  border-radius: 8px;
  & .header {
    height: 54px;
    color: #fff;
    font-size: 20px;
    font-weight: 400;
    line-height: 26px;
    display: flex;
    justify-content: space-between;
    padding: 16px 10px;
    background-color: #181a26;
    border-radius: 12px 12px 0px 0px;
  }

  & .content {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    height: 226px;
    background-color: #212531;
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 16px 10px;

    & div {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .field {
        color: #6b7197;
        font-size: 16px;
        font-weight: 400;
        line-height: 20.8px;
      }

      .value {
        color: #fff;
        font-weight: 500;
        line-height: 20.8px;
        font-size: 16px;
      }
    }
  }
`;

const OpenLobbyButton = styled.button`
  width: 100%;
  height: 59px;
  border-radius: 4px;
  background: transparent;
  text-align: center;
  font-family: IBM Plex Mono;
  font-size: 16px;
  font-weight: 500;
  line-height: 20.38px;
  color: #db377f;
  cursor: pointer;
  border: double 1px transparent;
  background-image: linear-gradient(#11141d, #11141d),
    linear-gradient(90deg, #db387e 6.49%, #f75b48 92.91%);
  background-origin: border-box;
  background-clip: content-box, border-box;
`;

const TournamentPage = ({ history }) => {
  const { setOpenTournamentModal, setActiveTab, tnTables } =
    useContext(globalContext);

  const [tableData, setTableData] = useState([]);

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

  useEffect(() => {
    setActiveTab("tournament");
  }, []);

  useEffect(() => {
    if (tnTables !== null) {
      setTableData(tnTables);
    }
  }, [tnTables]);

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
          <TournamentTable tableData={tableData} />
        </SideWrapper>
        <SideWrapper width="25%" gap="20px">
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
          <ChamponShip>
            <div className="header">
              <span className="title">RPT KO Championship</span>
              <IconRefresh />
            </div>
            <div className="content">
              <div className="row">
                <span className="field">Players:</span>
                <span className="value">22</span>
              </div>
              <div className="row">
                <span className="field">Prize Info:</span>
                <span className="value">4</span>
              </div>
              <div className="row">
                <span className="field">Buy-In:</span>
                <span className="value">C 156+ C 0</span>
              </div>
              <div className="row">
                <span className="field">Late Registration:</span>
                <span className="value">1 Level</span>
              </div>
              <div className="row">
                <span className="field">Rebuy:</span>
                <span className="value">No</span>
              </div>
              <div className="row">
                <span className="field">Starts:</span>
                <span className="value">In 25 day</span>
              </div>
            </div>
          </ChamponShip>
          <GradientButton
            width="100%"
            height="59px"
            fs="16px"
            fm="IBM Plex Mono"
            onClick={() => setOpenTournamentModal(true)}
          >
            Register
          </GradientButton>
          <OpenLobbyButton onClick={() => history.push("/lobby")}>
            Open Lobby
          </OpenLobbyButton>
        </SideWrapper>
      </MainWrapper>
    </Container>
  );
};

export default withRouter(TournamentPage);
