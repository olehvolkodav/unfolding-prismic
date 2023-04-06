import React from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Caption, Text } from "components/atoms/Typography";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Section } from "components/atoms/Section";
import { compressSetting } from "utils/general";

const Partnering = ({ slice }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    variableWidth: true,
  };

  return (
    <Section bgColor={slice.primary.background_color} wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}>
      <ColWrapper>
        <Col1>
          <Title size="2.5" height="120" weight="800" id="headline">
            {RichText.asText(slice.primary.headline)}
          </Title>
          {!!slice.primary?.sub_headline && (
            <Text size="1.25" height="160">
              {RichText.asText(slice.primary.sub_headline)}
            </Text>
          )}
          {(!!slice.primary?.source_name || !!slice.primary?.source_title) && (
            <CaptionWrapper>
              <Caption size="1.5" height="133" weight="800" id="name">
                {RichText.asText(slice.primary.source_name)}
              </Caption>
              <Caption size="1.5" height="150" id="title">
                {RichText.asText(slice.primary.source_title)}
              </Caption>
            </CaptionWrapper>
          )}
        </Col1>
        <Col2>
          <MediaImg src={slice.primary.media_right.url} />
        </Col2>
      </ColWrapper>
      <BrandWrapperDesktop>
        {slice.items.map((item, index) => (
          <BrandImage key={`bdsk-${index}`} src={compressSetting(item.logo.url, item.logo.dimensions.width)} />
        ))}
      </BrandWrapperDesktop>
      <BrandWrapperMobile>
        <Slider {...settings}>
          {slice.items.map((item, index) => (
            <div className="brand-item" key={`brand-item-${index}`}>
              <BrandImage key={`bmbl-${index}`} src={compressSetting(item.logo.url, item.logo.dimensions.width)} />
            </div>
          ))}
        </Slider>
      </BrandWrapperMobile>
    </Section>
  );
};

export default Partnering;

const MediaImg = styled.img`
  width: 100%;
`;

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
  div#title-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    text-align: center;

    h3,
    h5 {
      margin: 0;
    }
    #headline {
      margin-bottom: 25px;
      padding: 0 16%;

      @media (max-width: 768px) {
        padding: 0;
        font-size: 1.5rem;
      }
    }
    span {
      line-height: 160%;
      color: #949494;
      font-weight: 100;

      @media (max-width: 768px) {
        font-size: 1rem;
      }
    }
  }
`;

const ColWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  align-items: center;

  * {
    box-sizing: border-box;
  }

  > div {
    margin-bottom: 1rem;
  }
`;

const Col1 = styled.div`
  text-align: left;
  h3,
  p {
    text-align: left;
  }
  @media (min-width: 768px) {
    padding-right: 3rem;
    flex-basis: 70%;
  }
`;

const Col2 = styled.div`
  @media (min-width: 768px) {
    padding-left: 3rem;
    flex-basis: 30%;
  }
  @media (max-width: 768px) {
    padding: 0 20%;
  }
`;

const CaptionWrapper = styled.div`
  display: flex;
  flex-direction: row !important;
  align-items: center;
  margin-top: 0;

  h5 {
    margin-top: 1rem;
  }
  #name {
    margin-right: 20px !important;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  #title {
    color: #969595;
    font-weight: 100;

    @media (max-width: 768px) {
      font-size: 0.8rem;
    }
  }
`;

const BrandWrapperDesktop = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media (max-width: 767px) {
    display: none;
  }
`;

const BrandImage = styled.img`
  width: auto;
  max-height: 90px;
  padding: 0 1rem;
  @media (min-width: 900px) {
    max-height: 120px;
  }
`;
const BrandWrapperMobile = styled.div`
  width: 95%;
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
  .slick-track {
    display: flex;
    align-items: center;
  }
  .brand-item {
    display: flex !important;
    align-items: center;
    justify-content: center;
  }
`;
