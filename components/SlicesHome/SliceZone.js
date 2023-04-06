import React from "react";
import {
  FeatureContent,
  Testimonial,
  Partnering,
  DiscoverGlobe,
  JoinMovement,
} from ".";

import {
  Banner,
  MediaContent,
  DonationEmbed,
  IframeEmbed,
  TypographySlice,
  AccordionSlice,
  ButtonSlice,
  AnchorSlice,
  TextThinLine,
  Code,
  Nav2,
  PrayerRequestsList
} from "../slices";

import styled from "styled-components";

const SliceZone = ({ data, regions, documents, secondaryNavs, projects, region_updates }) => {
  return (
    <Container>
      {data.page_content.map((slice, index) => {
        switch (slice.slice_type) {
          case "banner":
            return (
              <Banner
                slice={slice}
                key={`slice-${index}`}
                projects={projects}
              />
            );
          case "media_content":
            return <MediaContent slice={slice} key={`slice-${index}`} documents={documents} projects={projects} />;
          case "features_grid":
            return <FeatureContent slice={slice} key={`slice-${index}`} documents={documents} projects={projects} />;
          case "testimonials_slider":
            return <Testimonial slice={slice} key={`slice-${index}`} />;
          case "partner_logos":
            return <Partnering slice={slice} key={`slice-${index}`} />;
          case "discover_projects":
            return (
              <DiscoverGlobe
                slice={slice}
                key={`slice-${index}`}
                regions={regions}
              />
            );
          case "donationembed":
            return <DonationEmbed slice={slice} key={`slice-${index}`} />;
          case "iframeembed":
            return <IframeEmbed slice={slice} key={`slice-${index}`} />;
          case "cta":
            return (
              <JoinMovement
                ctaUrl={data.cta_url}
                data={slice.primary}
                key={`slice-${index}`}
                projects={projects}
              />
            );
          case "typography":
            return <TypographySlice slice={slice} key={`slice-${index}`} documents={documents} projects={projects} />;
          case "accordion-row_list":
            return <AccordionSlice slice={slice} key={`slice-${index}`} documents={documents} projects={projects} />;
          case "button":
            return <ButtonSlice slice={slice} key={`slice-${index}`} projects={projects} />;
          case "anchor":
            return <AnchorSlice slice={slice} key={`slice-${index}`} />;
          case "textthinline":
            return <TextThinLine slice={slice} key={`slice-${index}`} documents={documents} projects={projects} />;
          case "code":
            return <Code slice={slice} key={`slice-${index}`} />;
          case "nav2":
            return <Nav2 key={`slice-${index}`} slice={slice} secondaryNavs={secondaryNavs} projects={projects} />;
          case "prayer_requests_list":
            return <PrayerRequestsList key={`slice-${index}`} slice={slice} region_updates={region_updates} />
          default:
            return null;
        }
      })}
    </Container>
  );
}

export default SliceZone;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
