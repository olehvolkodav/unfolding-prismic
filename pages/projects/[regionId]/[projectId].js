import React, { useState } from "react";
import { queryRepeatableDocuments } from "utils/queries";
import { dataProvider } from "local_data/progress/dataProvider";

import DefaultLayout from "layouts";
import { Header } from "components";
import Projects from "components/organisms/Projects";
import Prismic from "@prismicio/client";
import { Router } from "next/router";

import { Client } from "utils/prismicHelpers";

const ProjectDetail = ({
  doc,
  progress_data,
  footer,
  regions,
  blogData,
  updates,
  project_updates,
  cta,
  navigationLinks,
  projects,
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
      <Projects
        data={doc}
        updates={project_updates}
        stories={blogData.stories}
        cta={cta}
        progress_data={progress_data}
        projects={projects}
      />
    </DefaultLayout>
  );
};

export async function getStaticProps({ params, previewData = {} }) {
  const { ref } = previewData;
  const client = Client();
  const regionId = params.regionId;
  const projectId = params.projectId;

  const doc =
    (await client.getByUID("projects", projectId, ref ? { ref } : null)) || {};
  const region_doc =
    (await client.getByUID("region", regionId, ref ? { ref } : null)) || {};

  const progress_data = dataProvider.getByUid(projectId);

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

  const updates = await client.query(
    Prismic.Predicates.at("document.type", "updates")
  );

  const navigationLinks = await client.query(
    Prismic.Predicates.at("document.type", "primary_navigation_links")
  );

  const projects = await client.query(
    Prismic.Predicates.at("document.type", "projects")
  );

  const project_updates = updates.results
    .filter((item) => item.data.project_link.id === doc.id)
    .map((item) => ({
      ...item,
      region_name: region_doc.data.region_name[0].text,
      region_url: region_doc.uid,
      project_name: doc.data.project_name[0].text,
      project_url: doc.uid,
    }));

  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );

  return {
    props: {
      doc: { ...doc, region: region_doc },
      progress_data,
      blogData: { news: news.results, stories: stories.results },
      footer,
      updates: updates.results,
      project_updates,
      regions: regions.results,
      cta,
      navigationLinks: navigationLinks.results?.length ? navigationLinks.results[0].data.body : [],
      projects: projects.results,
      documents
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "projects"
  );
  return {
    paths: documents.map((doc) => {
      // todo: handle situation where region_link isn't yet set.
      const region_uid = doc.data.region_link.uid;
      return `/projects/${region_uid}/${doc.uid}`;
    }),
    fallback: false,
  };
}

export default ProjectDetail;
