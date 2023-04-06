import React, { useState, useEffect } from "react";
import { css } from "styled-components";
import { Section } from "components/atoms/Section";
import { BlogTiles } from "components/atoms/BlogTiles";
import { Title } from "components/atoms/Typography";

export default function RegionBlog({ data }) {
  if (!data.length > 0) return <></>;

  const [stories, setStories] = useState(data);

  useEffect(() => {
    const sortedStories = [...data].sort(function (a, b) {
      return (
        new Date(b.data.published_date ?? b.last_publication_date) -
        new Date(a.data.published_date ?? a.last_publication_date)
      );
    });
    setStories(sortedStories);
  }, [data]);

  return (
    <Section wrapperCss={wrapperCss}>
      <Title>Feature Stories</Title>
      <BlogTiles data={stories} columns={3} count={3} />
    </Section>
  );
}

const wrapperCss = css``;
