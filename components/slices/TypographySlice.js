import React from "react";
import styled, { css } from "styled-components";
import { Section } from "components/atoms/Section";
import { RichText } from "prismic-reactjs";
import { htmlSerializer } from "utils/htmlSerializer";

const TypographySlice = ({ slice, documents, projects }) => {
  return (
    <Section bgColor={slice.primary.background_color} wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}>
      <Content contentAlignment={slice.primary.content_alignment}>
        <RichText
          render={slice.primary.text}
          htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
        />
      </Content>
    </Section>
  );
};

export default TypographySlice;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: ${({ contentAlignment }) => contentAlignment};
  align-items: ${({ contentAlignment }) => contentAlignment === "left" ? "flex-start" : contentAlignment === "right" ? "flex-end" : "center"};
  width: 100%;
  img {
    width: 100%;
  }
  & > div {
    width: 100%;
  }
`;

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem 1rem;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
