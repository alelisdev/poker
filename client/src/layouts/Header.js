import React, { useContext, useState, useEffect, useMemo } from "react";
import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
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
import WalletModal from "../components/WalletModal";
import TournamentModal from "../components/TournamentModal";
import socketContext from "../context/websocket/socketContext";
import authContext from "../context/auth/authContext";
import gameContext from "../context/game/gameContext";
import axios from "axios";
import NewTnModal from "../components/newTnModal";

const HeaderWrapper = styled.div`
  max-width: 1440px;
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

const FlexRightWrapper = styled.div`
  display: flex;
  padding: 10px;
  gap: ${(props) => props.gap};
  align-items: flex-start;
  cursor: pointer;

  & .arrow-icon {
    margin-top: 4px;
  }
`;

const IconWrapper = styled.div`
  border: solid 1px #143334;
  cursor: pointer;
  padding: 13px 16px 13px 13px;
  background-color: #333541;
  border-radius: 12px;
  width: 50px;
  height: 50px;
  color: white;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.8));
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
  gap: 4px;
`;

const NameWrapper = styled.span`
  font-weight: 400;
  color: #ffffff;
  font-size: 12px;
`;

const AMDWrapper = styled.span`
  font-weight: 400;
  color: #ff6b00;
  font-size: 10px;
`;

const USDWrapper = styled.span`
  font-weight: 400;
  color: #878282;
  font-size: 10px;
`;

const Bar = styled.div`
  height: 33px;
  width: 1px;
  background-color: #212531;
`;

const Navbar = styled.div`
  position: absolute;
  width: 264px;
  height: 168px;
  background-color: #212531;
  border: 1px solid #333541;
  z-index: 10;
  top: 32px;
  right: 48px;
  border-radius: 4px;
  padding: 20px;

  & div {
    color: #fff;
    cursor: pointer;
  }

  & div:hover {
    color: #006dff;
    cursor: pointer;
  }
`;

const Header = (props) => {
  const history = useHistory();
  const location = useLocation();
  const { joined } = useContext(gameContext);
  const {
    userName,
    balance,
    openWalletModal,
    setOpenWalletModal,
    openTournamentModal,
  } = useContext(globalContext);
  const { cleanUp } = useContext(socketContext);
  const { logout } = useContext(authContext);
  const [showNav, setShowNav] = useState(false);

  return (
    <HeaderWrapper>
      <FlexWrapper gap="15px">
        <IconSimpleWrapper>
          <IconNavbar />
        </IconSimpleWrapper>
        <IconSimpleWrapper
          onClick={() => {
            if (!location.pathname.includes("play")) history.push("/");
          }}
        >
          <IconHome />
        </IconSimpleWrapper>
        {joined.map((item, idx) => {
          return (
            <LabelWrapper key={idx}>
              {item}
              <LabelBar />
            </LabelWrapper>
          );
        })}
      </FlexWrapper>
      {props.showIcon && (
        <IconSimpleWrapper>
          <IconLogo />
        </IconSimpleWrapper>
      )}
      <FlexWrapper gap="30px">
        <FlexWrapper gap="10px">
          <IconWrapper
            onClick={() => {
              if (!location.pathname.includes("play"))
                history.push("/payments");
            }}
          >
            <IconWallet />
          </IconWrapper>
          <IconWrapper onClick={() => setOpenWalletModal(true)}>
            <IconNotify />
          </IconWrapper>
          <IconWrapper>
            <IconSetting />
          </IconWrapper>
        </FlexWrapper>
        <Bar></Bar>
        <FlexRightWrapper
          gap="10px"
          onClick={() => setShowNav((prevState) => !prevState)}
        >
          <IconAvatar />
          <ProfileWrapper>
            <NameWrapper>{userName}</NameWrapper>
            <AMDWrapper>{parseFloat(balance).toFixed(2)}USD</AMDWrapper>
            <USDWrapper>$ 2.09</USDWrapper>
          </ProfileWrapper>
          <IconArrow className="arrow-icon" />
        </FlexRightWrapper>
      </FlexWrapper>
      {openWalletModal && <WalletModal />}
      {openTournamentModal && <TournamentModal />}
      {showNav && (
        <Navbar>
          <div>
            <div
              onClick={() => {
                cleanUp();
                setShowNav(false);
                logout();
              }}
            >
              Logout
            </div>
            <div
              onClick={() => {
                history.push("/admin/tournaments");
              }}
            >
              Admin Panel
            </div>
          </div>
        </Navbar>
      )}
    </HeaderWrapper>
  );
};

export default Header;
