import React, { useState, useContext, useEffect } from "react";
import pokerClient from "../../helpers/axios";
import globalContext from "../../context/global/globalContext";
import NewTnModal from "../../components/newTnModal";
import styled from "styled-components";

const TournamentTableContainer = styled.div`
  & #title {
    text-align: center;
    color: #fff;
  }

  & #employee {
    border-collapse: collapse;
    border: 2px solid #ddd;
    margin: auto;
  }

  & #employee td,
  & #employee th {
    border: 1px solid #ddd;
    padding: 12px;
    color: #fff;
  }

  & #employee th {
    padding: 10px;
    text-align: center;
    background-color: #4caf50;
    color: white;
  }

  & .operation {
    text-align: center;
  }

  & .button {
    border: none;
    outline: none;
    font-size: 11px;
    font-family: "Quicksand", sans-serif;
    color: #f44336;
    padding: 3px 10px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #f44336;
    background-color: transparent;
  }

  & .reward {
    border: none;
    outline: none;
    font-size: 11px;
    font-family: "Quicksand", sans-serif;
    color: #4caf50;
    padding: 3px 10px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #4caf50;
    background-color: transparent;
  }

  & .create-btn {
    position: absolute;
    top: 56px;
    right: 200px;
    border: none;
    outline: none;
    font-size: 14px;
    color: #4caf50;
    padding: 3px 10px;
    border-radius: 8px;
    cursor: pointer;
    border: 1px solid #4caf50;
    background-color: transparent;
    padding: 10px 20px;
  }

  & .button:active {
    border: 1px solid blue;
  }
`;

const useAPi = (url) => {
  const { setShowNewTnModal, setTns, tns } = useContext(globalContext);
  const [data, setData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await pokerClient.get(url);
    setTns(response.data.data);
  };

  const removeData = async (id) => {
    pokerClient.delete(`${url}/${id}`).then(() => {
      const del = tns.filter((item) => id !== item._id);
      setTns(del);
    });
  };

  const createNew = async (val) => {
    const res = await pokerClient.post(`${url}/new`, {
      name: `Tournament${tns.length + 1}`,
      start: val.startDate,
      end: val.endDate,
    });
    setTns([...tns, res.data.data]);
    setShowNewTnModal(false);
  };

  const reward = async (id) => {
    await pokerClient.post(`${url}/reward`, {
      id: id,
    });
  };
  return { removeData, createNew, reward };
};

const AdminTournaments = () => {
  const { showNewTnModal, setShowNewTnModal, tns } = useContext(globalContext);
  const { reward, removeData, createNew } = useAPi("/api/tournaments");

  const renderHeader = () => {
    let headerElement = ["id", "name", "start", "end", "operation"];
    return headerElement.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>;
    });
  };

  const renderBody = () => {
    return (
      tns &&
      tns.map(({ _id, name, start, end }, index) => {
        return (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{name}</td>
            <td>{start}</td>
            <td>{end}</td>
            <td className="operation">
              {new Date(end).toISOString() < new Date().toISOString() && (
                <button
                  className="reward"
                  onClick={async () => {
                    await reward(_id);
                    await removeData(_id);
                  }}
                >
                  Reward
                </button>
              )}
            </td>
          </tr>
        );
      })
    );
  };

  return (
    <TournamentTableContainer>
      <>
        <h1 id="title">Tournaments</h1>
        <button className="create-btn" onClick={() => setShowNewTnModal(true)}>
          Add
        </button>
        <table id="employee">
          <thead>
            <tr>{renderHeader()}</tr>
          </thead>
          <tbody>{renderBody()}</tbody>
        </table>
      </>
      {showNewTnModal && <NewTnModal createNew={createNew} />}
    </TournamentTableContainer>
  );
};

export default AdminTournaments;
