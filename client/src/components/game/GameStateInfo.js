import React from "react";
import styled from "styled-components";
import ChipsAmountPill from "./ChipsAmountPill";
import { InfoPill } from "./InfoPill";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: center;
  justify-items: center;
  align-items: center;
  width: 100%;
`;

export const GameStateInfo = ({ currentTable, nativeToken }) => {
  return (
    <Wrapper>
      {currentTable.players.length <= 1 || currentTable.handOver ? (
        <InfoPill>Waiting for Other Plyers …</InfoPill>
      ) : (
        <InfoPill>
          {currentTable.board.length === 0 && "Pre-Flop"}
          {currentTable.board.length === 3 && "Flop"}
          {currentTable.board.length === 4 && "Turn"}
          {currentTable.board.length === 5 && "River"}
          {currentTable.wentToShowdown && "Showdown"}
        </InfoPill>
      )}

      {!!currentTable.mainPot && (
        <ChipsAmountPill
          chipsAmount={currentTable.mainPot}
          nativeToken={nativeToken}
          style={{ minWidth: "150px" }}
        />
      )}

      {currentTable.sidePots > 0 &&
        currentTable.sidePots.map((sidePot) => (
          <ChipsAmountPill
            chipsAmount={sidePot.amount}
            nativeToken={nativeToken}
            style={{ minWidth: "150px" }}
          />
        ))}
    </Wrapper>
  );
};
