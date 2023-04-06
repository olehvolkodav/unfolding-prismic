import React from "react";
import styled, { css } from "styled-components";
import { Title, Caption } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";

import { useClickLink } from "hooks";

export default function RegionJoinMovementBar({ data, cta_url, forwardRef, projects }) {
  const { href, target } = useClickLink(cta_url, "", true, projects);

  return (
    <Section
      bgColor={data.background_color}
      forwardRef={forwardRef}
      wrapperCss={wrapperCss}
    >
      <TitleWrapper>
        <Title size="2.6" color="#fff">
          Join the Movement
        </Title>
        <SectionDescription>
          <Caption size="1.2" color="#fff">
            Partner with us to establish the Church in every people group and
            the Bible in every language.
          </Caption>
        </SectionDescription>
      </TitleWrapper>
      <ButtonWrapper>
        <Button href={href} target={target}>Give Now</Button>
      </ButtonWrapper>
    </Section>
  );
}

const wrapperCss = css`
  position: relative;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  z-index: 5;

  @media (min-width: 1024px) {
    flex-direction: row;
    align-items: center;
  }
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 20px;

  h3 {
    text-align: left;
    margin-bottom: 10px;
  }
  h5 {
    text-align: left;
    margin: 0;
  }

  @media (min-width: 1024px) {
    width: 50%;
    margin-bottom: 0;
  }
`;

const SectionDescription = styled.div`
  max-width: 700px;
  margin: 0 auto;

  h5 {
    font-weight: 100;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media (min-width: 1024px) {
    width: 50%;
  }
`;

const Button = styled.a`
  border-radius: 5px;
  background: #fff;
  border: 1px solid #fff;
  color: #1a7cf5;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #d8d3d3;
    border: 1px solid #d8d3d3;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
