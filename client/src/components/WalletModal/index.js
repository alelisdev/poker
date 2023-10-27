import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import globalContext from "../../context/global/globalContext";
import Axios from "axios";

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

  & .modal {
    width: 624px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    border-radius: 12px;
    background: #333541;
  }

  & h1 {
    font-size: 150%;
    margin: 0 0 15px;
    color: #fff;
  }

  & .modal-close {
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    line-height: 50px;
    font-size: 80%;
    position: absolute;
    right: 0;
    text-align: center;
    top: 0;
    width: 70px;
    text-decoration: none;
    &:hover {
      color: #006dff;
    }
  }
`;

const Button = styled.button`
  border-radius: 8px;
  font-size: 13px;
  font-weight: 600;
  font-family: "IBM Plex Mono";
  line-height: 16.9px;
  padding: 10px 20px;
  color: #fff;
  cursor: pointer;
  margin-right: 20px;
  border: ${(props) => (props.active ? "none" : "#fff solid 1px")};
  background: ${(props) =>
    props.active
      ? "linear-gradient(90deg, #da367f 0.04%, #f95e42 105.73%)"
      : "none"};
`;

const Dropdown = styled.div`
  margin-top: 20px;
  width: 100%;
  display: inline-block;
  background-color: #333541;
  color: #fff;
  border-radius: 2px;
  box-shadow: 0 0 2px rgb(204, 204, 204);
  transition: all 0.5s ease;
  position: relative;
  font-size: 14px;
  font-weight: 600;
  height: 100%;
  text-align: left;
  & .select {
    cursor: pointer;
    display: block;
    padding: 10px;
  }
  & .select > i {
    font-size: 13px;
    color: #888;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    float: right;
    line-height: 20px;
  }
  &:hover {
    box-shadow: 0 0 4px rgb(204, 204, 204);
  }
  &:active {
    background-color: #f8f8f8;
  }
  &.active:hover,
  &.active {
    box-shadow: 0 0 4px rgb(204, 204, 204);
    border-radius: 2px 2px 0 0;
    background-color: #f8f8f8;
  }
  &.active .select > i {
    transform: rotate(-90deg);
  }
  & .dropdown-menu {
    position: absolute;
    background-color: #333541;
    width: 100%;
    left: 0;
    margin-top: 1px;
    box-shadow: 0 1px 2px rgb(204, 204, 204);
    border-radius: 0 1px 2px 2px;
    overflow: hidden;
    max-height: 144px;
    overflow-y: auto;
    z-index: 9;
  }

  & .dropdown-menu.block {
    display: block;
  }

  & .dropdown-menu.none {
    display: none;
  }

  & .dropdown-menu li {
    padding: 10px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;
  }
  & .dropdown-menu {
    padding: 0;
    list-style: none;
  }
  & .dropdown-menu li:hover {
    background-color: #434551;
  }
  & .dropdown-menu li:active {
    background-color: #e2e2e2;
  }
`;

const AddressWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
`;

const InputWrapper = styled.div`
  position: relative;

  & input {
    font-size: 14px;
    font-weight: 600;
    margin-top: 10px;
    width: 100%;
    display: inline-block;
    background-color: #333541;
    color: #fff;
    border-radius: 2px;
    border: solid 1px #fff;
    padding: 10px;
  }

  & i {
    position: absolute;
    cursor: pointer;
    border: none;
    color: #fff;
    right: 3px;
    top: 14px;
    padding: 7px;
  }
`;

const WalletModal = (props) => {
  const modalRef = useRef(null);
  const [showCurrency, setShowCurrency] = useState(false);
  const [currency, setCurrency] = useState("ETH");
  const [text, setText] = useState("ETH");
  const [depositAddress, setDepositeAddress] = useState("0x....");

  const currencies = [
    {
      name: "ETH",
    },
    {
      name: "SOL",
    },
  ];
  const { id } = useContext(globalContext);

  useEffect(() => {
    loadDepositeAddress();
  }, [currency]);

  const loadDepositeAddress = async () => {
    const request = {
      coinType: currency,
      type: "native",
      userId: id,
    };
    const response = await Axios.post("/api/payments/deposit-address", request);
    console.log(response);
    if (response.status === 200) {
      setDepositeAddress(response.data.data.address);
    } else {
      setDepositeAddress("");
    }
  };

  const handleCopyClipboard = () => {};

  return (
    <ModalContainer>
      <div className="modal">
        <span
          title="Close"
          className="modal-close"
          onClick={() => props.setIsOpen(false)}
        >
          Close
        </span>
        <h1>Wallet</h1>
        <Button active>Deposit</Button>
        <Button>Withdraw</Button>
        <Dropdown>
          <div
            className="select"
            onClick={() => setShowCurrency(!showCurrency)}
          >
            <span>{text}</span>
            <i className="fa fa-chevron-down"></i>
          </div>
          <input type="hidden" name="gender" value={currency} />
          <ul className={`dropdown-menu ${showCurrency ? `block` : `none`}`}>
            {currencies.map((c, idx) => {
              return (
                <li
                  key={idx}
                  onClick={() => {
                    setText(c.name);
                    setCurrency(c.name);
                    setShowCurrency(false);
                  }}
                >
                  {c.name}
                </li>
              );
            })}
          </ul>
        </Dropdown>
        <AddressWrapper>
          <span>Deposit Address</span>
          <InputWrapper>
            <input value={depositAddress} readOnly />
            <i className="fa fa-copy" onClick={() => handleCopyClipboard}></i>
          </InputWrapper>
        </AddressWrapper>
      </div>
    </ModalContainer>
  );
};

export default WalletModal;
