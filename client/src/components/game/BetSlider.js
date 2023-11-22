import React, { useState } from "react";
import { BetSliderInput } from "./BetSliderInput";

export const BetSlider = ({ currentTable, seatId, bet, setBet, activeTab }) => {
  const min =
    currentTable.minBet >= currentTable.callAmount
      ? currentTable.minBet
      : currentTable.callAmount;
  const max =
    currentTable &&
    currentTable.seats &&
    currentTable.seats[seatId].stack &&
    (currentTable.seats[seatId].stack < currentTable.limit
      ? currentTable.seats[seatId].stack
      : currentTable.limit);

  const handleChange = (e) => {
    setBet(+e.target.value);
  };

  return (
    <BetSliderInput
      type="range"
      step={activeTab === "cash" ? 0.1 : 10}
      min={min}
      max={max}
      value={bet}
      onChange={handleChange}
    />
  );
};
