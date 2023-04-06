import React from "react";
import styled, { css } from "styled-components";
import { Title, Caption, Text } from "components/atoms/Typography";
import { RichText } from "prismic-reactjs";
import { Section } from "components/atoms/Section";

export default function PageTitle({ data, isProject }) {
  return (
    <Section narrow={true} wrapperCss={wrapperCss}>
      <TitleWrapper>
        <a href={`/`}>
          <PathText size="1.2" id="pathItem">
            Home
          </PathText>
        </a>
        <Text size="1.2" color={"#000"}>
          {` > `}
        </Text>
        {!isProject && (
          <PathText size="1.2" id="pathItem" isLast>
            {RichText.asText(data.region_name)}
          </PathText>
        )}
        {isProject && (
          <>
            <a href={`/projects/${data.region.uid}`}>
              <PathText size="1.2" id="pathItem">
                {RichText.asText(data.region.data.region_name)}
              </PathText>
            </a>
            <Text size="1.2" color={"#000"}>
              {` > `}
            </Text>
            <PathText size="1.2" id="pathItem" isLast>
              {RichText.asText(data.project_name)}
            </PathText>
          </>
        )}
        <Title size="3">{RichText.asText(data.page_title_headline)}</Title>
        <Caption marginBottom="0" size="1.2" color="#000">
          {RichText.asText(data.page_title_sub_headline)}
        </Caption>
      </TitleWrapper>
    </Section>
  );
}

const wrapperCss = css`
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
`;

const TitleWrapper = styled.div`
  text-align: center;
  h3 {
    margin-bottom: 5px;
    margin-top: 20px;
  }
  h5 {
    font-weight: 100;
    margin-top: 0;
  }
`;
const PathText = styled(Text)`
  color: ${({ isLast }) => (!isLast ? "#0076FF" : "#a4a2a2")} !important;
  text-decoration-line: ${({ isLast }) => (!isLast ? "underline" : "none")};
  cursor: ${({ isLast }) => (!isLast ? "pointer" : "default")};
`;
