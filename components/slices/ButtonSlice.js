import React from "react";
import styled from "styled-components";
import { useClickLink } from "hooks";

const ButtonSlice = ({ slice, projects }) => {
  const { href, target } = useClickLink(slice.primary.button_link, "", false, projects);

  return (
    <ContentWrapper
      pageBackgroundColor={slice.primary.page_background_color}
      margin={slice.primary.additional_vertical_margin}
      isMobileHide={slice.primary.hide_on_mobile}
    >
      <ButtonWrapper
        backgroundColor={slice.primary.button_background_color}
        href={href}
        target={target}
        disabled={!href}
      >
        {slice.primary.button_text.length > 0 && slice.primary.button_text[0].text}
      </ButtonWrapper>
    </ContentWrapper>
  );
}

export default ButtonSlice;

const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ margin }) => margin ? `${margin}px 0` : `20px 0`};
  background-color: ${({ pageBackgroundColor }) => pageBackgroundColor ? pageBackgroundColor : 'white'};
  @media (max-width: 576px) {
    display: ${({ isMobileHide }) => isMobileHide ? "none" : "flex"};
  }
`;

const ButtonWrapper = styled.a`
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  padding: 14px 50px;
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#F7BA0A'};
  color: white;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  ${({ disabled }) => disabled ? "pointer-events: none; cursor: default;" : ""};
  &:hover {
    opacity: 0.8;
  }
`;