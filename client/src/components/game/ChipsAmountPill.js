import React from "react";
import PokerChip from "../icons/PokerChip";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  console.log(nativeToken);
  return (
    <Wrapper>
      <IconWrapper htmlFor="chipsAmount">
        <PokerChip width="30" height="30" />
      </IconWrapper>
      <span>
        {parseFloat(chipsAmount).toFixed(4)}
        {nativeToken}
      </span>
    </Wrapper>
  );
};

ChipsAmountPill.propTypes = {
  chipsAmount: PropTypes.number,
};

export default ChipsAmountPill;
