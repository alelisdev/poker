import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import globalContext from "../../context/global/globalContext";
import GradientButton from "../GradientButton";
import modalContext from "../../context/modal/modalContext";
import pokerClient from "../../helpers/axios";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalContainer = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  transition: all 0.3s;
  color: #fff;
  text-align: center;

  & .modal {
    display: flex;
    flex-direction: column;
    width: 340px;
    height: 253px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 32px 12px;
    border-radius: 12px;
    background: #333541;

    .title {
      color: rgba(255, 255, 255, 0.67);
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
      text-transform: uppercase;
    }

    .sub-title {
      text-transform: uppercase;
      color: #da367f;
      font-size: 14px;
      font-weight: 600;
      line-height: 18px;
    }

    .contents {
      display: flex;
      flex-direction: column;
      margin-top: 30px;
      .row {
        display: flex;
        justify-content: space-between;
        font-size: 12px;
        font-weight: 400;
        line-height: 15.6px;

        .field {
          color: #9e9c9c;
        }

        .value {
          color: #ffffff;
        }
      }

      .button-group {
        margin-top: 30px;
      }
    }
  }
`;

const CancelButton = styled.button`
  width: 147px;
  height: 42px;
  border-radius: 8px;
  text-align: center;
  border: solid 1px #fff;
  font-family: IBM Plex Mono;
  font-size: 13px;
  font-weight: 500;
  line-height: 16.9px;
  color: #fff;
  cursor: pointer;
  background: transparent;
`;

const CustomTimeInput = ({ date, onChangeCustom }) => {
  const value =
    date instanceof Date && !isNaN(date)
      ? // Getting time from Date beacuse `value` comes here without seconds
        date.toLocaleTimeString("it-IT")
      : "";

  return (
    <input
      type="time"
      step="1"
      value={value}
      onChange={(event) => onChangeCustom(date, event.target.value)}
    />
  );
};

const NewTnModal = (props) => {
  const history = useHistory();
  const {
    setShowNewTnModal,
    setActiveTab,
    tnTables,
    isLoading,
    chipsAmount,
    setBalance,
    setChipsAmount,
    setIsLoading,
    nativeToken,
    tnRegisterId,
    setTns,
    ethPrice,
  } = useContext(globalContext);

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };

  const handleChangeStartTime = (date, time) => {
    const [hh, mm, ss] = time.split(":");
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setStartDate(targetDate);
  };

  const handleChangeEndTime = (date, time) => {
    const [hh, mm, ss] = time.split(":");
    const targetDate = date instanceof Date && !isNaN(date) ? date : new Date();
    targetDate.setHours(Number(hh) || 0, Number(mm) || 0, Number(ss) || 0);
    setEndDate(targetDate);
  };

  return (
    <ModalContainer>
      <div className="modal">
        <span className="title">new tournament?</span>
        <div className="contents">
          <div className="row">
            <span className="field">Start time:</span>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm:ss aa"
              showTimeInput
              customTimeInput={
                <CustomTimeInput onChangeCustom={handleChangeStartTime} />
              }
              timeClassName={handleColor}
              // showTimeSelect
            />
          </div>
          <div className="row">
            <span className="field">end time:</span>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              timeInputLabel="Time:"
              dateFormat="MM/dd/yyyy h:mm:ss aa"
              showTimeInput
              customTimeInput={
                <CustomTimeInput onChangeCustom={handleChangeEndTime} />
              }
              timeClassName={handleColor}
              // showTimeSelect
            />
          </div>
          <div className="row button-group">
            <CancelButton onClick={() => setShowNewTnModal(false)}>
              Cancel
            </CancelButton>
            <GradientButton
              width="147px"
              height="42px"
              radius="8px"
              onClick={() =>
                props.createNew({
                  startDate,
                  endDate,
                })
              }
            >
              Add
            </GradientButton>
          </div>
        </div>
      </div>
    </ModalContainer>
  );
};

export default NewTnModal;
