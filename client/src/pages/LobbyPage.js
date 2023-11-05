import React, { useContext } from "react";
import Container from "../components/layout/Container";
import Header from "../layouts/Header";
import { MainWrapper, Row, Grid } from "../components/styledcompoents";
import styled from "styled-components";
import GradientButton from "../components/GradientButton";
import globalContext from "../context/global/globalContext";

const Title = styled.span`
  color: #fff;
  background-color: #1b1d26;
  padding: 10px;
  font-size: 14px;
  font-weight: 400;
  line-height: 20px;
`;

const Block = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: ${(props) => props.mb};
  background-color: ${(props) => props.bg};
  height: ${(props) => props.height};
  border-radius: ${(props) => props.radius};
  padding: ${(props) => props.padding};
  position: ${(props) => props.position};
  & .overlay {
    color: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    font-family: IBM Plex Mono;
    font-weight: 600;
    font-size: 14px;
    line-height: 18px;
  }
  & .header {
    display: flex;
    width: 100%;
    color: #9e9c9c;
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
    .no {
      width: 10%;
    }

    .blinds {
      text-align: center;
      width: 20%;
    }

    .ante {
      width: 20%;
      text-align: center;
    }

    .start {
      width: 50%;
      text-align: center;
    }
  }

  & .body-row {
    margin-top: 4px;
    margin-bottom: 4px;
    display: flex;
    width: 100%;
    color: #ffffff;
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
    .no {
      width: 10%;
    }

    .blinds {
      text-align: center;
      width: 20%;
    }

    .ante {
      text-align: center;
      width: 20%;
    }

    .start {
      text-align: center;
      width: 50%;
    }
  }
`;

const SubTitle = styled.div`
  text-transform: uppercase;
  font-family: IBM Plex Mono;
  font-weight: 600px;
  font-size: 14px;
  line-height: 18px;
  color: rgba(255, 255, 255, 0.67);
  margin-bottom: 12px;
`;

const PrizeTable = styled.div`
  flex-direction: column;
  display: flex;
  & .header {
    font-weight: 400px;
    font-size: 12px;
    line-height: 15.6px;
    color: #9e9c9c;
    display: flex;
    .no {
      width: 5%;
    }
    .name {
      width: 10%;
      text-align: center;
    }
    .chips {
      width: 10%;
      text-align: center;
    }
    .rebuy {
      width: 15%;
      text-align: center;
    }
    .won {
      width: 15%;
      text-align: center;
    }
    .id {
      width: 10%;
      text-align: center;
    }
    .tickets {
      width: 35%;
      text-align: center;
    }
  }

  & .body {
    color: #fff;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    lien-height: 15.6px;
    flex-direction: column;
    .row {
      margin-top: 10px;
      display: flex;
      .no {
        width: 5%;
      }
      .name {
        width: 10%;
        text-align: center;
      }
      .chips {
        width: 10%;
        text-align: center;
      }
      .rebuy {
        width: 15%;
        text-align: center;
      }
      .won {
        width: 15%;
        text-align: center;
      }
      .id {
        width: 10%;
        text-align: center;
      }
      .tickets {
        width: 35%;
        text-align: center;
      }
    }
  }
`;

const PrizeActiveTable = styled.div`
  flex-direction: column;
  display: flex;
  & .header {
    font-weight: 400px;
    font-size: 12px;
    line-height: 15.6px;
    color: #635f5f;
    display: flex;
    .no {
      width: 5%;
    }
    .name {
      width: 10%;
      text-align: center;
    }
    .chips {
      width: 10%;
      text-align: center;
    }
    .rebuy {
      width: 15%;
      text-align: center;
    }
    .won {
      width: 15%;
      text-align: center;
    }
    .id {
      width: 10%;
      text-align: center;
    }
    .tickets {
      width: 35%;
      text-align: center;
    }
  }

  & .body {
    color: #9e9c9c;
    display: flex;
    font-size: 12px;
    font-weight: 400;
    lien-height: 15.6px;
    flex-direction: column;
    .row {
      margin-top: 10px;
      display: flex;
      .no {
        width: 5%;
      }
      .name {
        width: 10%;
        text-align: center;
      }
      .chips {
        width: 10%;
        text-align: center;
      }
      .rebuy {
        width: 15%;
        text-align: center;
      }
      .won {
        width: 15%;
        text-align: center;
      }
      .id {
        width: 10%;
        text-align: center;
      }
      .tickets {
        width: 35%;
        text-align: center;
      }
    }
  }
`;

const Description = styled.span`
  font-family: IBM Plex Mono;
  font-weight: 400px;
  font-size: 14px;
  line-height: 18.2px;
  color: #fff;
`;

const Item = styled.div`
  display: flex;
  margin-top: 2px;
  margin-bottom: 2px;
  justify-content: space-between;
  & .field {
    font-family: IBM Plex Mono;
    font-weight: 400;
    font-size: 14px;
    line-height: 18.2px;
    color: #9e9c9c;
  }

  & .value {
    font-family: IBM Plex Mono;
    font-weight: 400;
    font-size: 14px;
    line-height: 18.2px;
    color: #fff;
  }
`;

const BeginTime = styled.span`
  color: #db377f;
  font-size: 16px;
  font-weight: 500;
  line-height: 20.8px;
