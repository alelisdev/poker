import React from "react";
import Container from "../components/layout/Container";
import CenteredBlock from "../components/layout/CenteredBlock";
import Heading from "../components/typography/Heading";
import Button from "../components/buttons/Button";
import { Link } from "react-router-dom";
import Hider from "../components/layout/Hider";
import illustrationMobile from "../assets/img/main-illustration-mobile@2x.png";
import illustrationDesktop from "../assets/img/main-illustration-desktop@2x.png";
import styled from "styled-components";
import useScrollToTopOnPageLoad from "../hooks/useScrollToTopOnPageLoad";
import Markdown from "react-remarkable";

const MarketingHeadline = styled(Heading)`
  @media screen and (min-width: 1024px) {
    margin-bottom: 3rem;
  }
`;

const Landing = () => {
  useScrollToTopOnPageLoad();

  return (
    <Container fullHeight contentCenteredMobile padding="4rem 2rem 2rem 2rem">
      <CenteredBlockWithAnimation>
        <Hider hideOnDesktop>
          <MobileIllustration src={illustrationMobile} alt="Poker" />
        </Hider>
        <Markdown>
          <MarketingHeadline
            as="h2"
            headingClass="h1"
            textCenteredOnMobile
            dangerouslySetInnerHTML={{
              __html:
                '<span style="color: #FFF">Join the world’s most <br />online poker experience!\n</span>',
            }}
          />
        </Markdown>
        <Wrapper>
          <Button as={Link} to="/register" primary autoFocus>
            Register
          </Button>
          <Button as={Link} to="/login" primary>
            Login
          </Button>
        </Wrapper>
      </CenteredBlockWithAnimation>
      <Hider hideOnMobile>
        <DesktopIllustration src={illustrationDesktop} alt="BC Poker" />
      </Hider>
    </Container>
  );
};

const CenteredBlockWithAnimation = styled(CenteredBlock)`
  align-items: center;
  font-family: "Poppins", sans-serif;
  font-weight: 600;
  opacity: 0;
  -webkit-animation-duration: 0.3s;
  animation-duration: 0.3s;
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeInLeft;
  animation-name: fadeInLeft;

  @-webkit-keyframes fadeInLeft {
    from {
      -webkit-transform: translate3d(-40px, 0, 0);
      transform: translate3d(-40px, 0, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
  @keyframes fadeInLeft {
    from {
      -webkit-transform: translate3d(-40px, 0, 0);
      transform: translate3d(-40px, 0, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const MobileIllustration = styled.img`
  margin: 1rem auto;
  width: 70%;
  max-width: 380px;

  @media screen and (orientation: landscape) {
    display: none;
  }
`;

const DesktopIllustration = styled.img`
  position: relative;
  margin-left: 2rem;
  right: 2rem;
  max-width: 400px;
  -webkit-transform: scale(1.25);
  transform: scale(1.25);
  transition: all 0.5s;
  opacity: 0;
  animation-duration: 0.3s;
  animation-delay: 0.6s;
  animation-fill-mode: both;
  -webkit-animation-duration: 0.3s;
  -webkit-animation-delay: 0.6s;
  -webkit-animation-fill-mode: both;
  animation-name: fadeInRight;
  -webkit-animation-name: fadeInRight;

  @keyframes fadeInRight {
    from {
      -webkit-transform: translate3d(40px, 0, 0);
      transform: translate3d(40px, 0, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeInRight {
    from {
      -webkit-transform: translate3d(40px, 0, 0);
      transform: translate3d(40px, 0, 0);
    }

    to {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

const Wrapper = styled.div`
  max-width: 624px;
  margin: 0 auto;

  & ${Button}:not(:first-child) {
    margin-top: 1rem;
  }

  @media screen and (min-width: 1024px) {
    margin: 0;
    margin-top: 1.5rem;

    & ${Button}:not(:first-child) {
      margin-top: 10;
    }
  }
`;

export default Landing;
