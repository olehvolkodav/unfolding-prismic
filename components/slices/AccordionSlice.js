import React, { useState, useCallback, useEffect, useMemo, useRef } from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";
import { isEqual } from "lodash";

import { htmlSerializer } from "utils/htmlSerializer";

import { Section } from "components/atoms/Section";
import { Title } from "components/atoms/Typography";
import { Image } from "components/atoms/Image";

import { useWindowDimensions, useScrollPosition, useClickLink } from "hooks";

const getRowHeight = (rowCount) => {
  return 20 + 30.72 * rowCount;
};

const SectionWrapper = React.forwardRef((props, ref) => {
  return (
    <Section wrapperCss={props.wrapperCss} forwardRef={ref}>
      {props.children}
    </Section>
  )
});

const AccordionSlice = ({ slice, documents, projects }) => {
  const [isEntireListFold, setEntireListFold] = useState(true);
  const [isRowFolds, setRowFolds] = useState([]);
  const [maxRowCount, setMaxRowCount] = useState(3);
  const [curMaxRowHeight, setCurMaxRowHeight] = useState(-1);
  const [maxRowHeights, setMaxRowHeights] = useState([]);
  const [maxImageWidth, setMaxImageWidth] = useState(-1);
  const [scrollHeights, setScrollHeights] = useState([]);
  const [curScrollPos, setCurScrollPos] = useState(0);
  const [mobileTitleSize, setMobileTitleSize] = useState([]);
  const { height: screenHeight } = useWindowDimensions();
  const instanceRef = useRef();
  const itemsRef = useRef([]);
  const groupTitleRef = useRef(null);
  const descriptionsRef = useRef([]);
  const mobileTitlesRef = useRef([]);
  const rowBackgroundColor = useMemo(() => slice.primary.row_background_color ? slice.primary.row_background_color : "#7388a3", [slice]);
  const { handleClickLink } = useClickLink();

  useScrollPosition(({ prevPos, currPos }) => {
    setCurScrollPos(currPos);
  }, [])

  useEffect(() => {
    let value = -1;
    if (itemsRef.current[0]) {
      const widthSlice = slice.primary.maximum_image_width;
      const widthRef = itemsRef.current[0].offsetWidth / 3;
      value = !widthSlice ? widthRef : widthSlice < widthRef || !!!widthRef ? widthSlice : widthRef;
    }
    setMaxImageWidth(value);
  }, [itemsRef.current, slice]);

  useEffect(() => {
    setScrollHeights(descriptionsRef.current.map(item => item && item.scrollHeight));
  }, [descriptionsRef.current]);

  const handleToggleFold = useCallback((index) => {
    let states = [...isRowFolds];
    let heights = [...maxRowHeights];
    states[index] = !states[index];

    //when the user clicks "minimize" button, scroll to the top
    if (!states[index]) {
      const curRowPos = instanceRef.current.offsetTop + itemsRef.current[index].offsetTop;
      if (!(curRowPos >= (-1) * curScrollPos.y && curRowPos + itemsRef.current[index].clientHeight <= (-1) * (curScrollPos.y - screenHeight)))
        window.scrollTo(0, curRowPos);

      heights[index] = curMaxRowHeight;
      setMaxRowHeights(heights);
    }
    else {
      heights[index] = -1;
      setMaxRowHeights(heights);
    }

    setRowFolds(states);
  }, [isRowFolds, itemsRef.current, instanceRef.current, curScrollPos, screenHeight, maxRowHeights, curMaxRowHeight]);

  const handleToggleEntireList = useCallback(() => {
    if (!slice.primary.entire_list) return;

    setEntireListFold(state => !state);
  }, [slice]);

  useEffect(() => {
    const refs = [], foldStatus = [], rowCounts = [], rowHeights = [];

    let rowCount = maxRowCount;
    let rowHeight = -1;
    if (slice.primary.rows)
      rowCount = slice.primary.rows;
    rowHeight = getRowHeight(rowCount);

    slice.items.forEach(() => {
      foldStatus.push(false);
      rowCounts.push(rowCount);
      rowHeights.push(rowHeight);
      refs.push(null);
    });
    itemsRef.current = [...refs];
    descriptionsRef.current = [...refs];
    mobileTitlesRef.current = [...refs]
    setCurMaxRowHeight(rowHeight);
    setRowFolds(foldStatus);
    setMaxRowCount(rowCount);
    setMaxRowHeights(rowHeights);
  }, [slice]);

  useEffect(() => {
    slice.items.forEach((item, index) => {
      if (item.image_hyperlink.target) {
        const contentItem = document.getElementById(`content_item_${index}`);
        const descriptions = contentItem.getElementsByClassName("description-wrapper");
        for (let i = 0; i < descriptions.length; i++) {
          const links = descriptions[i].getElementsByTagName('a');
          for (let j = 0; j < links.length; j++) {
            if (links[j].getElementsByTagName('img').length > 0)
              links[j].setAttribute('target', '_blank');
          }
        }
      }
    })
  }, [slice]);

  //jumping to anchor element
  useEffect(() => {
    window.addEventListener('load', () => {
      const anchorId = location.hash.substring(1);
      let anchorIndex = -1;
      if(anchorId) {
        if(slice.primary.slice_anchor_id.length && anchorId === slice.primary.slice_anchor_id[0].text) {
          window.scrollTo(window.scrollX, instanceRef.current.offsetTop - 65);
        }
        else {
          anchorIndex = slice.items.findIndex(item => item.row_anchor_id[0]?.text === anchorId)
          let height = 25;
          if(anchorIndex >= 0) {
            for(let i = 0; i < anchorIndex; i++) {
              height += itemsRef.current[i].clientHeight + 40;
            }
            window.scrollTo(window.scrollX, instanceRef.current.offsetTop + height - 65);
          }
        }
      }
      const sizes = [];
      mobileTitlesRef.current.forEach((mt, index) => {
        if(!mt.clientWidth) return;
        if(slice.items[index].row_title[0].text.includes("unfoldingWord®"))
          sizes.push(mt.clientWidth / 9.5);
        else 
          sizes.push(15);
      })
      if(sizes.length)
        setMobileTitleSize(sizes);
      if(anchorIndex < 0 && (slice.primary.entire_list && !slice.primary.open_state))
        setEntireListFold(false);
    });
  }, [slice, curMaxRowHeight]);

  return (
    <SectionWrapper wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})} ref={instanceRef} id={slice.primary.slice_anchor_id?.length > 0 ? slice.primary.slice_anchor_id[0].text : ""}>
      {
        slice.primary.slice_title.length > 0 && slice.primary.slice_title[0].text &&
        <Title size="2.5" height="150" weight="800" additionalCss={sliceTitleCss}>
          {slice.primary.slice_title[0].text}
        </Title>
      }
      {
        slice.primary.description.length > 0 && slice.primary.description[0].text &&
        <Description>
          <RichText
            render={slice.primary.description}
            htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
          />
        </Description>
      }
      <Separator
        onClick={handleToggleEntireList}
      >
        {
          slice.primary.separator_line &&
          <Divider
            isEntireListFold={isEntireListFold}
          />
        }
        {
          slice.primary.group_title.length > 0 &&
          <Title size="1.5" height="150" weight="500" additionalCss={titleCss} ref={groupTitleRef}>
            {slice.primary.group_title[0].text}
          </Title>
        }
      </Separator>
      <Content marginTop={groupTitleRef?.current && groupTitleRef.current.clientHeight}>
        {
          slice.items.map((item, index) => (
            <ContentItem
              key={`${item.image.url}-${index}`}
              id={`content_item_${index}`}
              ref={el => itemsRef.current.length > index ? itemsRef.current[index] = el : itemsRef.current[index] = null}
              backgroundColor={rowBackgroundColor}
              isFold={isRowFolds.length > 0 && isRowFolds[index]}
              isEntireListFold={isEntireListFold}
              scrollHeight={scrollHeights[index] ? scrollHeights[index] : -1}
              maxRowHeight={maxRowHeights[index]}
            >
              {
                item.image && !isEqual(item.image, {}) &&
                <ImageLink
                  onClick={e => handleClickLink(e, item.image_hyperlink, "", false, projects)}
                  enableLink={item.image_hyperlink.url || item.image_hyperlink.uid}
                  maxRowCount={maxRowCount}
                  maxRowHeight={maxRowHeights[index]}
                  maxImgWidth={maxImageWidth}
                  ratio={item.image.dimensions ? item.image.dimensions.width / item.image.dimensions.height : 0}
                >
                  <Image source={item.image} key={`image-${index}`} />
                </ImageLink>
              }
              <LinkWrapper>
                {
                  item.image && !isEqual(item.image, {}) &&
                  <ImageLink
                    onClick={e => handleClickLink(e, item.image_hyperlink, "", false, projects)}
                    enableLink={item.image_hyperlink.url || item.image_hyperlink.uid}
                    maxRowCount={maxRowCount}
                    maxRowHeight={maxRowHeights[index]}
                    maxImgWidth={maxImageWidth}
                    ratio={item.image.dimensions ? item.image.dimensions.width / item.image.dimensions.height : 0}
                  >
                    <Image source={item.image} key={`image-${index}`} />
                  </ImageLink>
                }
                {
                  item.row_title.length > 0 && item.row_title[0].text &&
                  <Title 
                    height="150" 
                    weight="500" 
                    additionalCss={RowTitleMobileCss({fontSize: mobileTitleSize[index]})}
                    ref={el => mobileTitlesRef.current.length > index ? mobileTitlesRef.current[index] = el : mobileTitlesRef.current[index] = null}
                  >
                    {item.row_title[0].text}
                  </Title>
                }
              </LinkWrapper>
              <RichTextWrapper
                id={item.row_anchor_id.length > 0 ? item.row_anchor_id[0].text : ""}
                enableInvertColor={slice.primary.invert_text_color}
                ref={el => descriptionsRef.current.length > index ? descriptionsRef.current[index] = el : descriptionsRef.current[index] = null}
              >
                {
                  item.row_title.length > 0 && item.row_title[0].text &&
                  <Title size="1.25" height="150" weight="500" additionalCss={RowTitleCss}>
                    {item.row_title[0].text}
                  </Title>
                }
                <DescriptionWrapper
                  className="description-wrapper"
                  scrollHeight={scrollHeights[index] ? scrollHeights[index] : -1}
                  maxRowHeight={maxRowHeights[index]}
                  isFold={isRowFolds.length > 0 && isRowFolds[index]}
                >
                  <RichText
                    key={`rich-text-${index}`}
                    render={item.description}
                    htmlSerializer={(type, element, content, children, key) => htmlSerializer(type, element, content, children, key, documents, projects)}
                  />
                </DescriptionWrapper>
                <FoldButton
                  onClick={() => handleToggleFold(index)}
                  enableInvertColor={slice.primary.invert_text_color}
                  scrollHeight={scrollHeights[index] ? scrollHeights[index] : -1}
                  maxRowHeight={maxRowHeights[index]}
                >
                  {isRowFolds.length > index && isRowFolds[index] ? "[minimize]" : "[read more]"}
                </FoldButton>
              </RichTextWrapper>
            </ContentItem>
          ))
        }
      </Content>
    </SectionWrapper>
  );
}

