import React, { useContext } from "react";
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
} from "../components/styledcompoents";
import TournamentTable from "../components/Table/TournamentTable";
import { ReactComponent as IconRefresh } from "../assets/icons/refresh-icon.svg";
import styled from "styled-components";
import GradientButton from "../components/GradientButton";

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
    gap: 8px;
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
  const { setOpenTournamentModal } = useContext(globalContext);

  const tournaments = [
    {
      checked: true,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: true,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
    },
    {
      checked: false,
      name: "Mida Dao",
      buyin: "10$ + 1$",
      gtd: "100 $",
      limits: "NL",
      date: "May 18",
      time: "07.41.44",
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
          <TableWrapper>
            <Tabs />
            <SearchWrapper>
              <SearchInput placeholder="Search" />
              <SearchButton>
                <SearchIcon />
              </SearchButton>
            </SearchWrapper>
          </TableWrapper>
          <TournamentTable data={tournaments} />
        </SideWrapper>
        <SideWrapper width="25%" mt="105px" gap="20px">
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
                <span className="value">22</span>
              </div>
              <div className="row">
                <span className="field">Players</span>
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
