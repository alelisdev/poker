import React from "react";
import styled from "styled-components";
import Loader from "./Loader";

const StyledLoadingScreen = styled.div`
  width: 100%;
  padding: 0 1.5rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  & svg {
    width: 100px;
    height: 100px;
    margin: 20px;
    display: inline-block;
  }
`;

const LoadingScreen = () => (
  <StyledLoadingScreen>
    <Loader />
  </StyledLoadingScreen>
);

export default LoadingScreen;