export default AccordionSlice;

const ImageLink = styled.a`
  display: block;
  @media (max-width: 576px) {
    display: none;
  }
  img {
    max-width: ${({ maxImgWidth }) => maxImgWidth < 0 ? 'auto !important' : `${maxImgWidth}px !important`};
    max-height: ${({ maxRowHeight }) => maxRowHeight < 0 ? '100%' : `${maxRowHeight}px`};
    min-height: ${({ maxRowHeight, ratio, maxImgWidth }) => maxImgWidth >= 0 && (maxRowHeight * ratio) > maxImgWidth ? "auto" : `${maxRowHeight}px`};
    min-width: ${({ ratio, maxRowHeight, maxImgWidth }) => maxImgWidth >= 0 && (maxRowHeight * ratio) > maxImgWidth ? `${maxImgWidth}px` : "auto"};
    width: auto;
    height: auto;
    cursor: ${({ enableLink }) => enableLink ? "pointer" : "initial"};
  }
`;

const LinkWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  display: none;
  a {
    margin-right: 20px;
  }
  h3 {
    overflow-wrap: anywhere;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    hyphens: auto;
  }
  @media (max-width: 576px) {
    display: flex;
    a {
      display: block !important;
    }
  }
`;

const RowTitleMobileCss = ({fontSize}) => css`
  font-weight: 600;
  width: 100%;
  text-align: left;
  font-size: ${`${fontSize}px`} !important;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin: 0 0 50px 0;
  p, a {
    text-align: left;
    font-size: 2rem;
    font-weight: 400;
    color: black;
    line-height: 130%;
    text-align: left;
  }
  img {
    max-width: 100%;
  }
