import React, { useMemo, useState } from "react";
import DefaultLayout from "layouts";
import Prismic from "@prismicio/client";
import nProgress from "nprogress";
import { Router, useRouter } from "next/router";

// Custom components
// import Loader from '../components/loader'
// import Custom404 from './404'

import { Header, SliceZone } from "components";
import CommonPageTitle from "components/organisms/CommonPageTitle";

import { Client } from "utils/prismicHelpers";
import { queryRepeatableDocuments } from "utils/queries";
// import useUpdatePreviewRef from '../utils/useUpdatePreviewRef';

const Pages = ({ doc, previewRef, footer, regions, updates, blogData, secondaryNavs, navigationLinks, documents, projects, region_updates }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pageTitleData = useMemo(() => doc && doc.data && doc.data.page_content.find(item => item.slice_type === "page_title"), [doc]);
  // const router = useRouter()
  // if (router.isFallback) {
  //   return <Loader />
  // }

  // if (!doc.id) {
  //   return <Custom404 />
  // }

  // useUpdatePreviewRef(previewRef, doc.id);
  
  Router.events.on("routeChangeStart", () => {
    nProgress.start();
    setIsMobileMenuOpen(false);
  });
  Router.events.on("routeChangeError", nProgress.done);
  Router.events.on("routeChangeComplete", nProgress.done);

  return (
    <>
      {
        doc && doc.data &&
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
          {
            pageTitleData &&
            <CommonPageTitle data={doc.data.page_content.find(item => item.slice_type === "page_title")} />
          }
          {
            <SliceZone data={doc.data} regions={regions} documents={documents} secondaryNavs={secondaryNavs} projects={projects} region_updates={region_updates} />
          }
        </DefaultLayout>
      }
    </>
  );
};

export async function getStaticProps({
  params,
  previewData,
}) {
  const previewRef = previewData ? previewData.ref : null
  const refOption = previewRef ? { ref: previewRef } : null
  const client = Client();

  const pageId = Array.isArray(params.pageId)
    ? params.pageId.pop()
    : "homepage";

  const doc =
    (await client.getByUID("page", pageId, refOption)) || {};

  const footer = (await client.getSingle("footer", refOption)) || {};

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

  const secondaryNav = await client.query(
    Prismic.Predicates.at("document.type", "secondary_navigation")
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

  const project_ids = projects.results.map((pp) => pp.id);
  const filteredUpdates = updates.results.filter(item => project_ids.indexOf(item.data.project_link.id) >= 0 && item.data.type === "Prayer");
  const region_updates = await Promise.all(filteredUpdates.map(async item => {
    const index = project_ids.indexOf(item.data.project_link.id);
    const regionDoc =
      (await client.getByUID("region", projects.results[index].data.region_link.uid, refOption)) ||
      {};
    return {
      ...item,
      region_name: regionDoc.data.region_name[0].text,
      region_url: regionDoc.uid,
      project_name: projects.results[index].data.project_name[0].text,
      project_url: projects.results[index].uid
    };
  }));

  return {
    props: {
      doc,
      blogData: { news: news.results, stories: stories.results },
      previewRef,
      footer,
      regions: regions.results,
      updates: updates.results,
      secondaryNavs: secondaryNav.results,
      navigationLinks: navigationLinks.results?.length ? navigationLinks.results[0].data.body : [],
      documents,
      projects: projects.results,
      region_updates
    },
  };
}

export async function getStaticPaths() {
  const documents = await queryRepeatableDocuments(
    (doc) => doc.type === "page"
  );

  return {
    paths: documents.map((doc) => {
      const prefix = !!doc.data?.url_prefix ? doc.data.url_prefix : "";

      let path = prefix.split("/");
      path.push(doc.uid.replace("_", "/"));
      path = path.filter((path) => path !== "");

      return `/${path.join("/")}`;
    }),
    fallback: false,
  };
}

export default Pages;
