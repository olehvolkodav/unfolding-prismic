import React from "react";
import styled, { css } from "styled-components";
import { Title, Caption, Text } from "components/atoms/Typography";
import { RichText } from "prismic-reactjs";
import { htmlSerializer } from "utils/htmlSerializer";
import { Section } from "components/atoms/Section";

export default function Overview({ data, forwardRef }) {
  return (
    <Section wrapperCss={wrapperCss} forwardRef={forwardRef}>
      <ContentWrapper>
        <Title size="1.5" weight="500" color="#a2a2a2">
          Overview
        </Title>
        <Title size="2.5" weight="800">
          {RichText.asText(data.overview_headline)}
        </Title>
        <RichText
          render={data.overview_content}
          htmlSerializer={htmlSerializer}
        />
        {!!data.statistics_data && data.statistics_data.length > 0 && (
          <PopulationWrapper>
            {data.statistics_data.map((statistics, index) => (
              <PopulationInfoWrapper key={`stats-${index}`}>
                <Caption size="1.3" color="#a2a2a2" weight="500">
                  {RichText.asText(statistics.label)}
                </Caption>
                <Title size="2" weight="600">
                  {RichText.asText(statistics.value)}
                </Title>
              </PopulationInfoWrapper>
            ))}
          </PopulationWrapper>
        )}
        <CountryImpactedWrapper>
          <Text size="0.8" id="country-impacted-title">
            Countries Impacted
          </Text>
          <Text size="1" color="#616161">
            {RichText.asText(data.countries_impacted)}
          </Text>
        </CountryImpactedWrapper>
      </ContentWrapper>
      <OverviewMediaWrapper>
        <OverviewImage src={data.overview_image.url} />
      </OverviewMediaWrapper>
    </Section>
  );
}

const wrapperCss = css`
  display: flex;
  flex-direction: column;

  @media (min-width: 1025px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  h3 {
    text-align: left;
  }

  @media (min-width: 1025px) {
    width: 50%;
    padding-right: 50px;
  }
  a {
    color: #014263;
  }
`;

const OverviewMediaWrapper = styled.div`
  text-align: center;
  margin-top: 40px;

  @media (min-width: 1025px) {
    width: 50%;
    margin-top: 0px;
    text-align: right;
  }
`;

const OverviewImage = styled.img`
  max-width: 600px;
  width: 100%;
  @media (min-width: 1025px) {
    width: 600px;
  }
  @media (max-width: 425px) {
    width: calc(100% - 10px);
  }
`;

const PopulationWrapper = styled.div`
  margin-top: 1rem;

  @media (min-width: 426px) {
    display: block;
  }

  @media (min-width: 1025px) {
    display: grid;
    grid-template-columns: auto auto;
  }
`;

const PopulationInfoRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const PopulationInfoWrapper = styled.div`
  margin-bottom: 30px;

  h3,
  h5 {
    text-align: left;
    margin: 0;
  }
  h5 {
    margin-bottom: 5px;
  }
`;

const CountryImpactedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  #country-impacted-title {
    margin-bottom: 5px;
    text-transform: uppercase;
  }
`;

// const ButtonWrapper = styled.div``;

// const Button = styled.button`
//   margin-top: 50px;
//   border-radius: 5px;
//   background: #014263;
//   border: 1px solid #014263;
//   color: #fff;
//   padding: 15px 30px;
//   font-size: 18px;
//   font-weight: bold;
//   cursor: pointer;

//   &:hover {
//     background-color: #1574a5;
//     border: 1px solid #1574a5;
//   }

//   @media (max-width: 768px) {
//     font-size: 14px;
//   }
// `;
