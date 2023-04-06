import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Text, Caption } from "components/atoms/Typography";

const OverviewVisual = ({ slice }) => {
  return (
    <Container bgColor={slice.primary.background_color}>
      <div>
        <Title size="2.5" height="120" weight="800" color="white">
          {RichText.asText(slice.primary.headline)}
        </Title>
        <Caption size="1.25" height="160" weight="200" color="white">
          {RichText.asText(slice.primary.sub_headline)}
        </Caption>
      </div>
      <OverviewImg src={slice.primary.overview_image.url} />
    </Container>
  );
};

export default OverviewVisual;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ bgColor }) => bgColor};
  padding: 40px;

  @media (min-width: 1024px) {
    padding: 0;
  }

  div {
    @media (min-width: 1024px) {
      width: 45%;
      margin: auto;
      margin-top: 40px;
    }

    h3 {
      @media (max-width: 768px) {
        font-size: 1.5rem;
      }
      @media (min-width: 1024px) {
        padding: 0px 12%;
      }
    }

    h5 {
      font-weight: 100;
      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;
const OverviewImg = styled.img`
  width: 90%;

  @media (min-width: 1024px) {
    margin: auto;
  }
`;