`;

const wrapperCss = ({isMobileHide}) => css`
  clear: both;
  padding: 0 50px;
  margin: 30px auto !important;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "block"};
  }
`;

const sliceTitleCss = css`
  color: black;
  text-transform: uppercase;
  margin: 20px 0;
  @media (max-width: 576px) {
    font-size: 2.5rem;
  }
`;

const titleCss = css`
  text-transform: uppercase;
  text-align: left;
  display: inline;
  background-color: white;
  max-width: 80%;
  word-break: break-word;
`;

const Separator = styled.div`
  position: relative;
  cursor: pointer;
  clear: both;
  &:hover div {
    visibility: visible;
  }
  &::after {
    position: absolute;
    content: "";
    top: 13px;
    right: -22px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: ${({ isEntireListFold }) => isEntireListFold ? '8px solid #cbb8b8' : 'none'};
    border-top: ${({ isEntireListFold }) => !isEntireListFold ? '8px solid #cbb8b8' : 'none'};
  }
`;

const Divider = styled.div`
  border-bottom: 2px solid #cbb8b8;
  width: 100%;
  margin-top: 1rem;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Content = styled.div`
  display: block;
  margin-top: ${({ marginTop }) => marginTop ? `${marginTop}px` : "20px"};
`;

const RowTitleCss = css`
  font-weight: 600;
  width: 100%;
  text-align: left;
  margin: 0;
  @media (max-width: 576px) {
    display: none;
  }
`;

