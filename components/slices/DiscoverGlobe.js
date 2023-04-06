import React from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Text, Caption } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";
import { regionLinkResolver } from "utils/general";

const DiscoverGlobe = ({ slice, regions }) => {
  return (
    <Section
      bgColor={slice.primary.background_color}
      bgImg={slice.primary.globe_image}
      wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}
    >
      <Content>
        <Title size="3.5" weight="800" height="114">
          {RichText.asText(slice.primary.headline)}
        </Title>
        <Caption size="1.25" height="160">
          {RichText.asText(slice.primary.content)}
        </Caption>
        <MapsSection>
          {regions?.map((region, index) => (
            <a href={regionLinkResolver(region)} key={`link-${index}`}>
              <div key={index} className="map-item">
                <img src={region.data.icon.url} />
                <div>
                  <Caption color="black">
                    {RichText.asText(region.data.region_name)}
                  </Caption>
                  <Text color="#bdbdbd">
                    {RichText.asText(region.data.people_groups)}
                  </Text>
                </div>
              </div>
            </a>
          ))}
        </MapsSection>
      </Content>
    </Section>
  );
};

export default DiscoverGlobe;

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

const Content = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    text-align: center;
    margin-bottom: 0;
    padding: 0 70px;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }

  h5 {
    text-align: center;
    font-weight: 100;

    @media (max-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 1025px) {
      text-align: left;
    }
  }
`;

const MapsSection = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-gap: 30px 40px;
  padding-left: 232px;
  .map-item {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  @media (min-width: 768px) {
    width: 75%;
    margin-left: auto;
    margin-right: auto;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding-left: 0;
  }
  @media (max-width: 768px) {
    padding-left: 0;
  }

  h5 {
    margin: 0;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  span {
    margin: 0;
    text-align: left;
    line-height: 160%;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 10px;
      width: 72px;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
  }
`;
