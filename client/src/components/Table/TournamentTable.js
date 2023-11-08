import React, { useContext } from "react";
import styled from "styled-components";
import { ReactComponent as IconChecked } from "../../assets/icons/checked-icon.svg";
import { ReactComponent as IconNonChecked } from "../../assets/icons/nonchecked-icon.svg";
import globalContext from "../../context/global/globalContext";
import { useHistory } from "react-router-dom";

const TableHeader = styled.div`
  margin-top: 10px;
  margin-bottom: 5px;
  background-color: #181a26;
  height: 25px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  width: 98.3%;
  & .check {
    width: 12%;
  }
  & .name {
    width: 20%;
  }
  & .buyin {
    width: 12%;
  }
  & .gtd {
    width: 12%;
  }
  & .limits {
    width: 12%;
  }
  & .scheduler {
    width: 12%;
  }
  & .status {
    width: 20%;
  }
  span {
    text-align: left;
    color: rgba(255, 255, 255, 0.67);
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const TableBody = styled.div`
  display: flex;
  flex-direction: column;
`;

const TableRow = styled.div`
  padding: 20px 4px;
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #212531;
  height: 47.9px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  width: 98.9%;
  cursor: pointer;
  color: #fff;

  & .check {
    width: 12%;
    text-align: center;
  }
  & .name {
    width: 20%;
  }
  & .buyin {
    width: 12%;
  }
  & .gtd {
    width: 12%;
  }
  & .limits {
    width: 12%;
  }
  & .scheduler {
    width: 12%;
    display: flex;
    flex-direction: column;
  }
  & .status {
    width: 20%;
    display: flex;
    gap: 10px;
  }

  & .btn {
    color: #00ff47;
    font-weight: 400;
    font-size: 12px;
    line-height: 15.6px;
    cursor: pointer;
  }

  & p {
    font-size: 10px;
    line-height: 13px;
    font-weight: 400;
    color: #878282;
    margin-bottom: 0rem;
  }

  span {
    text-align: left;
    color: #fff;
    font-size: 12px;
    font-weight: 400;
    line-height: 15.6px;
  }
`;

const TournamentTable = (props) => {
  const history = useHistory();
  const { setOpenTournamentModal } = useContext(globalContext);

  return (
    <>
      <TableHeader>
        <span className="check"></span>
        <span className="name">Name</span>
        <span className="buyin">BUY IN</span>
        <span className="gtd">GTD</span>
        <span className="limits">LIMITS</span>
        <span className="scheduler">SCHEDULER</span>
        <span className="status">STATUS</span>
      </TableHeader>
      <TableBody>
        {props.data.map((item, idx) => {
          return (
            <TableRow key={idx}>
              <div className="check">
                {item.checked ? <IconChecked /> : <IconNonChecked />}
              </div>
              <div className="name">
                <span>{`${item.name}`}</span>
              </div>
              <div className="buyin">
                <span>10$ + 1$</span>
              </div>
              <span className="gtd">100 $</span>
              <span className="limits">{item.limit}</span>
              <span className="scheduler">
                <span className="data">May 18</span>
                <p className="data">07.41.44</p>
              </span>
              <div className="status">
                <span
                  className="btn"
                  onClick={() => setOpenTournamentModal(true)}
                >
                  Registeration
                </span>
                <span className="btn" onClick={() => history.push("/lobby")}>
                  open
                </span>
              </div>
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default TournamentTable;
