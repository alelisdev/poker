import React from "react";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 25%;
  height: 123px;
  border-radius: 8px;
  border: 2px solid #333541;
  background-color: #212531;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  filter: drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.75));
`;

const TitleWrapper = styled.span`
  text-transform: uppercase;
  font-weight: 700;
  line-height: 18px;
  color: #ffffff;
  font-size: 14px;
`;

const DescWrapper = styled.span`
  padding: 0px 16px;
  margin-top: 6px;
  font-weight: 400;
  color: #b6b7bb;
  font-size: 9px;
  line-height: 11.7px;
  text-align: center;
`;

const CardItem = (props) => {
  return (
    <CardWrapper>
      <img
        src={props.imgUrl}
        alt={props.title}
        style={{ width: props.width, height: props.height }}
      />
      <TitleWrapper>{props.title}</TitleWrapper>
      <DescWrapper>{props.desc}</DescWrapper>
    </CardWrapper>
  );
};

export default CardItem;
