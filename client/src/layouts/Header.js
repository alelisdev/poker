import React, { useContext, useState, useEffect, useMemo } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import globalContext from "../context/global/globalContext";
import styled from "styled-components";
import { ReactComponent as IconNavbar } from "../assets/icons/nav-icon.svg";
import { ReactComponent as IconHome } from "../assets/icons/home-icon.svg";
import { ReactComponent as IconLogo } from "../assets/icons/logo-icon.svg";
import { ReactComponent as IconWallet } from "../assets/icons/wallet-icon.svg";
import { ReactComponent as IconNotify } from "../assets/icons/notify-icon.svg";
import { ReactComponent as IconSetting } from "../assets/icons/setting-icon.svg";
import { ReactComponent as IconAvatar } from "../assets/icons/avatar-icon.svg";
import { ReactComponent as IconArrow } from "../assets/icons/arrow-icon.svg";
import solImg from "../assets/img/sol.png";
import ethImg from "../assets/img/eth.png";
import WalletModal from "../components/WalletModal";

const HeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 76px;
  align-items: center;
  justify-content: space-between;
  padding: 0px 40px;
  background-color: transparent;
`;

const IconSimpleWrapper = styled.div`
  cursor: pointer;
  padding: 10px;
`;

const FlexWrapper = styled.div`
  display: flex;
  gap: ${(props) => props.gap};
  align-items: center;
`;

const IconWrapper = styled.div`
  cursor: pointer;
  padding: 13px 16px 13px 16px;
  background-color: #333541;
  border-radius: 12px;
  width: 50px;
  height: 50px;
  color: white;
`;

const LabelWrapper = styled.div`
  position: relative;
  width: 140px;
  padding: 4px 8px 4px 8px;
  border: solid #fff 1px;
  gap: 4px;
  height: 41px;
  color: #fff;
  text-align: center;
  font-size: 14px;
  font-weight: 400;
  border-radius: 12px;
  line-height: 32px;
  background-color: rgba(255, 255, 255, 0.04);
`;

const LabelBar = styled.div`
  position: absolute;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  width: 80px;
  height: 7px;
  left: 31px;
  bottom: -2px;
  background: #0f0f0f;
`;

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const NameWrapper = styled.span`
  font-weight: 600;
  color: #ffffff;
  font-size: 14px;
`;

const AMDWrapper = styled.span`
  font-weight: 600;
  color: #ff6b00;
  font-size: 12px;
`;

const USDWrapper = styled.span`
  font-weight: 600;
  color: #878282;
  font-size: 12px;
`;

const Bar = styled.div`
  height: 30px;
  width: 2px;
  background-color: #3b3b3b;
`;

const WalletModals = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(3px);
  z-index: 1;
`;

const ModalContainer = styled.div`
  background: #333;
  border-radius: 10px;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 250px;
  color: white;
  font-weight: bold;
`;

const ModalTitle = styled.div`
  border-bottom: 1px solid #c9c7c7;
  display: flex;
  justify-content: space-between;
  padding: 10px 20px;
`;

const ModalClose = styled.div`
  cursor: pointer;
`;

const ModalOptions = styled.div`
  align-items: stretch;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px 20px;
`;

const ModalOption = styled.div`
  align-items: center;
  border: 1px solid #c9c7c7;
  display: flex;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
`;

const ModalImg = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 100%;
`;

const Header = (props) => {
  const history = useHistory();
  const {
    userName,
    chipsAmount,
    nativeToken,
    openWalletModal,
    setOpenWalletModal,
  } = useContext(globalContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleShowDepositeModal = () => {
    setIsOpen(true);
  };

  return (
    <HeaderWrapper>
      <FlexWrapper gap="15px">
        <IconSimpleWrapper>
          <IconNavbar />
        </IconSimpleWrapper>
        <IconSimpleWrapper onClick={() => history.push("/")}>
          <IconHome />
        </IconSimpleWrapper>
        <LabelWrapper>
          15/30 NLH
          <LabelBar />
        </LabelWrapper>
        <LabelWrapper>
          .50/1 PL06
          <LabelBar />
        </LabelWrapper>
      </FlexWrapper>
      {props.showIcon && (
        <IconSimpleWrapper>
          <IconLogo />
        </IconSimpleWrapper>
      )}
      <FlexWrapper gap="30px">
        <FlexWrapper gap="10px">
          <IconWrapper onClick={() => history.push("/payments")}>
            <IconWallet />
          </IconWrapper>
          <IconWrapper onClick={handleShowDepositeModal}>
            <IconNotify />
          </IconWrapper>
          <IconWrapper>
            <IconSetting />
          </IconWrapper>
        </FlexWrapper>
        <Bar></Bar>
        <FlexWrapper gap="10px">
          <IconAvatar />
          <ProfileWrapper>
            <NameWrapper>{userName}</NameWrapper>
            <AMDWrapper>
              {parseFloat(chipsAmount).toFixed(4)} {nativeToken}
            </AMDWrapper>
            <USDWrapper>
              $ {parseFloat(chipsAmount * 1841.24).toFixed(3)}
            </USDWrapper>
          </ProfileWrapper>
          <IconArrow />
        </FlexWrapper>
      </FlexWrapper>
      {openWalletModal && (
        <WalletModal isOpen={isOpen} setIsOpen={setOpenWalletModal} />
      )}
    </HeaderWrapper>
  );
};

export default Header;
