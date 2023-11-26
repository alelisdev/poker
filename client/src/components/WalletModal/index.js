import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { ethers } from "ethers";
import {
  Connection,
  PublicKey,
  Transaction,
  SystemProgram,
} from "@solana/web3.js";
import globalContext from "../../context/global/globalContext";
import pokerClient from "../../helpers/axios";
import GradientButton from "../GradientButton";

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
    width: 492px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 2em;
    border-radius: 12px;
    background: #333541;

    .button-group {
      margin-top: 30px;
      display: flex;
      justify-content: center;
      gap: 73px;
    }
  }
`;

const AddressWrapper = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  font-weight: 600;
  text-align: left;
  color: rgba(255, 255, 255, 0.67);
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

const StyledSelect = styled.select`
  width: 100%;
  margin-top: 10px;
  border-radius: 4px;
  background: #333541;
  color: #fff;
  padding: 8px;
  border: solid 1px #fff;
`;

const WalletModal = () => {
  const [depositAddress, setDepositeAddress] = useState("");
  const [amount, setAmount] = useState(0.1);
  const {
    id,
    nativeToken,
    setNativeToken,
    setOpenWalletModal,
    balance,
    setBalance,
  } = useContext(globalContext);

  const handleClickETHDeposit = async () => {
    if (amount < 0.01) {
      alert("The Deposit Amount should be much than 0.01");
    } else {
      await sendETH(depositAddress, amount);
    }
  };

  const handleClickSOLDeposit = async () => {
    if (amount < 0.01) {
      alert("The Deposit Amount should be much than 0.01");
    } else {
      await sendSOL(depositAddress, amount);
    }
  };

  const sendETH = async (toAddress, amount) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // Request permission to connect Metamask to the dApp
      await window.ethereum.enable();

      // Get the selected account from Metamask
      const signer = provider.getSigner();
      const senderAddress = await signer.getAddress();
      // Create a new transaction object
      const tx = {
        to: toAddress,
        value: ethers.utils.parseEther(amount.toString()),
      };

      // Send the transaction
      const txResponse = await signer.sendTransaction(tx);
      const res = await pokerClient.post("/api/payments/update-balance", {
        currency: {
          coinType: nativeToken,
          type: "native",
        },
        amount: amount,
        txHash: txResponse.hash,
        from: txResponse.from,
        to: txResponse.to,
      });
      setOpenWalletModal(false);
      const updatedBalance = Number(balance) + Number(amount);
      if (res.data.status === true) {
        setBalance(updatedBalance);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendSOL = async (toAddress, amount) => {
    try {
      const connection = new Connection("https://api.devnet.solana.com");
      // Connect to the Phantom wallet
      await window.solana.connect();
      // Get the selected account from the Phantom wallet
      const publicKey = await window.solana.publicKey;
      const senderAddress = publicKey.toBase58();

      // Convert the amount to lamports (1 SOL = 1000000000 lamports)
      const amountLamports = amount * 1000000000;

      // Create a new transaction object
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: new PublicKey(senderAddress),
          toPubkey: new PublicKey(toAddress),
          lamports: amountLamports,
        })
      );

      // Sign and send the transaction
      const signature = await window.solana.signTransaction(transaction);
      const txHash = await connection.sendRawTransaction(
        transaction.serialize()
      );
      setOpenWalletModal(false);
      console.log("Transaction Hash:", txHash);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const loadDepositeAddress = async () => {
      const request = {
        coinType: nativeToken,
        type: "native",
        userId: id,
      };
      const response = await pokerClient.post(
        "/api/payments/deposit-address",
        request
      );
      if (response.status === 200) {
        setDepositeAddress(response.data.data.address);
      } else {
        setDepositeAddress("");
      }
    };
    loadDepositeAddress();
  }, [nativeToken, id]);

  const handleChangeAmount = (e) => {
    e.preventDefault();
    setAmount(e.target.value);
  };

  const handleCopyClipboard = () => {};

  const handleChange = (e) => {
    setNativeToken(e.target.value);
  };

  return (
    <ModalContainer>
      <div className="modal">
        <AddressWrapper>
          <span>Select Token</span>
          <InputWrapper>
            <StyledSelect
              name="tokens"
              onChange={handleChange}
              defaultValue={nativeToken}
            >
              <option value="ETH">ETH</option>
              <option value="SOL">SOL</option>
            </StyledSelect>
          </InputWrapper>
        </AddressWrapper>
        <AddressWrapper>
          <span>Deposit Address</span>
          <InputWrapper>
            <input value={depositAddress} readOnly />
            <i className="fa fa-copy" onClick={() => handleCopyClipboard}></i>
          </InputWrapper>
        </AddressWrapper>
        <AddressWrapper>
          <span>Amount</span>
          <InputWrapper>
            <input
              type="number"
              value={amount}
              min={0.01}
              step={0.01}
              onChange={handleChangeAmount}
            />
          </InputWrapper>
        </AddressWrapper>
        <div className="button-group">
          <CancelButton onClick={() => setOpenWalletModal(false)}>
            Cancel
          </CancelButton>
          <GradientButton
            width="147px"
            height="42px"
            radius="8px"
            fs="13px"
            onClick={handleClickETHDeposit}
          >
            Deposit
          </GradientButton>
        </div>
      </div>
    </ModalContainer>
  );
};

export default WalletModal;
