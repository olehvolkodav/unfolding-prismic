import React, { useState } from "react";
import { queryRepeatableDocuments } from "utils/queries";

import DefaultLayout from "layouts";
import { Header } from "components";
import Region from "components/organisms/Region";
import Prismic from "@prismicio/client";
import { Router } from "next/router";

import { Client } from "utils/prismicHelpers";

const ProjectRegion = ({
  doc,
  footer,
  blogData,
  projects,
  regions,
  regionStory,
  updates,
  region_updates,
  cta,
  navigationLinks,
  documents
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  Router.events.on("routeChangeStart", () => {
    setIsMobileMenuOpen(false);
  });

  if (!Boolean(doc) || !Boolean(doc.data)) return <div>Page Not found</div>;
  return (
    <DefaultLayout footer={footer} blogData={blogData} navigationLinks={navigationLinks} projects={projects} documents={documents} >
      <Header
        regions={regions}
        updates={updates}
        blogData={blogData}
        navigationLinks={navigationLinks}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        projects={projects}
      />
      <Region
        data={doc.data}
        updates={region_updates}
        stories={regionStory}
        projects={projects}
        cta={cta}
      />
    </DefaultLayout>
  );
};

export async function getStaticProps({ params, previewData = {} }) {
  const { ref } = previewData;
  const client = Client();

  const doc =
    (await client.getByUID("region", params.regionId, ref ? { ref } : null)) ||
    {};

  const regions = await client.query(
    Prismic.Predicates.at("document.type", "region"),
    { orderings: "[my.region.region_name]" }
  );

  let projects = await client.query(
    Prismic.Predicates.at("document.type", "projects")
  );

  projects = projects.results.filter(
    (item) => item.data.region_link.id == doc.id
  );

  const project_ids = projects.map((pp) => pp.id);
  const cta = (await client.getSingle("cta", ref ? { ref } : null)) || {};

  const updates = await client.query(
    Prismic.Predicates.at("document.type", "updates")
  );

  const region_updates = updates.results
    .filter((item) => project_ids.indexOf(item.data.project_link.id) !== -1)
    .map((item) => ({
      ...item,
      region_name: doc.data.region_name[0].text,
      region_url: doc.uid,
      project_name:
        projects[project_ids.indexOf(item.data.project_link.id)].data
          .project_name[0].text,
      project_url: projects[project_ids.indexOf(item.data.project_link.id)].uid,
    }));

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

  const regionStory = [...stories.results]
    .filter((item) => project_ids.indexOf(item.data.related_project.id) !== -1)
    .map((item) => ({
      ...item,
      region_name: doc.data.region_name[0].text,
    }));

  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );

  return {
    props: {
      doc,
      cta,
      projects,
      updates: updates.results,
      region_updates,
      regionStory,
      blogData: { news: news.results, stories: stories.results },
      footer,
      regions: regions.results,
      navigationLinks: navigationLinks.results?.length ? navigationLinks.results[0].data.body : [],
      documents
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "region"
  );

  return {
    paths: documents.map((doc) => `/projects/${doc.uid}`),
    fallback: false,
  };
}

export default ProjectRegion;
