import React, { useContext } from "react";
import PokerChip from "../icons/PokerChip";
import styled from "styled-components";
import globalContext from "../../context/global/globalContext";

const Wrapper = styled.div`
  position: relative;
  display: inline-block;

  & span {
    font-size: 12px;
    line-height: 15.6px;
    font-weight: 500;
    color: #fff;
  }
`;

const IconWrapper = styled.label`
  position: absolute;
  width: 30px;
  height: 30px;
  z-index: 5;
  left: -36px;
  top: 0px;
`;

const ChipsAmountPill = ({ chipsAmount, nativeToken }) => {
  const { activeTab } = useContext(globalContext);

  return (
    <Wrapper>
      <IconWrapper htmlFor="chipsAmount">
        <PokerChip width="30" height="30" />
      </IconWrapper>
      {activeTab === "cash" && (
        <span>$ {parseFloat(chipsAmount).toFixed(2)}</span>
      )}
      {activeTab === "tournament" && <span>{chipsAmount}</span>}
    </Wrapper>
  );
};

export default ChipsAmountPill;
