import React from "react";
import styled from "styled-components";
import table from "../../assets/img/bord1.png";

const StyledPokerTable = styled.img`
  width: 840px;
  position: absolute;
  top: 40px;
  display: block;
  pointer-events: none;
  margin: 0 auto;
`;

const PokerTable = () => <StyledPokerTable src={table} alt="Poker Table" />;

export default PokerTable;
