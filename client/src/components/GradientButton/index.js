import styled from "styled-components";

const GradientButton = styled.button`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: ${(props) => props.margin};
  border-radius: ${(props) => (props.radius ? props.radius : `4px`)};
  background: linear-gradient(90deg, #da367f 6.49%, #f95e42 92.91%);
  text-align: center;
  border: none;
  font-family: ${(props) => props.fm};
  font-size: ${(props) => props.fs};
  font-weight: 500;
  line-height: 22.38px;
  color: #fff;
  cursor: pointer;
`;

export default GradientButton;
