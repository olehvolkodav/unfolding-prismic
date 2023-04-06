import React from "react";
import styled, { css } from "styled-components";
import { Title, Text } from "components/atoms/Typography";
import { RichText } from "prismic-reactjs";
import { htmlSerializer } from "utils/htmlSerializer";
import { Section } from "components/atoms/Section";
import { compressSetting } from "utils/general";

export default function RegionAbout({ data }) {
  return (
    <Section
      wrapperCss={wrapperCss}
    >
      <ContentWrapper>
        <Title size="2.5" weight="800">
          {RichText.asText(data.about_headline)}
        </Title>
        <RichText render={data.about_content} htmlSerializer={htmlSerializer} />
      </ContentWrapper>
      <ImageWrapper>
        <Image src={compressSetting(data.about_image.url, data.about_image.dimensions?.width)} />
      </ImageWrapper>
    </Section>
  );
}

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  a {
    color: #014263;
  }
  h3 {
    margin-bottom: 8px;
  }
  @media (max-width: 1024px) {
    h3,
    span {
      text-align: center;
    }
  }

  @media (min-width: 1025px) {
    width: 50%;
    padding-right: 50px;

    h3,
    span {
      text-align: left;
    }
  }
`;

const ImageWrapper = styled.div`
  text-align: right;
  margin-top: 40px;
  position: relative;

  @media (min-width: 1025px) {
    width: 50%;
    margin-top: 0px;
  }

  @media (max-width: 425px) {
    text-align: center;
  }
`;

const Image = styled.img`
  position: relative;
  width: 100%;
  @media (min-width: 1025px) {
    width: 600px;
  }
  @media (max-width: 425px) {
    width: calc(100% - 10px);
  }
`;

const DotMapImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 5%;
  max-width: 600px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DotMapImage = styled.img`
  max-width: 90%;
`;
