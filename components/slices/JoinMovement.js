import React from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Caption } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";
import { useClickLink } from "hooks";
import { compressSetting } from "utils/general";

const JoinMovement = ({ data, ctaUrl, projects }) => {
  const { href, target } = useClickLink(ctaUrl, data.button_link, true, projects);

  return (
    <Section bgColor={data.background_color} wrapperCss={wrapperCss({isMobileHide: data.hide_on_mobile})}>
      <Content
        isLarge={data.variant === "large" || data.region_name?.length > 0}
      >
        <MovementSection>
          <Headline>
            <Title size="3.5" color="white">
              {RichText.asText(data.headline)}
            </Title>
            <Caption color="white" size="1.5" height="150" weight="400">
              {RichText.asText(data.sub_headline)}
            </Caption>
            <Button href={href} target={target}>
              {data.button_text && data.button_text.length > 0 && data.button_text[0].text ? data.button_text[0].text : "Give Now"}
            </Button>
          </Headline>
        </MovementSection>
        <ContentImageWrapper
          img={
            !!data.cta_background_image?.url
              ? data.cta_background_image
              : data.background_image
          }
        />
      </Content>
    </Section>
  );
};

export default JoinMovement;

const wrapperCss = ({isMobileHide}) => css`
  padding: 0;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "block"};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    min-height: ${({ isLarge }) => isLarge ? "700px" : "300px"};
  }
  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const MovementSection = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px;

  @media (min-width: 1024px) {
    width: 50%;
    justify-content: center;
  }
`;
const Headline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  @media (max-width: 1024px) {
    align-items: center;
  }

  h3 {
    margin-bottom: 8px;
  }
  h5 {
    margin-top: 0;
  }
  @media (max-width: 768px) {
    width: 100%;
  }

  h3 {
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  @media (min-width: 1024px) {
    h3,
    h5 {
      text-align: left;
    }
  }
`;

const ContentImageWrapper = styled.div`
  @media (min-width: 1025px) {
    width: 50%;
    background: url(${({ img }) => compressSetting(img.url, img.dimensions?.width)}) center center / cover no-repeat;
  }
`;

const Button = styled.a`
  border: none;
  outline: none;
  padding: 14px 50px;
  background-color: #f7b905fa;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-decoration: none;
  &:hover {
    background-color: #ffbe00b0;
  }
`;
