import React, { useContext, useEffect, useState } from "react";
import Container from "../components/layout/Container";
import Heading from "../components/typography/Heading";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import useScrollToTopOnPageLoad from "../hooks/useScrollToTopOnPageLoad";
import globalContext from "../context/global/globalContext";
import contentContext from "../context/content/contentContext";
import modalContext from "../context/modal/modalContext";
import Header from "../layouts/Header";
import CardItem from "../components/CardItem";
import SystemImg from "../assets/img/system.png";
import BounsImg from "../assets/img/bonus.png";
import GiveawyasmImg from "../assets/img/giveaways.png";
import RainImg from "../assets/img/rain.png";
import BonusBgImg from "../assets/img/bonusbg.png";
import GamePanImage from "../assets/img/gamepan.png";
import GameTable from "../components/Table";
import Tabs from "../components/Tabs";
import BottomCard from "../components/BottomCard";
import SearchIcon from "../components/icons/SearchIcon";
import socketContext from "../context/websocket/socketContext";
import { CREATE_TABLE } from "../pokergame/actions";
// import Text from "../components/typography/Text";

// const MainMenuWrapper = styled.div`
//   margin: 0 0 auto 0;
//   display: grid;
//   justify-content: center;
//   align-content: center;
//   grid-template-columns: repeat(2, minmax(250px, auto));
//   grid-template-rows: repeat(2, minmax(250px, auto));
//   grid-gap: 2rem;
//   max-width: 600px;

//   @media screen and (max-width: 900px) and (max-height: 450px) and (orientation: landscape) {
//     grid-template-columns: repeat(4, 140px);
//     grid-template-rows: repeat(1, minmax(140px, auto));
//     grid-gap: 1rem;
//   }

//   @media screen and (max-width: 590px) and (max-height: 420px) and (orientation: landscape) {
//     grid-template-columns: repeat(4, 120px);
//     grid-template-rows: repeat(1, minmax(120px, auto));
//     grid-gap: 1rem;
//   }

//   @media screen and (max-width: 468px) {
//     grid-template-columns: repeat(1, auto);
//     grid-template-rows: repeat(4, auto);
//     grid-gap: 1rem;
//   }
// `;

// const MainMenuCard = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   text-align: center;
//   cursor: pointer;
//   background-color: ${(props) => props.theme.colors.playingCardBg};
//   border-radius: ${(props) => props.theme.other.stdBorderRadius};
//   padding: 1.5rem 2rem;
//   box-shadow: ${(props) => props.theme.other.cardDropShadow};

//   &,
//   & > * {
//     user-select: none;
//     -moz-user-select: none;
//     -khtml-user-select: none;
//     -webkit-user-select: none;
//     -o-user-select: none;
//   }

//   ${Heading} {
//     margin-bottom: 0;
//     color: ${(props) => props.theme.colors.primaryCta};
//     word-wrap: break-word;
//   }

//   img {
//     margin: 1rem;
//     width: 75%;
//     max-width: 170px;
//   }

//   @media screen and (min-width: 648px) {
//     font-size: 3rem;
//   }

//   @media screen and (max-width: 648px) {
//     padding: 0.5rem;
//   }

//   @media screen and (max-width: 468px) {
//     flex-direction: row;
//     justify-content: space-between;
//     border-radius: 90px 40px 40px 90px;
//     padding: 0 1rem 0 0;

//     ${Heading} {
//       text-align: right;
//       margin: 0 1rem;
//     }

//     img {
//       max-width: 80px;
//       margin: 0;
//     }
//   }
// `;

const CardContainer = styled.div`
  width: 98.5%;
  display: flex;
  gap: 12px;
`;

