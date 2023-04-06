import React from "react";
import { RichText } from "prismic-reactjs";
import { Text, Headline, SubHeadline } from "components/atoms/Typography";
import styled, { css } from "styled-components";
import Progress from "../../../ProgressBar";
import { Section } from "components/atoms/Section";

import { useClickLink } from "hooks";

const Banner = ({ data, projects }) => {
  const { href, target } = useClickLink(data.cta_url, "", true, projects);

  return (
    <Section
      bgImg={data.background_image}
      maskColor={data.image_mask_color}
      maskOpacity={data.image_mask_opacity}
      sectionCss={sectionCss}
      wrapperCss={wrapperCss}
    >
      <ContentWrapper>
        <ProjectName inverse={data.inverse_text_color}>
          {RichText.asText(data.project_name)}
        </ProjectName>
        <StyledHeadline isInverseColor={data.inverse_text_color}>
          {RichText.asText(data.banner_title)}
        </StyledHeadline>
        <StyledSubHeadline isInverseColor={data.inverse_text_color}>
          {RichText.asText(data.banner_sub_headline)}
        </StyledSubHeadline>
        {(typeof data.project_progress_complete !== "undefined" ||
          (!!data.project_funding_complete && !!data.project_funding_goal)) && (
            <ProgressWrapper>
              {typeof data.project_progress_complete !== "undefined" && (
                <ProgressContentWrapper>
                  <Progress
                    label="Project Progress"
                    percent={data.project_progress_complete}
                    bgColor="#fff"
                    progressColor="#00577d"
                    inverse={data.inverse_text_color}
                  />
                  <Text
                    id="progress-description"
                    color={data.inverse_text_color ? "white" : "#231F20"}
                  >
                    {data.project_progress_complete}% of Work Completed
                  </Text>
                </ProgressContentWrapper>
              )}
              {!!data.project_funding_complete && !!data.project_funding_goal && (
                <ProgressContentWrapper>
                  <Progress
                    label="Funding Progress"
                    percent={
                      (data.project_funding_complete * 100) /
                      data.project_funding_goal
                    }
                    bgColor="#fff"
                    progressColor="#00577d"
                    inverse={data.inverse_text_color}
                  />
                  <Text
                    id="progress-description"
                    color={data.inverse_text_color ? "white" : "#231F20"}
                  >
                    {Number(data.project_funding_complete)
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .slice(0, -3)}{" "}
                    Raised of{" "}
                    {Number(data.project_funding_goal)
                      .toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })
                      .slice(0, -3)}{" "}
                    Needed
                  </Text>
                </ProgressContentWrapper>
              )}
            </ProgressWrapper>
          )}
        <BannerNote
        >
          {data.project_banner_notes.length > 0 && data.project_banner_notes[0].text}
        </BannerNote>
        <ButtonWrapper>
          <Button href={href} target={target}>Give Now</Button>
        </ButtonWrapper>
      </ContentWrapper>
    </Section>
  );
};
export default Banner;

const sectionCss = css``;

const wrapperCss = css`
  align-items: flex-end;
`;

const ContentWrapper = styled.div`
  padding: 4rem 0;
  z-index: 10;
  @media (min-width: 1024px) {
    width: 40%;
  }

  h3 {
    text-align: left;
    margin-bottom: 20px;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
  span {
    max-width: 800px;
  }
`;

const ProgressWrapper = styled.div`
  background: #ababab78;
  border-radius: 6px;
  padding: 20px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 30px 30px;
  /* display: none; */
  @media (max-width: 425px) {
    grid-template-columns: auto;
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
  }
`;

const ButtonWrapper = styled.div``;

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

const ProjectName = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #000;
  margin-bottom: 1rem;
  text-transform: uppercase;
  text-shadow: ${({ inverse }) =>
    inverse ? "2px 2px 10px #00000075" : "none"};

  ${({ inverse }) =>
    inverse == true &&
    css`
      color: #fff;
    `}
`;

const StyledHeadline = styled(Headline)`
  color: ${({ isInverseColor }) => (isInverseColor ? "white" : "#231F20")};
  text-shadow: ${({ isInverseColor }) =>
    isInverseColor ? "2px 2px 10px #00000075" : "none"};
`;

const StyledSubHeadline = styled(SubHeadline)`
  color: ${({ isInverseColor }) => (isInverseColor ? "white" : "#231F20")};
  text-shadow: ${({ isInverseColor }) =>
    isInverseColor ? "2px 2px 10px #00000075" : "none"};
`;

const BannerNote = styled.p`
  color: white;
  font-weight: 600;
`;