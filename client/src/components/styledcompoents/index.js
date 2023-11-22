import styled from "styled-components";

export const BoounsItem = styled.div`
  border: 2px solid #333541;
  position: relative;
  border-radius: 12px;
  background: linear-gradient(90deg, #da367f, #f95e42);
  height: 123px;
`;
export const SearchWrapper = styled.div`
  margin-top: 22px;
  position: relative;
`;

export const CardContainer = styled.div`
  width: 98.5%;
  display: flex;
  gap: 12px;
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

export const Row = styled.div`
  display: flex;
  gap: 12px;
  width: 100%;
  margin-top: ${(props) => props.mt};
`;

export const Grid = styled.div`
  display: ${(props) => props.display};
  flex-direction: ${(props) => props.flexDirection};
  justify-content: ${(props) => props.justifyContent};
  width: ${(props) => `calc(100% / 12 * ${props.col}`});
  text-align: ${(props) => props.align};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bg};
  border-radius: ${(props) => props.radius};
  padding: ${(props) => props.padding};
  border: ${(props) => props.border};
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
  flex-direction: ${(props) => props.flexDirection};
  width: 100%;
  justify-content: space-between;
  margin-top: 22px;
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
