import { Title, Text } from "components/atoms/Typography";
import { JoinMovement } from "components/slices";
import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { htmlSerializer } from "utils/htmlSerializer";
import { Image } from "components/atoms/Image";

export const StoryPage = ({ data, cta, projects }) => {
  return (
    <Container>
      <StoryArea>
        <LinksWrapper>
          <a href="/">
            <PathText size="1.2" id="pathItem">
              Home
            </PathText>
          </a>
          <Text size="1.2" color={"#000"}>
            {` > `}
          </Text>
          <PathText size="1.2" id="pathItem" isLast>
            {RichText.asText(data.title)}
          </PathText>
        </LinksWrapper>
        <Story>
          <Title size="3.5">{RichText.asText(data.title)}</Title>
          <div>
            <Image source={data.overview_image} />
            <RichText render={data.content} htmlSerializer={htmlSerializer} />
          </div>
        </Story>
      </StoryArea>
      <JoinMovement data={cta.data} projects={projects} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const StoryArea = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px 132px;
  @media (max-width: 560px) {
    padding: 20px 40px;
  }
`;
const LinksWrapper = styled.div``;
const PathText = styled(Text)`
  color: ${({ isLast }) => (!isLast ? "#0076FF" : "#000")} !important;
  text-decoration-line: ${({ isLast }) => (!isLast ? "underline" : "none")};
  cursor: ${({ isLast }) => (!isLast ? "pointer" : "default")};
`;
const Story = styled.div`
  h3 {
    text-align: left;
    margin-top: 20px;
    margin-bottom: 34px;
  }
  div {
    @media (max-width: 560px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    img {
      display: block;
      float: right;
      margin-bottom: 10px;
      margin-left: 10px;
      max-width: 30vw;
      @media (max-width: 560px) {
        max-width: calc(100vw - 40px);
      }
    }
  }
`;
