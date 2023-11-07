import styled, { css } from "styled-components";
import PropTypes from "prop-types";

const Button = styled.button`
  margin-top: 10px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0.75rem 1.5rem;
  outline: none;
  border: 2px solid rgba(0, 0, 0, 0);
  border-radius: 4px;
  color: #fff;
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.3rem;
  height: 50px;
  min-width: 150px;
  cursor: pointer;
  transition: all 0.3s;
  width: 314px;

  &:visited {
    background-color: ${(props) => props.theme.colors.goldenColorDarker};
    color: ${(props) => props.theme.colors.fontColorDark};
  }

  &:disabled {
    background-color: grey;
    border-color: 2px solid grey;
  }

  ${(props) =>
    props.primary &&
    css`
      background: linear-gradient(90deg, #da367f 0.04%, #f95e42 105.73%);
      font-size: 15px;
      color: ${(props) => props.theme.colors.primaryCta};
      padding: calc(0.75rem - 2px) calc(1.5rem - 2px);
      }};

      &,
      &:visited {
        color: ${(props) => props.theme.colors.fontColorLight};
      }

      &:hover,
      &:active {
        background-color: ${(props) => props.theme.colors.primaryCtaDarker};
        border-color: ${(props) => props.theme.colors.primaryCtaDarker};
        color: ${(props) => props.theme.colors.fontColorLight};
      }

      &:focus {
        color: ${(props) => props.theme.colors.fontColorLight};
      }

      &:disabled {
        background-color: grey;
        border-color: grey;
        color: ${(props) => props.theme.colors.fontColorDark};
      }
    `}

  ${(props) =>
    props.small &&
    css`
      font-size: 1.1rem;
      line-height: 1.1rem;
      min-width: 125px;
      padding: 0.5rem 1rem;
    `}
  
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
    `}

    @media screen and (max-width: 1024px) {
    ${(props) =>
      props.large &&
      css`
        font-size: 1.4rem;
        line-height: 1.4rem;
        min-width: 250px;
        padding: 0.75rem 1.5rem;
      `}
  }
`;

export default Button;
