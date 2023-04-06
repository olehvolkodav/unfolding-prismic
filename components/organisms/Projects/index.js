import React from "react";
import styled from "styled-components";
import Banner from "./Banner";
import PageTitle from "../PageTitle";
import DetailTab from "./Tab";
import { JoinMovement } from "components/slices";

const Projects = ({ stories, data, updates, cta, progress_data, projects }) => {
  return (
    <>
      <Banner data={data.data} />
      <PageTitle data={{ ...data.data, region: data.region }} isProject />
      <DetailTab
        stories={stories}
        data={data}
        progress_data={progress_data}
        cta={cta}
        updates={updates}
      />
      <JoinMovement
        data={{ ...data.data, ...cta.data }}
        ctaUrl={data.data.cta_url}
        projects={projects}
      />
    </>
  );
};

export default Projects;
