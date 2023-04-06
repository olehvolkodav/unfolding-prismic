import React from "react";
import styled from "styled-components";

import RegionBanner from "./RegionBanner";
import PageTitle from "../PageTitle";
import RegionBlog from "./RegionBlog";
import RegionProject from "./RegionProject";
import RegionUpdate from "./RegionUpdate";
import RegionAbout from "./RegionAbout";
import { JoinMovement } from "../../slices";

const Region = ({ data, projects, updates, stories, cta }) => {
  return (
    <>
      <RegionBanner data={data} projects={projects} />
      <PageTitle data={data} />
      <RegionProject regionData={data} data={projects} />
      <RegionAbout data={data} />
      <RegionUpdate
        pageType="project"
        data={updates}
        language={data.language.length !== 0 ? data.language : data.region_name}
      />
      <RegionBlog data={stories} />
      <JoinMovement data={{ ...data, ...cta.data }} ctaUrl={data.cta_url} projects={projects} />
    </>
  );
};

export default Region;