const MainWrapper = styled.div`
  padding: 0px 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
`;

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
`;

const BoounsItem = styled.div`
  border: 2px solid #333541;
  position: relative;
  border-radius: 12px;
  background: linear-gradient(90deg, #da367f, #f95e42);
  height: 123px;
`;

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
    width: 72%;
    text-wrap: nowrap;
  }
  .credit {
    width: 27.5%;
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
    width: 74%;
    text-wrap: nowrap;
  }
  .credit {
    width: 26%;
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

const TableWrapper = styled.div`
  border-bottom: 1px solid #2d2d2d;
  width: 98.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

const SearchWrapper = styled.div`
  margin-top: 22px;
  position: relative;
`;

const SearchButton = styled.div`
  position: absolute;
  z-index: 40;
  left: 12px;
  bottom: 8px;
  cursor: pointer;
`;

const SearchInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  width: 269px;
  height: 37px;
  border-radius: 4px;
  color: #fff;
  background-color: #212531;
  padding: 10px 10px 10px 40px;
  border: solid 0px;
  &::placeholder {
    color: #fff;
  }
  @media screen and (max-width: 1240px) {
    width: 144px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

const MainPage = ({ history }) => {
  const { socket } = useContext(socketContext);
  const { tables } = useContext(globalContext);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (tables !== null) setTableData(tables);
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

  // const { openModal } = useContext(modalContext);

  const createGame = async () => {
    history.push("/play");
    socket.emit(CREATE_TABLE);
  };

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
            <Tabs
              items={[
                {
                  name: "Cash Games",
                  active: true,
                },
                {
                  name: "Tournament",
                  active: false,
                },
                {
                  name: "Spin&Go",
                  active: false,
                },
              ]}
            />
            <SearchWrapper>
              <SearchInput placeholder="Search" />
              <SearchButton>
                <SearchIcon />
              </SearchButton>
            </SearchWrapper>
          </TableWrapper>

          <GameTable tableData={tableData}></GameTable>
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
              onClick={createGame}
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
              <PlayerRow>
                <span className="player-name">1 fostersov</span>
                <span className="credit">25.34 $</span>
              </PlayerRow>
              <PlayerRow>
                <span className="player-name">2 GuNDaL</span>
                <span className="credit">42.85 $</span>
              </PlayerRow>
              <PlayerRow>
                <span className="player-name">3 Rolyat</span>
                <span className="credit">47.15 $</span>
              </PlayerRow>
              <PlayerRow>
                <span className="player-name">4 Kudoshinichi</span>
                <span className="credit">119.27 $</span>
              </PlayerRow>
              <PlayerRow>
                <span className="player-name">5 IMDENVER</span>
                <span className="credit">26.4$</span>
              </PlayerRow>
              <PlayerRow>
                <span className="player-name">6 skeezer</span>
                <span className="credit">34.93 $</span>
              </PlayerRow>
            </PlayerContents>
          </PlayerNames>
          <GamePanel>
            <img src={GamePanImage} alt="game-pan" height="212px" />
          </GamePanel>
        </SideWrapper>
      </MainWrapper>
      {/* <MainMenuWrapper>
        <MainMenuCard onClick={() => history.push("/play")}>
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString("main_page-join_table").toUpperCase()}
          </Heading>
        </MainMenuCard>
        <MainMenuCard onClick={() => history.push("/play")}>
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString("main_page-quick_game").toUpperCase()}
          </Heading>
        </MainMenuCard>
        <MainMenuCard
          onClick={() => {
            openModal(
              () => (
                <Text textAlign="center">
                  {getLocalizedString("main_page-modal_text")}
                </Text>
              ),
              getLocalizedString("main_page-modal_heading"),
              getLocalizedString("main_page-modal_button_text")
            );
          }}
        >
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString("main_page-open_shop").toUpperCase()}
          </Heading>
        </MainMenuCard>
        <MainMenuCard onClick={() => history.push("/game-rules")}>
          <Heading as="h3" headingClass="h5" textCentered>
            {getLocalizedString("main_page-open_rules").toUpperCase()}
          </Heading>
        </MainMenuCard>
      </MainMenuWrapper> */}
    </Container>
  );
};

export default withRouter(MainPage);
