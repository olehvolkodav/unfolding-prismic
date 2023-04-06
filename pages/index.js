import React, { useState } from "react";
import { queryRepeatableDocuments } from "utils/queries";

import DefaultLayout from "layouts";
import { Header, SliceZone } from "components";
import Prismic from "@prismicio/client";
import { Router } from "next/router";

import { Client } from "utils/prismicHelpers";

const HomePage = ({ doc, footer, regions, updates, blogData, cta, navigationLinks, projects, documents }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setIsMobileMenuOpen(false);
  });

  return (
    <>
      {
        doc && doc.data &&
        <DefaultLayout footer={footer} blogData={blogData} navigationLinks={navigationLinks} projects={projects} documents={documents}>
          <Header
            regions={regions}
            updates={updates}
            blogData={blogData}
            cta={cta}
            navigationLinks={navigationLinks}
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
            projects={projects}
          />
          <SliceZone data={doc.data} regions={regions} />
        </DefaultLayout>
      }
    </>
  );
};

export async function getStaticProps({ preview = null, previewData = {} }) {
  const { ref } = previewData;

  const client = Client();

  const doc =
    (await client.getByUID("page", "homepage", ref ? { ref } : null)) || {};

  const footer = (await client.getSingle("footer", ref ? { ref } : null)) || {};
  const cta = (await client.getSingle("cta", ref ? { ref } : null)) || {};
  const news = await client.query(
    Prismic.Predicates.at("document.type", "news")
  );

  const stories = await client.query(
    Prismic.Predicates.at("document.type", "stories")
  );

  const regions = await client.query(
    Prismic.Predicates.at("document.type", "region"),
    { orderings: "[my.region.region_name]" }
  );

  const udpates = await client.query(
    Prismic.Predicates.at("document.type", "updates")
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
      blogData: { news: news.results, stories: stories.results },
      preview,
      footer,
      regions: regions.results,
      updates: udpates.results,
      cta,
      navigationLinks: navigationLinks.results?.length ? navigationLinks.results[0].data.body : [],
      projects: projects.results,
      documents
    },
  };
}

export default HomePage;
