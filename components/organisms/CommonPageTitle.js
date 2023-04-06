import React, { useMemo } from "react";
import { css } from "styled-components";
import { Title, Paragraph } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";

export default function PageTitle({ data }) {
  const isExistParagraph = useMemo(() => {
    return data.primary.copy.length > 0 && data.primary.copy[0].text;
  }, [data]);

  return (
    <Section
      bgImg={data.primary.background_image}
      bgColor={data.primary.background_color}
      wrapperCss={wrapperCss({isMobileHide: data.primary.hide_on_mobile})}
    >
      <Title size="2.5" height="150" weight="800" color={data.primary.text_color} additionalCss={titleCss({ isExistParagraph })}>
        {data.primary.headline.length > 0 && data.primary.headline[0].text}
      </Title>
      {
        isExistParagraph &&
        <>
          {
            data.primary.copy.map((copy, index) =>
              !!copy.text &&
              <Paragraph key={`para-${index}`} size="2" weight={500} color={data.primary.text_color}>
                {copy.text}
              </Paragraph>
            )
          }
        </>
      }
    </Section>
  );
}

const wrapperCss = ({isMobileHide}) => css`
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
  p {
    text-align: center;
    margin-bottom: 0px;
  }
`;

const titleCss = ({ isExistParagraph }) => css`
  margin-bottom: ${isExistParagraph ? "20px" : "0px"};
`;