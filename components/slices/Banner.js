import React from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";

import { htmlSerializer } from "utils/htmlSerializer";
import { useClickLink } from "hooks";
import { HeadlineDiv } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";
import { getFlexDirectionFromAlignment } from "utils/general";

const Banner = ({ slice, documents, projects }) => {
  const { href, target } = useClickLink(slice.primary.button_link, "", true, projects);

  return (
    <Section
      bgImg={slice.primary.background_image}
      bgColor={slice.primary.background_color}
      maskColor={slice.primary.image_mask_color}
      maskOpacity={slice.primary.image_mask_opacity}
      wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}
    >
      <BannerContent
        alignContent={getFlexDirectionFromAlignment(slice.primary.align_content)}
        alignment={slice.primary.align_content}
      >
        <HeadlineDiv
          color={slice.primary.inverse_text_color ? "white" : "#231F20"}
          textAlign="center"
          isNonShadow={!!!slice.primary.inverse_text_color}
        >
          <RichText
            render={slice.primary.headline}
            htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents)}
          />
        </HeadlineDiv>
        <SubText
          invertTextColor={slice.primary.inverse_text_color}
        >
          <RichText
            render={slice.primary.sub_headline}
            htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents)}
          />
        </SubText>
        {
          !slice.primary.hide_button &&
          <ButtonWrapper
            alignContent={getFlexDirectionFromAlignment(slice.primary.align_content)}
          >
            <Button href={href} target={target}>{slice.primary.button_text.length > 0 ? slice.primary.button_text[0].text : "Give Now"}</Button>
          </ButtonWrapper>
        }
      </BannerContent>
    </Section>
  );
};

export default Banner;

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 1rem;
  box-sizing: border-box;
  -webkit-box-align: center;
  align-items: center;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
`;

const BannerContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 4rem 0px;
  z-index: 10;
  text-align: ${({ alignment }) => alignment};
  align-items: ${({ alignContent }) => alignContent};
  @media (min-width: 1025px) {
    -webkit-box-pack: center;
    justify-content: center;
    flex-direction: column;
    max-width: 60%;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: ${({ alignContent }) => alignContent};
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

const SubText = styled.div`
  text-align: center;
  margin-top: 0;
  margin-bottom: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  > * {
    color: ${({ invertTextColor }) => invertTextColor ? "white" : "#231F20"}};
    font-size: 1.5rem;
    font-weight: 400;
    text-shadow: ${({ invertTextColor }) => !invertTextColor ? "none" : "2px 2px 10px #00000075"}};
    line-height: 160%;
    padding: 0;
    margin: 0;
  }
`;