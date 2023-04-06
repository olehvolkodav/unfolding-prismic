import React, { useState, useCallback, useEffect, useMemo } from "react";
import styled, { css } from "styled-components";
import moment from "moment";
import { Title, Text, Caption } from "components/atoms/Typography";
import { RichText } from "prismic-reactjs";
import { Section } from "components/atoms/Section";

export default function RegionUpdate({
  data,
  latestStory = null,
  language,
  pageType,
  limitCount,
  isPrayerRequestsList,
  forwardRef,
}) {
  const [sortedData, setSortedData] = useState([]);
  const [updateData, setUpdateData] = useState([]);
  const [isSeeMore, setIsSeeMore] = useState(false);
  const limitInitialVisibleCount = useMemo(() => limitCount ? limitCount : 3, [limitCount]);

  const onShowAll = useCallback((index) => {
    const newState = [...updateData];
    newState[index].showAll = !Boolean(newState[index].showAll);
    setUpdateData(newState);
  }, [updateData]);

  const handleSeeMore = useCallback(() => {
    const moreState = !isSeeMore;
    if (moreState)
      setUpdateData(sortedData);
    else
      setUpdateData(sortedData.slice(0, limitInitialVisibleCount));
    setIsSeeMore(moreState);
  }, [isSeeMore, sortedData, limitInitialVisibleCount]);

  useEffect(() => {
    const buffer = [...data];
    buffer.sort(
      (a, b) =>
        new Date(b.data.created_date ?? b.last_publication_date) -
        new Date(a.data.created_date ?? a.last_publication_date)
    );
    setSortedData(buffer);
    setUpdateData(buffer.slice(0, limitInitialVisibleCount));
    setIsSeeMore(false);
  }, [data, limitInitialVisibleCount]);

  if (!data || data.length === 0) return <></>;

  return (
    <>
      {
        !isPrayerRequestsList &&
        <Section
          narrow={false}
          wrapperCss={wrapperCssStories}
          forwardRef={forwardRef}
        >
          <TitleWrapper>
            <TopTitle>Updates</TopTitle>
            <Title size="3">From the Field</Title>
            <SectionDescription>
              <Caption size="1.2" color="#000">
                The latest from field partners in {RichText.asText(language)}
              </Caption>
            </SectionDescription>
          </TitleWrapper>
          {pageType === "detail" && latestStory && (
            <OverviewWrapper>
              <ContentWrapper>
                <Title size="2.5" weight="800" additionalCss={storyTitleCss}>
                  {RichText.asText(latestStory.data.title)}
                </Title>
                <Text size="1.2" height="160">
                  {RichText.asText(latestStory.data.content).length > 250
                    ? RichText.asText(latestStory.data.content).slice(0, 250) +
                    " ... "
                    : RichText.asText(latestStory.data.content)}
                </Text>
                <ButtonWrapper>
                  <Button href={`/stories/${latestStory.uid}`}>Read More</Button>
                </ButtonWrapper>
              </ContentWrapper>
              <OverviewMediaWrapper>
                <OverviewImage src={latestStory.data.overview_image.url} />
              </OverviewMediaWrapper>
            </OverviewWrapper>
          )}
        </Section>
      }
      <Section narrow={true} wrapperCss={wrapperCssUpdates({ isPrayerRequestsList })}>
        <CardsWrapper>
          {updateData.map((item, index) => (
            <Card key={index}>
              <CardImageWrapper>
                <CardImage />
              </CardImageWrapper>
              <CardContent>
                <CardTitle>{RichText.asText(item.data.title)}</CardTitle>
                <Text size="1" color="#8e8e8e">
                  {RichText.asText(item.data.description).length > 250 &&
                    !Boolean(item.showAll)
                    ? RichText.asText(item.data.description).slice(0, 250) +
                    "..."
                    : RichText.asText(item.data.description)}
                </Text>
                {RichText.asText(item.data.description).length > 250 && (
                  <a onClick={() => onShowAll(index)} className="see-all-btn">
                    {!Boolean(item.showAll) ? `See More` : "See Less"}
                  </a>
                )}
                <CardDateWrapper>
                  {!!!item.data.hide_created_date && (
                    <CardDate>
                      <Caption size="1" color="#000">
                        {moment(
                          item.data.created_date ?? item.last_publication_date
                        ).format("MMMM DD, YYYY")}
                      </Caption>
                    </CardDate>
                  )}
                  <Region href={`/projects/${item.region_url}`}>
                    {item.region_name}
                  </Region>
                  <Region
                    href={`/projects/${item.region_url}/${item.project_url}`}
                  >
                    {item.project_name}
                  </Region>
                </CardDateWrapper>
              </CardContent>
            </Card>
          ))}
          {
            data && data.length > limitInitialVisibleCount && !(isSeeMore && isPrayerRequestsList) &&
            <div className="see-more-area">
              <a className="see-all-btn" onClick={handleSeeMore}>
                {!isSeeMore ? isPrayerRequestsList ? "See more prayer requests" : "See more updates like this" : "See Less"}
              </a>
            </div>
          }
        </CardsWrapper>
      </Section>
    </>
  );
}

