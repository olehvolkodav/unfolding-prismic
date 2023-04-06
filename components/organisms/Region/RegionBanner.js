import React from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";
import { Headline, SubHeadline } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";
import { useClickLink } from "hooks";

const RegionBanner = ({ data, projects }) => {
  const { href, target } = useClickLink(data.cta_url, "", true, projects);

  return (
    <Section
      bgImg={data.background_image}
      maskColor={data.image_mask_color}
      maskOpacity={data.image_mask_opacity}
      sectionCss={sectionCss}
      wrapperCss={wrapperCss}
    >
      <Content>
        <RegionName inverse={data.inverse_text_color}>{RichText.asText(data.region_name)}</RegionName>
        <Headline
          color={data.inverse_text_color ? "white" : "#231F20"}
          textAlign="center"
        >
          {RichText.asText(data.banner_headline)}
        </Headline>
        <SubHeadline
          color={data.inverse_text_color ? "white" : "#231F20"}
          textAlign="center"
        >
          {RichText.asText(data.banner_subheadline)}
        </SubHeadline>
        <Button href={href} target={target}>Give Now</Button>
      </Content>
    </Section>
  );
};

export default RegionBanner;

const sectionCss = css``;

const wrapperCss = css`
  align-items: center;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 0;
  z-index: 10;
  text-align: center;
  @media (min-width: 1025px) {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    max-width: 60%;
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
  margin-top: 30px;
  text-decoration: none;
  &:hover {
    background-color: #ffbe00b0;
  }
`;

const RegionName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-shadow: 2px 2px 10px #00000075;

  ${({ inverse }) =>
    inverse == true &&
    css`
      color: #fff;
    `
  }
`;