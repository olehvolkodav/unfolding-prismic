import React from "react";
import styled, { css } from "styled-components";
import { Title, Caption, Text } from "components/atoms/Typography";
import ProgressBar from "components/ProgressBar";
import { Section } from "components/atoms/Section";
import { ProjectGoals } from "./ProjectGoals";

export default function DetailGoals({ data, progress_data, forwardRef }) {
  if (!!!progress_data || Object.keys(progress_data).length === 0)
    return <Section wrapperCss={wrapperCss} forwardRef={forwardRef} />;

  return (
    <Section narrow={true} wrapperCss={wrapperCss} forwardRef={forwardRef}>
      <TitleWrapper>
        <TopTitle>Goals & Progress</TopTitle>
        <Title size="3">SCRIPTURE for 1,000+ PEOPLE GROUPS</Title>
        <SectionDescription>
          <Caption size="1.2" color="#000">
            Partners need your help as they mobilize, train and equip local
            church members to reach the unreached.
          </Caption>
        </SectionDescription>
      </TitleWrapper>
      <ProgressWrapper>
        <Title size="1.5" color="#fff">
          Progress
        </Title>
        <ProgressContentWrapper>
          <ProgressBar percent={40} bgColor="#fff" progressColor="#1fa6da" inverse={true} label="Project Goals" />
          <Text id="progress-description" color="white">
            {data.data.project_progress_complete}% of {"GATEWAY LANGUAGE WORK"}
          </Text>
        </ProgressContentWrapper>
        <ProgressContentWrapper>
          <ProgressBar percent={40} bgColor="#fff" progressColor="#1fa6da" inverse={true} label="Funding Goals"/>
          <Text id="progress-description" color="white">
            {Number(data.data.project_funding_complete)
              .toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
              .slice(0, -3)}{" "}
            of{" "}
            {Number(data.data.project_funding_goal)
              .toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })
              .slice(0, -3)}{" "}
            Raised
          </Text>
        </ProgressContentWrapper>
      </ProgressWrapper>
      <OverviewWrapper>
        <OverviewCol>
          <OverviewTitle>Content</OverviewTitle>
          <OverviewDesc>
            Open-licensed Bible translation resources empower the global church.
          </OverviewDesc>
        </OverviewCol>
        <OverviewCol>
          <OverviewTitle>Tools</OverviewTitle>
          <OverviewDesc>
            Software equips church networks to execute our Gateway Languages
            Strategy.
          </OverviewDesc>
        </OverviewCol>
        <OverviewCol>
          <OverviewTitle>Training</OverviewTitle>
          <OverviewDesc>
            Trained believers train others to do Church-Centric Bible
            Translation.
          </OverviewDesc>
        </OverviewCol>
      </OverviewWrapper>
      <ProjectGoals {...progress_data} />
    </Section>
  );
}

const wrapperCss = css`
  z-index: 1;
  box-sizing: border-box;
`;

const TitleWrapper = styled.div`
  text-align: center;
  h3 {
    margin-bottom: 8px;
  }
  h5 {
    font-weight: 100;
    margin-top: 2px;
  }
`;

const TopTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #949494;
  margin-bottom: 8px;
`;

const ProgressWrapper = styled.div`
  background: #00577d;
  border-radius: 6px;
  margin: 1rem 0;
  padding: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;

  > div {
    margin-top: 1rem;
  }

  h3 {
    margin: 0;
  }

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: auto auto auto;
    grid-gap: 1rem 1.5rem;

    > div {
      margin-top: 0;
    }
  }
`;
const ProgressContentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  #progress-description {
    text-transform: uppercase;
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    #progress-title {
      font-size: 1rem;
    }
    width: 100%;
  }
`;

const SectionDescription = styled.div`
  margin: 0 auto;
`;

const OverviewWrapper = styled.ul`
  list-style: none;
  margin: 1rem 0;
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const OverviewCol = styled.li`
  width: 100%;
  margin-bottom: 1rem;

  @media (min-width: 768px) {
    width: 30%;
  }
`;

const OverviewTitle = styled.h5`
  font-size: 1.4rem;
  font-weight: normal;
  margin: 0;
`;
const OverviewDesc = styled.p`
  font-color: #8e8e8e;
`;
