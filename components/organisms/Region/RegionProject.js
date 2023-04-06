import React from "react";
import styled, { css } from "styled-components";
import { Title, Caption, Text } from "components/atoms/Typography";
import ProgressBar from "components/ProgressBar";
import { RichText, Link } from "prismic-reactjs";
import { compressSetting, projectLinkResolver } from "utils/general";
import { Section } from "components/atoms/Section";

export default function RegionProject({ data, regionData, regionUid }) {
  const language =
    !!regionData?.language && regionData.language.length !== 0
      ? regionData.language
      : regionData.region_name;

  if (!data.length > 0) return <></>;

  return (
    <Section wrapperCss={sectionCss}>
      {RichText.asText(regionData.region_name) !== "Worldwide" ? (
        <ExploreTitle>
          Explore Projects from {RichText.asText(language)}
        </ExploreTitle>
      ) : (
        <ExploreTitle>Explore Projects with Worldwide Impact</ExploreTitle>
      )}
      <ProjectsWrapper>
        {data?.map((item, index) => (
          <ProjectWrapper key={index}>
            <Project>
              <a className="project-title" href={projectLinkResolver(item)}>
                <ProjectImg src={compressSetting(item.data.background_image.url, item.data.background_image?.dimensions.width)} />
                <ProjectTitle>
                  {RichText.asText(item.data.project_name)}
                </ProjectTitle>
              </a>
              <Caption size="1" color="#8e8e8e">
                {RichText.asText(item.data.description)}
              </Caption>
              {RichText.asText(regionData.region_name) !== "Worldwide" && (
                <ProcessWrapper>
                  <ProgressBar
                    progressColor="#00577d"
                    bgColor="#d2d2d2"
                    inverse={false}
                    percent={Number(item.data.project_progress_complete)}
                  />
                  <Text
                    id="progress-description"
                    color="#231F20"
                  >
                    {item.data.project_progress_complete}% of Work Completed
                  </Text>
                  <div className="fund-label">
                    <Text size="0.75" weight="800" className="fund-label">
                      {!!item.data.project_progress_notes.length &&
                        RichText.asText(item.data.project_progress_notes)}
                    </Text>
                  </div>
                </ProcessWrapper>
              )}
              <LinkText href={projectLinkResolver(item)}>Learn More</LinkText>
            </Project>
          </ProjectWrapper>
        ))}
      </ProjectsWrapper>
    </Section>
  );
}

const ProjectImg = styled.img`
  width: 100%;
  border-radius: 5px;
`;

const ExploreTitle = styled.h4`
  font-size: 1.3rem;
  text-align: center;
`;

const sectionCss = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: 0;
  .title {
    margin: 0;
  }
`;
const ProjectsWrapper = styled.div`
  margin: 0 auto;
  padding: 40px;
  padding-top: 0;
  display: grid;
  grid-template-columns: auto auto auto;
  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    row-gap: 1rem;
  }
`;

const ProjectWrapper = styled.div`
  margin: 0 1rem;
  max-width: 350px;
  min-width: 350px;
  @media (max-width: 768px) {
    min-width: auto;
    margin: 0;
  }
`;
const Project = styled.div`
  border-radius: 5px;
  background: #f2f2f2;
  padding: 1rem;
  .project-title {
    color: #000;
    text-decoration: none;
    &:hover {
      color: #014263;
    }
  }

  h5 {
    text-align: left;
    font-weight: 100;
    margin-bottom: 0;
  }
`;

const ProjectTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin: 0.5rem 0 10px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const ProcessWrapper = styled.div`
  margin: 20px 0;
  .fund-label {
    margin-top: 11px;
  }
`;

const LinkText = styled.a`
  font-size: 14px;
  color: #0c74b1;
  text-transform: uppercase;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #0171a7;
  }
`;
