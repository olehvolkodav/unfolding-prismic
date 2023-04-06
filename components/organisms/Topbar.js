import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Text } from "components/atoms/Typography";
import LinkOutIcon from "components/organisms/svg/LinkOutIcon";

const TopBar = ({ topbar }) => {
  return (
    <Container>
      {1==2 && <Search placeholder="Search" />}
      <SelectLangWrapper>
        <BibleLink
          href="https://www.openbiblestories.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Text>Open Bible Stories</Text>
          <LinkOutIcon color="white" width={11} />
        </BibleLink>
      </SelectLangWrapper>
    </Container>
  );
};

export default TopBar;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 40px;
  background-color: #014263;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  @media (min-width: 1024px) {
    padding: 7px 135px;
  }
`;

const Search = styled.input`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 24px;
  background: #ffffff1a;
  border-radius: 5px;
  border: none;
  outline: none;
  width: 285px;
  padding: 1px;
  text-indent: 10px;
  color: white;
  margin-bottom: 12px;

  &::placeholder {
    color: white;
  }

  @media (min-width: 768px) {
    margin-bottom: 0px;
  }
`;

const SelectLangWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const BibleLink = styled.a`
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  color: white;

  @media (min-width: 768px) {
    margin-left: 30px;
  }

  &:hover {
    span {
      color: #ffffff9e;
    }
    svg {
      fill: #ffffff9e;
    }
  }
  span {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 24px;
    color: white;
    text-align: right;
  }
  svg {
    margin-left: 5px;
  }
`;

const LanguageSelect = styled.select`
  background: transparent;
  padding-left: 5px;
  font-size: 14px;
  border: none;
  outline: none;
  margin-left: 20px;
  color: white;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  &:hover {
    color: #ffffff9e;
  }
  option {
    color: black;
    background: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
    &:hover {
      box-shadow: 0 0 10px 100px red inset;
    }
  }
`;
