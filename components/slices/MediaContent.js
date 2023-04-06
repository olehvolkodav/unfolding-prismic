import React, { useRef, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";

import { htmlSerializer } from "utils/htmlSerializer";
import { getFlexDirectionFromAlignment } from "utils/general";
import { useClickLink } from "hooks";
import { TitleDiv } from "components/atoms/Typography";
import { Section } from "components/atoms/Section";
import { compressSetting } from "utils/general";

const Direction = {
  row: "Horizontal (row)",
  column: "Vertical (column)"
}
const ContentOrder = {
  mt: "Media > Text",
  tm: "Text > Media"
}

const MediaContent = ({ slice, documents, projects }) => {
  const vidRef = useRef(null);
  const sectionRef = useRef(null)
  const textContentRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [maxImageWidth, setMaxImageWidth] = useState(-1);
  const { href: href1, target: target1 } = useClickLink(slice.primary.button_link_1, "", false, projects);
  const { href: href2, target: target2 } = useClickLink(slice.primary.button_link_2, "", false, projects);
  const { href: href3, target: target3 } = useClickLink(slice.primary.button_link_3, "", false, projects);
  const { handleClickLink } = useClickLink();

  useEffect(() => {
    if (!sectionRef.current) return;
    setMaxImageWidth(sectionRef.current.clientWidth / 2);
  }, [sectionRef.current]);

  const onPlayVideo = () => {
    if (vidRef) {
      vidRef.current.play();
      setIsPlaying(true);
    }
  };

  const flexDirection = () => {
    if (slice.primary.direction === Direction.column) {
      if (slice.primary.content_order === ContentOrder.tm)
        return "column-reverse";
      return "column";
    }
    else {
      if (slice.primary.content_order === ContentOrder.tm)
        return "row-reverse";
      return "row"
    }
  }

  const alignItems = !!slice.primary.align_items && slice.primary.align_items === "Top" ? "flex-start" : "center"

  return (
    <Section
      bgColor={slice.primary.background_color}
      wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}
    >
      <ContentWrapper
        forwardRef={sectionRef}
        additionalCss={contentWrapperCss({ direction: flexDirection(), alignItems })}
      >
        <MediaContainer
          mediaProportion={slice.primary.horizontal_layout_media_proportion}
          isCenter={slice.primary.content_order === ContentOrder.tm}
          isFullWidthHeight={slice.primary.full_width_media_height}
          contentOrder={slice.primary.content_order}
          direction={flexDirection()}
        >
          {slice.primary.video_url.url ? (
            <>
              <video
                width="100%"
                height="100%"
                poster={slice.primary.placehoder_image.url}
                ref={vidRef}
                controls={isPlaying}
              >
                <source src={slice.primary.video_url.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              {!isPlaying && (
                <PlayButton src="/ufw-assets/images/play.png" onClick={onPlayVideo} />
              )}
            </>
          ) : (
            <MediaImgLink
              onClick={(e) => handleClickLink(e, slice.primary.image_hyperlink, "", false, projects)}
              isCursorPointer={slice.primary.image_hyperlink.url || slice.primary.image_hyperlink.uid}
            >
              <MediaImg
                direction={flexDirection()}
                isFullWidthHeight={slice.primary.full_width_media_height}
                fullHeight={textContentRef.current && textContentRef.current}
                src={compressSetting(slice.primary.image.url, slice.primary.image.dimensions.width)}
                maxImageHeight={slice.primary.image_maximum_height}
                maxImageWidth={maxImageWidth}
                dimensions={slice.primary.image.dimensions}
              />
            </MediaImgLink>
          )}
        </MediaContainer>
        <Content
          isFullWidthHeight={slice.primary.full_width_media_height}
          fontColor={slice.primary.font_color}
          mediaProportion={slice.primary.horizontal_layout_media_proportion}
          textAlignment={slice.primary.text_alignment}
          direction={flexDirection()}
          contentOrder={slice.primary.content_order}
          ref={textContentRef}
        >
          <TitleDiv
            size="2.5"
            weight="800"
            height="120"
            color={slice.primary.font_color}
          >
            <RichText
              render={slice.primary.headline}
              htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
            />
          </TitleDiv>
          <SubText>
            <RichText
              render={slice.primary.sub_headline}
              htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
            />
          </SubText>
          <ButtonWrapper
            additionalCss={buttonWrapperCss({ buttonAlignment: getFlexDirectionFromAlignment(slice.primary.button_alignment), btnBackgroundColor: slice.primary.button_background_color })}
          >
            {
              slice.primary.button_text_1.length > 0 && slice.primary.button_text_1[0].text &&
              <Button
                href={href1}
                target={target1}
                disabled={!slice.primary.button_link_1.url}
              >
                {
                  slice.primary.button_text_1[0].text
                }
              </Button>
            }
            {
              slice.primary.button_text_2.length > 0 && slice.primary.button_text_2[0].text &&
              <Button
                href={href2}
                target={target2}
                disabled={!slice.primary.button_link_2.url}
              >
                {
                  slice.primary.button_text_2[0].text
                }
              </Button>
            }
            {
              slice.primary.button_text_3.length > 0 && slice.primary.button_text_3[0].text &&
              <Button
                href={href3}
                target={target3}
                disabled={!slice.primary.button_link_3.url}
              >
                {
                  slice.primary.button_text_3[0].text
                }
              </Button>
            }
          </ButtonWrapper>
        </Content>
      </ContentWrapper>
    </Section>
  );
};

export default MediaContent;

const wrapperCss = ({isMobileHide}) => css`
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "block"};
  }
`;

const contentWrapperCss = ({ direction, alignItems }) => css`
  display: flex;
  flex-direction: ${direction.includes("-") ? "column-reverse" : "column"};
  @media (min-width: 1025px) {
    flex-direction: ${direction};
    align-items: center;
    justify-content: space-between;
    align-items: ${alignItems};
  }
`;

const buttonWrapperCss = ({ buttonAlignment, btnBackgroundColor }) => css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${buttonAlignment};
  @media (min-width: 1025px) {
    margin-top: 40px;
  }
  a {
    background-color: ${btnBackgroundColor ? btnBackgroundColor : "#F7BA0A"};
    white-space: nowrap;
    display: flex;
    justify-content: center;
  }
`;

const ContentWrapper = styled.div`
  ${props =>
    props.additionalCss &&
    props.additionalCss
  }
`;

const ButtonWrapper = styled.div`
  ${props =>
    props.additionalCss &&
    props.additionalCss
  }
`;

const Content = styled.div`
  margin-top: ${({ contentOrder }) => contentOrder === ContentOrder.mt ? "2rem" : "0"};
  @media (min-width: 1025px) {
    margin-top: ${({ direction }) => (direction === "column" ? "2rem" : "0")};
    width: ${({ mediaProportion, isFullWidthHeight }) => isFullWidthHeight ? "100%" : `calc(100% - ${mediaProportion} - 5%)`};
  }
  p, a, h3 {
    text-align: ${({ textAlignment }) => textAlignment};
  }
  p {
    color: ${({ fontColor }) => fontColor};
  }
  a {
    color: #014263;
  }

  h3 {
    margin-top: 0px;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }

  }

  h5 {
    line-height: 160%;
    font-weight: 400;
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;

const SubText = styled.div``

const MediaImgLink = styled.div`
  display: block;
  cursor: ${({ isCursorPointer }) => isCursorPointer ? "pointer" : "initial"};
`;

const MediaImg = styled.img`
  max-width: 100%;
  width: ${({ dimensions, maxImageHeight, isFullWidthHeight, direction }) => (isFullWidthHeight ? direction.includes("column") ? "calc(100vw - 2rem)" : "auto" : maxImageHeight ? `${maxImageHeight * dimensions.width / dimensions.height}px` : "100%")};
  height: ${({ maxImageWidth, dimensions, maxImageHeight, isFullWidthHeight, direction, fullHeight }) => (isFullWidthHeight ? direction.includes("column") ? "auto" : fullHeight : maxImageHeight ? maxImageWidth < maxImageHeight * dimensions.width / dimensions.height ? "auto" : `${maxImageHeight}px` : "100%")};
  box-shadow: ${({ isFullWidthHeight }) => isFullWidthHeight ? "none" : "10px 10px 100px 20px rgba(0, 0, 0, 0.2)"};
`;

const MediaContainer = styled.div`
  position: relative;
  pointer-events: ${({ isDisabled }) => (isDisabled ? "none" : "initial")};
  display: flex;
  justify-content: flex-end;
  margin-top: ${({ contentOrder }) => contentOrder === ContentOrder.tm ? "2rem" : "0"};
  @media (min-width: 1025px) {
    margin-top: ${({ direction }) => (direction === "column-reverse" ? "2rem" : "0")};
    width: ${({ mediaProportion, isFullWidthHeight }) => isFullWidthHeight ? "100%" : mediaProportion};
    ${({ isCenter }) => isCenter ? "display: flex; justify-content: center;" : ""};
  }
`;
const PlayButton = styled.img`
  border: none;
  outline: none;
  position: absolute;
  top: calc(50% - 40px);
  left: calc(50% - 40px);
  width: 80px;
  height: 80px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  opacity: 0.9;
  &:hover {
    opacity: 1;
  }

  @media (max-width: 500px) {
    width: 40px;
    height: 40px;
    top: calc(50% - 25px);
    left: calc(50% - 25px);
  }
`;

const Button = styled.a`
  font-size: 16px;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  padding: 14px 50px;
  color: white !important;
  border-radius: 5px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  margin-bottom: 20px;
  width: 200px;
  text-decoration: none;
  &:hover {
    opacity: 0.8;
  }
`;