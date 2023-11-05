import styled from "styled-components";

export const SearchWrapper = styled.div`
  margin-top: 22px;
  position: relative;
`;

export const TableWrapper = styled.div`
  border-bottom: 1px solid #2d2d2d;
  width: 98.5%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    flex-direction: column-reverse;
    align-items: flex-start;
  }
`;

export const SideWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width};
  margin-top: ${(props) => (props.mt ? props.mt : "0px")};
  gap: ${(props) => props.gap};
`;

export const MainWrapper = styled.div`
  padding: 0px 40px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
`;

export const SearchInput = styled.input`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  width: 269px;
  height: 37px;
  border-radius: 4px;
  color: #fff;
  background-color: #212531;
  padding: 10px 10px 10px 40px;
  border: solid 0px;
  &::placeholder {
    color: #fff;
  }
  @media screen and (max-width: 1240px) {
    width: 144px;
  }

  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`;

export const SearchButton = styled.div`
  position: absolute;
  z-index: 40;
  left: 12px;
  bottom: 8px;
  cursor: pointer;
`;
