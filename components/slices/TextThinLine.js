import React from "react";
import styled, { css } from "styled-components";
import { Section } from "components/atoms/Section";
import { RichText } from "prismic-reactjs";
import { htmlSerializer } from "utils/htmlSerializer";
import { getFlexDirectionFromAlignment } from "utils/general";

const TextThinLine = ({ slice, documents, projects }) => {
  return (
    <Section
      bgColor={slice.primary.background_color ? slice.primary.background_color : 'white'}
      wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}
    >
      <TextWrapper padding={slice.primary.additional_vertical_margin} alignment={slice.primary.alignment}>
        <RichText
          render={slice.primary.text}
          htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
        />
      </TextWrapper>
    </Section>
  )
}

export default TextThinLine;

const wrapperCss = ({isMobileHide}) => css`
  padding: 0px;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "block"};
  }
  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

const TextWrapper = styled.div`
  font-size: 1rem;
  line-height: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: ${({ alignment }) => getFlexDirectionFromAlignment(alignment)};
  text-align: ${({ alignment }) => alignment};
  padding: ${({ padding }) => padding ? `${padding}px 1rem` : '10px 1rem'};
  width: calc(100% - 2rem);
  p {
    margin: 0;
  }
  img {
    max-width: 100%;
  }
`;