const wrapperCssStories = css``;

const wrapperCssUpdates = ({ isPrayerRequestsList }) => css`
  ${!isPrayerRequestsList && "padding-top: 0;"};
`;

const storyTitleCss = css`
  text-align: left;
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 1rem;

  h3 {
    margin-bottom: 0.5rem;
  }
  h5 {
    font-weight: normal;
    margin-top: 0;
  }
`;

const TopTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: #949494;
  margin-bottom: 8px;
`;

const SectionDescription = styled.div`
  max-width: 700px;
  margin: 0 auto;
`;

const CardsWrapper = styled.div`
  .see-all-btn {
    color: #014263;
    margin-left: 8px;
    text-decoration: underline;
    cursor: pointer;
  }
  .see-more-area {
    margin-left: 30px;
  }
`;

const Card = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  border-radius: 6px;
  margin-bottom: 2rem;

  h5 {
    text-align: left;
    font-weight: 100;
    margin-bottom: 0;
  }
`;

const CardImageWrapper = styled.div`
  display: none;
  @media (min-width: 768px) {
    display: block;
  }
`;

const CardImage = styled.div`
  @media (min-width: 768px) {
    height: 90px;
    width: 90px;
    border-radius: 5px;
    margin-right: 30px;
    margin-bottom: 30px;
    background: #1fa6da;
    background-image: url("/ufw-assets/images/icons/pray.png");
    background-repeat: no-repeat;
    background-position: center;
  }
`;

const CardContent = styled.div`
  h5 {
    margin-top: 0;
    font-weight: 100;
  }
  @media (min-width: 768px) {
    // width: calc(100% - 130px);
  }
`;

const CardTitle = styled.div`
  font-weight: 600;
  font-size: 1.4rem;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const CardDateWrapper = styled.div`
  margin-top: 10px;
  display: flex;
`;

const CardDate = styled.div`
  margin-right: 40px;
`;

const Region = styled.a`
  padding: 5px 10px;
  border-radius: 6px;
  background: #1fa6da;
  color: #fff;
  font-size: 13px;
  height: fit-content;
  margin-right: 10px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const OverviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 4rem;
  @media (min-width: 1025px) {
    flex-direction: row;
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  h3 {
    margin-bottom: 8px;
  }
  @media (min-width: 1025px) {
    width: 50%;
    padding-right: 50px;

    h3 {
      text-align: left;
    }
  }
`;

const OverviewMediaWrapper = styled.div`
  text-align: right;
  margin-top: 40px;

  @media (min-width: 1025px) {
    width: 50%;
    margin-top: 0px;
  }
  @media (max-width: 425px) {
    text-align: center;
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

const ButtonWrapper = styled.div`
  margin-top: 28px;
`;

const Button = styled.a`
  border-radius: 5px;
  background: #014263;
  border: 1px solid #014263;
  color: #fff;
  padding: 15px 30px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    background-color: #1574a5;
    border: 1px solid #1574a5;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
