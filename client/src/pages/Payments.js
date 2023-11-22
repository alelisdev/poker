import React, { useContext } from "react";
import Container from "../components/layout/Container";
import Landing from "./Landing";
import authContext from "../context/auth/authContext";
import globalContext from "../context/global/globalContext";
import Header from "../layouts/Header";
import styled from "styled-components";
import { Row } from "../components/styledcompoents";

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const MainWrapper = styled.div`
  padding: 0px 40px;
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  margin-top: 60px;
`;

const Card = styled.div`
  text-align: center;
  width: 50%;
  background: #212531;
  border: solid 2px #333541;
  border-radius: 8px;
  height: 168px;
  padding: 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.75));
  & .title {
    text-transform: uppercase;
    font-family: IBM Plex Mono;
    .text {
      font-weight: 700;
      font-size: 24px;
      line-height: 18px;
      color: #fff;
    }
    .amount {
      font-weight: 700;
      font-size: 24px;
      line-height: 18px;
      color: #f1bb3a;
    }
    .convert {
      margin-left: 20px;
      font-weight: 600;
      color: #fff;
      font-size: 12px;
      line-height: 15.6px;
    }
  }

  & .info {
    margin-top: 24px;
    color: #fff;
    font-weight: 600;
    font-size: 12px;
    line-height: 15.6px;
    font-family: IBM Plex Mono;
    text-transform: uppercase;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 24px;
  & button {
    color: #fff;
    cursor: pointer;
    width: 176px;
    height: 40.9px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 16px;
    line-height: 20.8px;
    border: none;
  }

  & button.withdraw {
    background: rgba(255, 255, 255, 0.26);
  }

  & button.deposit {
    background: linear-gradient(90deg, #da367f 0.04%, #f95e42 105.73%);
  }
`;

const TransactionWrapper = styled.div`
  margin-top: 22px;
  text-align: center;
  width: 100%;
  background: #212531;
  border-radius: 8px;
  padding: 18px 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  filter: drop-shadow(-11px -8px 3px rgba(20, 24, 33, 1));

  & .label-lts-txs {
    width: 196px;
    height: 35px;
    text-transform: uppercase;
    padding: 12px;
    border-radius: 8px;
    color: #fff;
    font-family: IBM Plex Mono;
    font-weight: 600;
    font-size: 14px;
    line-height: 12px;
    background: #181a26;
    filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.75));
    margin-bottom: 10px;
  }

  & .table-row {
    margin-top: 4px;
    margin-bottom: 4px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-family: IBM Plex Mono;
    font-weight: 400;
    font-size: 21px;
    line-height: 27.3px;
    color: #bcbcbc;
    button {
      margin-left: 10px;
      border: none;
      border-radius: 4px;
      width: 93px;
      height: 37px;
      background: linear-gradient(90deg, #da367f 0.04%, #f95e42 105.73%);
      font-family: IBM Plex Mono;
      font-weight: 300;
      font-size: 18px;
      line-height: 23.4px;
      color: #fff;
      cursor: pointer;
    }
  }

  & .view-all {
    margin-top: 12px;
    cursor: pointer;
    color: #fff;
    background: #5b5e67;
    font-family: IBM Plex Mono;
    font-weight: 600;
    font-size: 18px;
    line-height: 23.4px;
    border-radius: 8px;
    border: none;
    width: 340px;
    height: 59px;
  }
`;

const Payments = () => {
  const { isLoggedIn } = useContext(authContext);

  const { setOpenWalletModal, chipsAmount } = useContext(globalContext);

  if (!isLoggedIn) return <Landing />;
  else {
    return (
      <Container
        flexDirection="column"
        alignItems="center"
        justifyContent="start"
      >
        <Header showIcon={true} />
        <MainWrapper>
          <CardWrapper>
            <Row>
              <Card>
                <span className="title">
                  <span className="text">BALANCE :</span>
                  <span className="amount">
                    {" "}
                    {parseFloat(chipsAmount).toFixed(2)} USD
                  </span>
                </span>
                <ButtonGroup>
                  <button
                    className="deposit"
                    onClick={() => setOpenWalletModal(true)}
                  >
                    Deposit
                  </button>
                  <button className="withdraw">Withdraw</button>
                </ButtonGroup>
                <span className="info">
                  Accepted tokens: USDC,SOL,USDT, MATIC,ETH,MTC AND MORE
                </span>
              </Card>

              <Card>
                <span className="title">
                  <span className="text">BALANCE :</span>
                  <span className="amount"> 0 CPP</span>
                </span>
                <ButtonGroup>
                  <button className="deposit">Deposit</button>
                  <button className="withdraw">Withdraw</button>
                </ButtonGroup>
                <span className="info">
                  HAY is only used for sol city events and has no value.
                </span>
              </Card>
            </Row>
            <Row>
              <Card>
                <span className="title">
                  <span className="text">BALANCE :</span>
                  <span className="amount"> 0 poker</span>
                  <span className="convert">Convert to USD</span>
                </span>
                <ButtonGroup>
                  <button className="deposit">Swap For SOL</button>
                  <button className="withdraw">Withdraw</button>
                </ButtonGroup>
                <span className="info">
                  Poker is no longer used for playing.
                </span>
              </Card>
              <Card>
                <span className="title">
                  <span className="text">Vouchers</span>
                </span>
                <ButtonGroup>
                  <button className="withdraw">Redeem</button>
                </ButtonGroup>
                <span className="info">
                  SC$ tokens are your free entry for tournaments.
                </span>
              </Card>
            </Row>
          </CardWrapper>
          <TransactionWrapper>
            <span className="label-lts-txs">Lastest Transactions</span>
            <div className="table-row">
              <span>May 30, 11:59 PM</span>
              <span>#9280</span>
              <span>45 USD</span>
              <div>
                <span>Credited</span>
                <button>View</button>
              </div>
            </div>
            <div className="table-row">
              <span>May 30, 11:59 PM</span>
              <span>#9280</span>
              <span>45 USD</span>
              <div>
                <span>Credited</span>
                <button>View</button>
              </div>
            </div>
            <div className="table-row">
              <span>May 30, 11:59 PM</span>
              <span>#9280</span>
              <span>45 USD</span>
              <div>
                <span>Credited</span>
                <button>View</button>
              </div>
            </div>
            <button className="view-all">View All Transactions</button>
          </TransactionWrapper>
        </MainWrapper>
      </Container>
    );
  }
};

export default Payments;
