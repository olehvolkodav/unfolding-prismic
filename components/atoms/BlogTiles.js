import React from "react";
import styled from "styled-components";
import { BlogTile } from "components/atoms/BlogTile";

export const BlogTiles = ({ data, columns = 3 }) => {
  return (
    <CardWrapper>
      {data.map((item, index) => (
        <BlogTile
          key={`crd-${index}`}
          data={item}
          width={Math.round((1 / parseInt(columns)) * 100)}
          link={`/stories/${item.uid}`}
        />
      ))}
    </CardWrapper>
  );
};

const CardWrapper = styled.ul`
  list-style: none;
  margin: 0;
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 100%;
  position: relative;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
