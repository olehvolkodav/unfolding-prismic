import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { RichText } from "prismic-reactjs";
import { Title, Caption } from "components/atoms/Typography";
import { BlogTiles } from "components/atoms/BlogTiles";
import { Section } from "components/atoms/Section";

const NewsSection = ({ data }) => {
  const [newsData, setNewsData] = useState(data.news);
  const [stories, setStories] = useState(data.stories);

  const sortByPublishedDate = (stories) => {
    return stories.sort((a, b) => {
      return (
        new Date(b.data.published_date ?? b.last_publication_date) -
        new Date(a.data.published_date ?? a.last_publication_date)
      );
    });
  }

  useEffect(() => {
    const newState = [...data.news]
      .sort(function (a, b) {
        return new Date(b.data.created_at) - new Date(a.data.created_at);
      })
      .splice(0, 6);
    setNewsData(newState);

    const pinStories = data.stories.filter(story => story.data.pin_story);
    const noPinStories = data.stories.filter(story => !story.data.pin_story);
    const sortedStories = [...sortByPublishedDate(pinStories), ...sortByPublishedDate(noPinStories)].splice(0, 2);
    setStories(sortedStories);
  }, [data]);

  return (
    <Section wrapperCss={wrapperCss} bgColor="#F2F2F2">
      <News>
        <Title>In the News</Title>
        <div>
          {newsData.map((item, index) => (
            <NewsItem key={index}>
              <a href={item.data.url.url || "/"} target="_blank">
                <Caption>{RichText.asText(item.data.title)}</Caption>
              </a>
            </NewsItem>
          ))}
          {/* <a href="#">Read More</a> */}
        </div>
      </News>
      <Stories>
        <Title>Stories From the Field</Title>
        <BlogTiles data={stories && stories.slice(0, 2)} columns={2} />
      </Stories>
    </Section>
  );
};

export default NewsSection;

const wrapperCss = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  @media (min-width: 1200px) {
    flex-direction: row;
  }
`;

const News = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  a {
    color: #014263;
  }
  h3 {
    text-align: left;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  h5 {
    font-size: 1.3rem;
  }

  @media (max-width: 1024px) {
    margin-bottom: 30px;
  }

  @media (min-width: 1200px) {
    width: 20%;
  }
`;
const NewsItem = styled.div`
  a {
    text-decoration: none;
  }
  h5 {
    text-align: left;
    margin: 0;
    margin-bottom: 7px;
    font-size: 1rem;
    &:hover {
      color: #014263;
      cursor: pointer;
    }
    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  margin-bottom: 17px;
`;
const Stories = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  width: 80%;
  @media (min-width: 1200px) {
    margin-left: 65px;
  }

  h3 {
    text-align: left;

    @media (max-width: 768px) {
      font-size: 1.5rem;
    }
  }
  h5 {
    text-align: left;
    margin: 0;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
`;
const StoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  @media (max-width: 1200px) {
    flex-direction: column;
    width: 100%;
  }
  /* grid-template-columns: auto auto auto;
  column-gap: 40px; */
  /* @media (max-width: 768px) {
    grid-template-columns: auto;
  } */
`;

const StoryItem = styled.div`
  /* max-width: 360px; */
  width: 50%;
  max-width: 50%;
  flex-basis: 50%;
  flex: 1;
  margin-right: 30px;

  @media (max-width: 1200px) {
    width: 100%;
    max-width: 100%;
    flex-basis: 100%;
    margin-right: 0;
  }
`;
