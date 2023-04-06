import React from "react";
import { Footer } from "components";
import styled from "styled-components";
import NewsSection from "components/organisms/NewsSection";

const DefaultLayout = ({ children, footer, blogData, navigationLinks, projects, documents }) => (
  <>
    <Main>
      {children}
      <NewsSection data={blogData} />
    </Main>
    <Footer content={footer} navigationLinks={navigationLinks} projects={projects} documents={documents} />
  </>
);

export default DefaultLayout;

const Main = styled.main``