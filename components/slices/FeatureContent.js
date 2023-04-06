import React, { useState, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";

import { Title, TitleDiv } from "components/atoms/Typography";
import { Image } from "components/atoms/Image";
import { Section } from "components/atoms/Section";

import { htmlSerializer } from "utils/htmlSerializer";
import { getClickLink, getFlexDirectionFromAlignment } from "utils/general";

import { useClickLink } from "hooks";

const SLOGAN = "THE CHURCH IN EVERY PEOPLE GROUP | THE BIBLE IN EVERY LANGUAGE";

const FeatureContent = ({ slice, documents, projects }) => {
  const contentOrder = useMemo(() => slice.primary.content_order.length > 0 && slice.primary.content_order[0].text ? slice.primary.content_order[0].text : "ITDB", [slice]);
  const featureWidth = useMemo(() => slice.primary.number_of_columns ? `${100 / slice.primary.number_of_columns}%` : "33%", [slice]);
  const [links, setLinks] = useState([]);
  const { handleClickLink } = useClickLink();

  useEffect(async () => {
    if (!slice || !projects) return;
    const localLinks = await Promise.all(slice.items.map(async ii => await getClickLink(ii.button_link, "", false, projects)));
    setLinks(localLinks);
  }, [slice, projects]);

  let headline = false;
  if (!!slice.primary.headline && RichText.asText(slice.primary.headline).length > 0) {
    if (RichText.asText(slice.primary.headline) === SLOGAN) {
      headline = (
        <Title size="2.5" height="120" weight="400" id="headline">
          THE <strong>CHURCH</strong> IN <strong>EVERY PEOPLE GROUP</strong>
          <br />
          THE <strong>BIBLE</strong> IN <strong>EVERY LANGUAGE</strong>
        </Title>
      );
    } else {
      headline = (
        <Title size="2.5" height="120" weight="800" id="headline" additionalCss={HeadlineCss}>
          {RichText.asText(slice.primary.headline)}
        </Title>
      );
    }
  }

  return (
    <Section bgColor={slice.primary.background_color} wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}>
      {!!headline && headline}
      {!!slice.primary.sub_headline && RichText.asText(slice.primary.sub_headline).length > 0 && (
        <SubHeadline>
          <RichText
            render={slice.primary.sub_headline}
            htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
          />
        </SubHeadline>
      )}
      <Features>
        {slice.items.map((ii, index) => (
          <FeatureItem
            key={`feature-item-${index}`}
            width={featureWidth}
            contentAlign={slice.primary.column_content_alignment}
            id={RichText.asText(ii.element_anchor_id)}
          >
            {
              Array.from(contentOrder).map(order => (
                order.toUpperCase() === "I" ?
                  !!ii.image.url &&
                  <FeatureImageLink
                    key={order}
                    isEnableLink={ii.image_link?.url || ii.image_link?.uid}
                  >
                    <Image source={ii.image} onClick={e => handleClickLink(e, ii.image_link, "", false, projects)} />
                  </FeatureImageLink> :
                  order.toUpperCase() === "T" ?
                    <TitleDiv key={order} size="1.5" height="133" weight="800" additionalCss={titleDivCss}>
                      <RichText
                        render={ii.image_title}
                        htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
                      />
                    </TitleDiv> :
                    order.toUpperCase() === "D" ?
                      <RichText
                        key={order}
                        render={ii.description}
                        htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
                      /> :
                      ii.button_display_text.length > 0 && ii.button_display_text[0].text &&
                      <LinkButtonWrapper
                        key={order}
                        buttonAlign={ii.button_alignment}
                        contentAlign={slice.primary.column_content_alignment}
                      >
                        <LinkButton
                          href={links[index]?.href}
                          target={links[index]?.target}
                          backgroundColor={ii.button_background_color}
                          disabled={!(ii.button_link.url && ii.button_link.uid)}
                        >
                          {RichText.asText(ii.button_display_text)}
                        </LinkButton>
                      </LinkButtonWrapper>

              ))
            }
          </FeatureItem>
        ))}
      </Features>
    </Section>
  );
};

export default FeatureContent;

const HeadlineCss = css`
  margin-bottom: 2rem;
`;

const titleDivCss = css`
  a {
    text-decoration: none;
    color: #231F20;
  }
`;

const FeatureImageLink = styled.div`
  display: block;
  margin: 1rem 0;
  img {
    cursor: ${({ isEnableLink }) => !isEnableLink ? "initial" : "pointer"};
  }
`

const SubHeadline = styled.div`
  text-align: center;
  margin-bottom: 1.5rem;
`

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: column;
  padding-top: 0px;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
  #headline {
    max-width: 85%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 2rem;
    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
`;

const Features = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    flex-wrap: wrap;
    margin-left: -2rem;
    margin-right: -2rem;
  }
`;

const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: ${({ width }) => width};
  align-items: ${({ contentAlign }) => getFlexDirectionFromAlignment(contentAlign)};
  margin-bottom: 2rem;
  box-sizing: border-box;
  span {
    font-size: 1rem !important;
    color: #919090 !important;
    font-weight: 150% !important;
    a {
      color: #014263;
    }
  }
  h3 {
    padding: 0;
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  img {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
  }

  @media (min-width: 1024px) {
    padding: 0 2rem;
    margin-bottom: 0;
  }
`;

const LinkButtonWrapper = styled.div`
  display: block;
  width: 100%;
  text-align: ${({ buttonAlign, contentAlign }) => buttonAlign === "let Column Content Alignment decide" ? contentAlign : buttonAlign};
`;

const LinkButton = styled.a`
  display: block;
  margin-bottom: 1rem;
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  padding: 14px 50px;
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : '#F7BA0A'};
  color: white;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;