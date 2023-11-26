import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as IconChecked } from "../../assets/icons/checked-icon.svg";
import { ReactComponent as IconNonChecked } from "../../assets/icons/nonchecked-icon.svg";
import globalContext from "../../context/global/globalContext";
import { useHistory } from "react-router-dom";
import socketContext from "../../context/websocket/socketContext";
import gameContext from "../../context/game/gameContext";
import pokerClient from "../../helpers/axios";

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

  & .registered {
    color: #94ecfb;
    font-weight: 400;
    font-size: 12px;
    line-height: 15.6px;
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
  const { joinTable } = useContext(gameContext);
  const {
    setOpenTournamentModal,
    chipsAmount,
    setTnRegisterName,
    tns,
    setTns,
    id,
    setChip,
  } = useContext(globalContext);
  const { socket } = useContext(socketContext);

  useEffect(() => {
    const getTns = async () => {
      const res = await pokerClient.get("/api/tournaments");
      setTns(res.data.data);
    };
    getTns();
  }, []);

  const joinGame = (tableId, tableName) => {
    const currentChip = chipsAmount.find((chip) => chip.name === tableName);
    setTnRegisterName(tableName);
    setChip(currentChip.amount);
    if (socket && tableId && currentChip.amount > 1000) {
      joinTable(tableId);
      history.push("/play");
    } else {
      setOpenTournamentModal(true);
    }
  };

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
        {props.tableData.map((item, idx) => {
          const datetime = new Date(item.start).toLocaleString();
          return (
            <TableRow key={idx}>
              <div className="check">
                {tns
                  .find((tn) => tn.name === item.name)
                  ?.registers.includes(id) ? (
                  <IconChecked />
                ) : (
                  <IconNonChecked />
                )}
              </div>
              <div className="name">
                <span>Mida Dao</span>
                {/* <span>{`${item.name}`}</span> */}
              </div>
              <div className="buyin">
                <span>{item.buyin ? item.buyin : "10$ + 1$"}</span>
              </div>
              <span className="gtd">{item.gtd ? item.gtd : "100 $"}</span>
              <span className="limits">{item.limits ? item.limits : "NL"}</span>
              <span className="scheduler">
                <span className="data">
                  {datetime.split(" ")[0].slice(0, -1)}
                </span>
                <p className="data">{datetime.split(" ")[1]}</p>
              </span>
              {item.end < new Date().toISOString() ? (
                <div className="status">Ended</div>
              ) : (
                <div className="status">
                  {tns
                    .find((tn) => tn.name === item.name)
                    ?.registers.includes(id) ? (
                    <span className="registered">Registered</span>
                  ) : (
                    <span
                      className="btn"
                      onClick={(e) => {
                        setOpenTournamentModal(true);
                        setTnRegisterName(item.name);
                        e.stopPropagation();
                      }}
                    >
                      Registeration
                    </span>
                  )}
                  <span
                    className="btn"
                    onClick={(e) => {
                      if (
                        tns
                          .find((tn) => tn.name === item.name)
                          ?.registers.includes(id)
                      ) {
                        joinGame(item.id, item.name);
                      } else {
                        setTnRegisterName(item.name);
                        history.push("/lobby");
                      }
                      e.stopPropagation();
                    }}
                  >
                    open
                  </span>
                </div>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </>
  );
};

export default TournamentTable;
