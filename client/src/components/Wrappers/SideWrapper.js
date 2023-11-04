import styled from "styled-components";

const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
`;

export default SideWrapper;
