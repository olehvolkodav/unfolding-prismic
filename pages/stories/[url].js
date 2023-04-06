import React, { useState } from "react";
import { queryRepeatableDocuments } from "utils/queries";

import DefaultLayout from "layouts";
import { Header } from "components";
import Prismic from "@prismicio/client";
import { Router } from "next/router";

import { Client } from "utils/prismicHelpers";
import { StoryPage } from "components/organisms/stories";

const ProjectRegion = ({ doc, footer, blogData, regions, updates, cta, navigationLinks, projects, documents }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setIsMobileMenuOpen(false);
  });

  if (!Boolean(doc) || !Boolean(doc.data)) return <div>Page Not found</div>;
  return (
    <DefaultLayout footer={footer} blogData={blogData} navigationLinks={navigationLinks} projects={projects} documents={documents}>
      <Header
        regions={regions}
        updates={updates}
        blogData={blogData}
        navigationLinks={navigationLinks}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        projects={projects}
      />
      <StoryPage data={doc.data} cta={cta} projects={projects} />
    </DefaultLayout>
  );
};

export async function getStaticProps({ params, previewData = {} }) {
  const { ref } = previewData;
  const client = Client();

  const doc =
    (await client.getByUID("stories", params.url, ref ? { ref } : null)) || {};

  const regions = await client.query(
    Prismic.Predicates.at("document.type", "region"),
    { orderings: "[my.region.region_name]" }
  );

  const cta = (await client.getSingle("cta", ref ? { ref } : null)) || {};

  const updates = await client.query(
    Prismic.Predicates.at("document.type", "updates")
  );

  const footer = (await client.getSingle("footer", ref ? { ref } : null)) || {};

  const news = await client.query(
    Prismic.Predicates.at("document.type", "news")
  );

  const stories = await client.query(
    Prismic.Predicates.at("document.type", "stories")
  );

  const navigationLinks = await client.query(
    Prismic.Predicates.at("document.type", "primary_navigation_links")
  );

  const projects = await client.query(
    Prismic.Predicates.at("document.type", "projects")
  );

  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );

  return {
    props: {
      doc,
      cta,
      updates: updates.results,
      blogData: { news: news.results, stories: stories.results },
      footer,
      regions: regions.results,
      navigationLinks: navigationLinks.results?.length ? navigationLinks.results[0].data.body : [],
      projects: projects.results,
      documents
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "stories"
  );
  return {
    paths: documents.map((doc) => `/stories/${doc.uid}`),
    fallback: false,
  };
}

export default ProjectRegion;
