import React, { useContext, useEffect } from "react";
import Button from "../buttons/Button";
import modalContext from "../../context/modal/modalContext";
import globalContext from "../../context/global/globalContext";
import { ButtonGroup } from "../forms/ButtonGroup";
import { Form } from "../forms/Form";
import { FormGroup } from "../forms/FormGroup";
import { Input } from "../forms/Input";
import gameContext from "../../context/game/gameContext";
import { PositionedUISlot } from "./PositionedUISlot";
import { InfoPill } from "./InfoPill";
import PokerCard from "./PokerCard";
import ChipsAmountPill from "./ChipsAmountPill";
import { EmptySeat } from "./EmptySeat";
import { OccupiedSeat } from "./OccupiedSeat";
import { Hand } from "./Hand";
import contentContext from "../../context/content/contentContext";
import Markdown from "react-remarkable";
import DealerButton from "../icons/DealerButton";
import { StyledSeat } from "./StyledSeat";
import SitButton from "../buttons/SitButton";
import styled from "styled-components";

const AccountItem = styled.div`
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 115px;
  position: absolute;
  border: ${(props) =>
    props.hasTurn ? "2px solid #ffffff" : "2px solid #181a26"};
  background: #212531;
  border-radius: 4px;
  z-index: 55;
`;

const NameTag = styled.div`
  color: #fff;
  font-family: IBM Plex Mono;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 28px;
  width: 100%;
  height: 31px;
  border-radius: 4px;
  background: #181a26;
`;

const BlanaceTag = styled.div`
  width: 100%;
  background: #212531;
  height: 31px;
  border-radius: 3px;
  color: #fff;
  font-family: IBM Plex Mono;
  font-size: 12px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px;
`;

const ProgressBar = styled.div`
  position: absolute;
  width: 100%;
  background: #5c3315;
  height: 2px;

  & .bar {
    animation: load 15s normal forwards;
    width: 0;
    height: 2px;
    background-color: #ff6b00;
  }

  @keyframes load {
    0% {
      width: 0;
    }
    100% {
      width: 100%;
    }
  }
`;

export const Seat = ({ currentTable, seatNumber, isPlayerSeated, sitDown }) => {
  const { openModal, closeModal } = useContext(modalContext);
  const { chip, balance, nativeToken, activeTab } = useContext(globalContext);
  const { standUp, seatId, rebuy } = useContext(gameContext);
  const { getLocalizedString } = useContext(contentContext);
  const seat = currentTable?.seats && currentTable.seats[seatNumber];
  const maxBuyin = currentTable.limit * 10;
  const minBuyIn = currentTable.minBet * 2 * 10;

  useEffect(() => {
    if (
      currentTable &&
      isPlayerSeated &&
      seat &&
      seat.id === seatId &&
      seat.stack === 0 &&
      seat.sittingOut
    ) {
      if ((activeTab === "cash" && balance <= minBuyIn) || balance === 0) {
        standUp();
      } else if (
        (activeTab === "tournament" && chip <= minBuyIn) ||
        chip === 0
      ) {
        standUp();
      } else {
        openModal(
          () => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                const amount = +document.getElementById("amount").value;
                if (
                  amount &&
                  amount >= minBuyIn &&
                  (activeTab === "cash" ? amount <= balance : amount <= chip)
                ) {
                  rebuy(currentTable.id, seatNumber, parseInt(amount));
                  closeModal();
                }
              }}
            >
              <FormGroup>
                <Input
                  id="amount"
                  type="number"
                  min={minBuyIn}
                  step={minBuyIn}
                  max={activeTab === "cash" ? balance : chip}
                  defaultValue={minBuyIn}
                />
              </FormGroup>
              <ButtonGroup>
                <Button primary type="submit" fullWidth>
                  ReBuy into game
                </Button>
              </ButtonGroup>
            </Form>
          ),
          `ReBuy`,
          `Cancel`,
          () => {
            standUp();
            closeModal();
          },
          () => {
            standUp();
            closeModal();
          }
        );
      }
    }
    // eslint-disable-next-line
  }, [currentTable]);

  return (
    <StyledSeat>
      {!seat ? (
        <>
          {!isPlayerSeated ? (
            <SitButton
              onClick={() => {
                openModal(
                  () => (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const amount = +document.getElementById("amount").value;
                        if (
                          amount &&
                          amount >= minBuyIn &&
                          (activeTab === "cash"
                            ? amount <= balance
                            : amount <= chip)
                        ) {
                          sitDown(
                            currentTable.id,
                            seatNumber,
                            parseFloat(amount)
                          );
                          closeModal();
                        }
                      }}
                    >
                      <FormGroup>
                        <Input
                          id="amount"
                          type="number"
                          min={minBuyIn}
                          step={minBuyIn}
                          max={activeTab === "cash" ? balance : chip}
                          defaultValue={minBuyIn}
                        />
                      </FormGroup>
                      <ButtonGroup>
                        <Button primary type="submit" fullWidth>
                          Buy into game
                        </Button>
                      </ButtonGroup>
                    </Form>
                  ),
                  getLocalizedString("Buy In"),
                  getLocalizedString("No thanks!")
                );
              }}
            >
              Sit Down
            </SitButton>
          ) : (
            <EmptySeat>
              <Markdown></Markdown>
            </EmptySeat>
          )}
        </>
      ) : (
        <PositionedUISlot
          style={{
            display: "flex",
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PositionedUISlot right="3.5rem" bottom="-1.5rem">
            <AccountItem hasTurn={seat.turn}>
              <NameTag>{seat.player.name}</NameTag>
              {seat.stack && (
                <BlanaceTag>
                  {activeTab === "cash"
                    ? "$" + parseFloat(seat.stack).toFixed(2)
                    : seat.stack}
                </BlanaceTag>
              )}
              {seat.turn && (
                <ProgressBar>
                  <div className="bar"></div>
                </ProgressBar>
              )}
            </AccountItem>
          </PositionedUISlot>
          <PositionedUISlot>
            <OccupiedSeat seatNumber={seatNumber} hasTurn={seat.turn} />
          </PositionedUISlot>
          <PositionedUISlot
            left="4vh"
            style={{
              display: "flex",
              textAlign: "center",
              justifyContent: "center",
              alignItems: "center",
            }}
            origin="center right"
          >
            <Hand>
              {seat.hand &&
                seat.hand.map((card, index) => (
                  <PokerCard
                    key={index}
                    card={card}
                    width="5vw"
                    maxWidth="60px"
                    minWidth="30px"
                  />
                ))}
            </Hand>
          </PositionedUISlot>

          {currentTable.button === seatNumber && (
            <PositionedUISlot
              top="-4rem"
              left="-4.5rem"
              style={{ zIndex: "55" }}
            >
              <DealerButton />
            </PositionedUISlot>
          )}

          <PositionedUISlot
            style={{ zIndex: "55" }}
            right="3.5rem"
            bottom="-1.5rem"
            origin="top left"
          >
            <ChipsAmountPill chipsAmount={seat.bet} nativeToken={nativeToken} />
            {!currentTable.handOver && seat.lastAction && (
              <InfoPill>{seat.lastAction}</InfoPill>
            )}
          </PositionedUISlot>
        </PositionedUISlot>
      )}
    </StyledSeat>
  );
};
