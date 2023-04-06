import React from "react";
import { Section } from "components/atoms/Section";
import styled, { css } from "styled-components";

const IframeEmbed = ({ slice }) => {
  return (
    <Section bgColor={slice.primary.background_color} wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}>
      <Content>
        <div
          dangerouslySetInnerHTML={{
            __html: slice.primary.iframe_script[0]?.text,
          }}
        />
      </Content>
    </Section>
  );
};

export default IframeEmbed;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  & > div {
    width: 100%;
  }
`;

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;