const ContentItem = styled.div`
  position: relative;
  display: ${({ isEntireListFold }) => isEntireListFold ? 'flex' : 'none'};
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 15px;
  background: ${({ backgroundColor }) => backgroundColor};
  padding: 20px 80px 20px 20px;
  overflow: hidden;
  height: ${({ isFold, scrollHeight, maxRowHeight }) => scrollHeight < maxRowHeight ? '100%' : isFold ? '100%' : `${maxRowHeight}px`};

  @media (max-width: 576px) {
    display: ${({ isEntireListFold }) => isEntireListFold ? 'block' : 'none'};
    padding-right: 20px;
    height: 100%;
  }
  img {
    max-width: 100%;
  }
`;

const DescriptionWrapper = styled.div`
  overflow: hidden;
  margin: 0;
  width: 100%;
  height: ${({ isFold, maxRowHeight, scrollHeight }) => isFold ? '100%' : maxRowHeight < scrollHeight ? `${maxRowHeight - 30}px` : '100%'};
`;

const RichTextWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  margin-left: 20px;
  text-align: left;
  filter: ${({ enableInvertColor }) => enableInvertColor ? 'invert(1)' : 'initial'};
  @media(max-width: 576px) {
    margin-left: 0px;
  }
`;

const FoldButton = styled.a`
  position: absolute;
  display: ${({ maxRowHeight, scrollHeight }) => maxRowHeight < scrollHeight - 10 ? 'block' : 'none'};
  color: #873881;
  font-size: 1rem;
  bottom: ${({ enableInvertColor }) => enableInvertColor ? '17px' : '7px'};
  right: ${({ enableInvertColor }) => enableInvertColor ? '-74px' : '10px'};
  cursor: pointer;
  @media(max-width: 768px) {
    bottom: ${({ enableInvertColor }) => enableInvertColor ? '-19px' : '2px'};
  }
  @media(max-width: 576px) {
    bottom: ${({ enableInvertColor }) => enableInvertColor ? '-19px' : '2px'};
    right: ${({ enableInvertColor }) => enableInvertColor ? '-10px' : '10px'};
  }
`;