`;

const LobbyPage = () => {
  const { setOpenTournamentModal } = useContext(globalContext);

  return (
    <Container
      flexDirection="column"
      alignItems="center"
      justifyContent="start"
    >
      <Header showIcon={true} />
      <MainWrapper flexDirection="column">
        <Row>
          <Grid col="4"></Grid>
          <Grid col="4" align="center">
            <Title>S2.L20 Satellite to Super Sunday - #6010</Title>
          </Grid>
          <Grid col="4" align="right">
            <BeginTime>Tournament Begins at:06:44:29</BeginTime>
          </Grid>
        </Row>
        <Row mt="10px">
          <Grid
            col="3"
            height="711px"
            bg="#333541"
            radius="8px"
            padding="10px"
            gap="40px"
            border="solid 1px #333541"
          >
            <Block mb="30px">
              <SubTitle>Tournament Info</SubTitle>
              <Item>
                <span className="field">Date:</span>
                <span className="value">Jun 14 @6:59 PM</span>
              </Item>
              <Item>
                <span className="field">No Of Players:</span>
                <span className="value">1/500</span>
              </Item>
              <Item>
                <span className="field">Starting Chips</span>
                <span className="value">10000</span>
              </Item>
              <Item>
                <span className="field">Buy In:</span>
                <span className="value">2$ + 0.2$</span>
              </Item>
              <Item>
                <span className="field">Blind Increase In:</span>
                <span className="value">6 minutes</span>
              </Item>
              <Item>
                <span className="field">Guaranteed Prize:</span>
                <span className="value">20$</span>
              </Item>
              <Item>
                <span className="field">Registration Allowed:</span>
                <span className="value">48 hours prior</span>
              </Item>
              <Item>
                <span className="field">Late Registration:</span>
                <span className="value">60 minutes</span>
              </Item>
              <Item>
                <span className="field">Minimum Registrations:</span>
                <span className="value">2</span>
              </Item>
              <Item>
                <span className="field">Re-Buy Cast:</span>
                <span className="value">2$ + 0.2$</span>
              </Item>
              <Item>
                <span className="field">Re-Buy Allowed:</span>
                <span className="value">99</span>
              </Item>
              <Item>
                <span className="field">Re-Buy Used(All Playes):</span>
                <span className="value">0</span>
              </Item>
            </Block>
            <Block mb="30px">
              <SubTitle>Stacks</SubTitle>
              <Item>
                <span className="field">Shortest Stack:</span>
                <span className="value">10000</span>
              </Item>
              <Item>
                <span className="field">Average Stack:</span>
                <span className="value">10000</span>
              </Item>
              <Item>
                <span className="field">Highest Stack:</span>
                <span className="value">10000</span>
              </Item>
            </Block>
            <Block>
              <SubTitle>Description:</SubTitle>
              <Description>
                $2.20 Satellite to Super Sunday 1 Seat Guaranteed 10k Starting
                Chips 6 Minute Levels 10 Levels of Late Reg/Unlimited Rebuys (2x
                rebuy optional) Addon After Level 10 (2x Starting Stack) 5
                minute break every 0.55 on the hour/
              </Description>
              <Item>
                <span className="field"></span>
                <span className="value"></span>
              </Item>
            </Block>
          </Grid>
          <Grid
            col="6"
            height="711px"
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
            bg="#333541"
            radius="8px"
            border="solid 1px #333541"
          >
            <Block padding="10px">
              <SubTitle>Players & Prizes</SubTitle>
              <PrizeTable>
                <div className="header">
                  <span className="no">No.</span>
                  <span className="name">Name</span>
                  <span className="chips">Chips</span>
                  <span className="rebuy">No. Rebuy</span>
                  <span className="won">Bounty Won</span>
                  <span className="id">#</span>
                  <span className="tickets">Tickets</span>
                </div>
                <div className="body">
                  <div className="row">
                    <span className="no">1</span>
                    <span className="name">triph</span>
                    <span className="chips">10000</span>
                    <span className="rebuy">0</span>
                    <span className="won">0$</span>
                    <span className="id">1</span>
                    <span className="tickets">$22 Tourney Voucher 2000</span>
                  </div>
                </div>
              </PrizeTable>
            </Block>
            <Block
              position="relative"
              bg="#15171d"
              height="347px"
              radius="8px"
              padding="10px"
            >
              <PrizeActiveTable>
                <SubTitle>Active Tables</SubTitle>
                <div className="header">
                  <span className="no">No.</span>
                  <span className="name">Name</span>
                  <span className="chips">Chips</span>
                  <span className="rebuy">No. Rebuy</span>
                  <span className="won">Bounty Won</span>
                  <span className="id">#</span>
                  <span className="tickets">Tickets</span>
                </div>
                <div className="body">
                  <div className="row">
                    <span className="no">1</span>
                    <span className="name">triph</span>
                    <span className="chips">10000</span>
                    <span className="rebuy">0</span>
                    <span className="won">0$</span>
                    <span className="id">1</span>
                    <span className="tickets">$22 Tourney Voucher 2000</span>
                  </div>
                </div>
              </PrizeActiveTable>
              <span className="overlay">NO ACTIVE TABLE</span>
            </Block>
          </Grid>
          <Grid
            border="solid 1px #333541"
            col="3"
            height="711px"
            bg="#333541"
            radius="8px"
            padding="10px"
          >
            <Block>
              <SubTitle>Stucture:</SubTitle>
              <div className="header">
                <span className="no">#</span>
                <span className="blinds">Blinds</span>
                <span className="ante">Ante</span>
                <span className="start">Starts after(Minutes)</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
              <div className="body-row">
                <span className="no">1</span>
                <span className="blinds">50/100</span>
                <span className="ante">/</span>
                <span className="start">0</span>
              </div>
            </Block>
          </Grid>
        </Row>
        <GradientButton
          width="340px"
          height="59px"
          fs="16px"
          fm="IBM Plex Mono"
          margin="10px auto"
          onClick={() => setOpenTournamentModal(true)}
        >
          Register
        </GradientButton>
      </MainWrapper>
    </Container>
  );
};

export default LobbyPage;
