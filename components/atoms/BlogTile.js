import React from "react";
import moment from "moment";
import { RichText } from "prismic-reactjs";
import styled from "styled-components";
import { compressSetting } from "utils/general";

export const BlogTile = ({ data, width = 33, link = "/" }) => {
  return (
    <Card width={width}>
      <a href={link}>
        <CardImage src={compressSetting(data.data.overview_image?.url, data.data.overview_image?.dimensions.width)} />
      </a>
      <a href={link}>
        <CardTitle>{RichText.asText(data.data.title)}</CardTitle>
      </a>
      <MetaWrapper>
        {/* <AuthorText>{RichText.asText(data.data.author)}</AuthorText> */}
        {!!!data.data.hide_created_date && (
          <MetaItem>
            {moment(
              data.data.published_date ?? data.last_publication_date
            ).format("MMMM DD, YYYY")}
          </MetaItem>
        )}
      </MetaWrapper>
      <Excerpt size="1" color="#8e8e8e">
        {RichText.asText(data.data.content).substring(0, 200)}...
      </Excerpt>
      {Boolean(data.region_name) && <Region>{data.region_name}</Region>}
    </Card>
  );
};

const Card = styled.li`
  padding: 0;
  width: ${({ width }) => width - 2}%;
  h5 {
    text-align: left;
    font-weight: 100;
    margin-bottom: 0;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  a {
    text-decoration: none;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CardImage = styled.img`
  width: 100%;
  border-radius: 12px;
  min-height: 250px;
  max-height: 250px;
  object-fit: cover;
`;

const CardTitle = styled.h4`
  font-weight: 600;
  font-size: 1.4rem;
  margin: 30px 0 10px;
  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
  &:hover {
    color: #014263;
  }
`;

const MetaWrapper = styled.ul`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const MetaItem = styled.li`
  color: #8e8e8e;
`;

const Excerpt = styled.p`
  color: #8e8e8e;
  line-height: 1.4rem;
`;

const Region = styled.div`
  padding: 4px 8px;
  font-size: 12px;
  background: #0171a7;
  border-radius: 6px;
  color: #fff;
  display: inline;
  width: auto;
  text-transform: uppercase;
  margin-top: 20px;
`;
