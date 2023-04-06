import React from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Caption } from "components/atoms/Typography";

export default function RegionWorldOverview({ slice }) {
  const data = slice?.primary;

  return (
    <SectionWrapper>
      <AreaImageWrapper>
        <AreaImage
          src={data?.map_image?.url}
          dimensions={data?.map_image?.dimensions}
        />
      </AreaImageWrapper>
      <PopulationWrapper>
        <PopulationInfoWrapper>
          <Caption size="1.5" color="#8e8e8e">
            Largest Religion
          </Caption>
          <Title size="3">{data?.largest_religion[0]?.text}</Title>
        </PopulationInfoWrapper>
        <PopulationInfoWrapper>
          <Caption size="1.5" color="#8e8e8e">
            Population
          </Caption>
          <Title size="3">{data?.population[0]?.text}</Title>
        </PopulationInfoWrapper>
        <PopulationInfoWrapper>
          <Caption size="1.5" color="#8e8e8e">
            People Groups
          </Caption>
          <Title size="3">{data?.people_groups[0]?.text}</Title>
        </PopulationInfoWrapper>
        <PopulationInfoRow>
          <PopulationInfoWrapper>
            <Caption size="1.5" color="#8e8e8e">
              Christian
            </Caption>
            <Title size="3">{data?.christian[0]?.text}</Title>
          </PopulationInfoWrapper>
          <PopulationInfoWrapper>
            <Caption size="1.5" color="#8e8e8e">
              Evangelical
            </Caption>
            <Title size="3">{data?.evangelical[0]?.text}</Title>
          </PopulationInfoWrapper>
        </PopulationInfoRow>
        <PopulationInfoWrapper>
          <Caption size="1.5" color="#8e8e8e">
            Rate of Evangelical Growth
          </Caption>
          <Title size="3">{data?.rate_growth[0]?.text}</Title>
        </PopulationInfoWrapper>
      </PopulationWrapper>
    </SectionWrapper>
  );
}

const SectionWrapper = styled.div`
  max-width: 1200px;
  display: flex;
  margin: 0 auto;
  padding: 40px;
  flex-direction: column;

  @media (min-width: 1025px) {
    width: 1200px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const AreaImageWrapper = styled.div`
  @media (min-width: 1025px) {
    width: 60%;
  }
`;

const AreaImage = styled.img`
  width: ${({ dimensions }) => dimensions.width + "px"};

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const PopulationWrapper = styled.div`
  margin-top: 50px;

  @media (min-width: 426px) {
    display: grid;
    grid-template-columns: auto auto;
    grid-gap: 20px 40px;
  }

  @media (min-width: 1025px) {
    width: 40%;
    margin-top: 0;
    display: block;
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
