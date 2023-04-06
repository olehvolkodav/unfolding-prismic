import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import TabItem from "./OverviewTabItem";
import Overview from "../Overview";
import Goal from "../Goals";
import RegionUpdate from "components/organisms/Region/RegionUpdate";
import RegionJoinMovementBar from "components/organisms/Region/RegionJoinMovementBar";
import { Section } from "components/atoms/Section";

const tabItemData = [
  {
    id: "overview",
    title: "Overview",
  },
  {
    id: "updates_section",
    title: "Updates from the Field",
  },
  {
    id: "gospel_section",
    title: "Goals and Progress",
  },
  {
    id: "joinmovementbar",
    title: "Get Involved",
  },
];

const getDimensions = (ele) => {
  const height = ele?.getBoundingClientRect()?.height;
  const offsetTop = ele?.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

export default function DetailTab({
  data,
  progress_data,
  stories,
  cta,
  updates,
  projects
}) {
  const headerRef = useRef(null);
  const overviewRef = useRef(null);
  const updatesRef = useRef(null);
  const gospelRef = useRef(null);
  const joinmovementbarRef = useRef(null);
  const [tabData, setTabData] = useState(tabItemData);
  const sectionRefs = [
    { section: "overview", ref: overviewRef },
    { section: "updates_section", ref: updatesRef },
    { section: "gospel_section", ref: gospelRef },
    { section: "joinmovementbar", ref: joinmovementbarRef },
  ];

  const [visibleSection, setVisibleSection] = useState();
  const [activeTab, setActiveTab] = useState("overview");
  const [latestStory, setLatestStory] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition > offsetTop && scrollPosition < offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  const scrollTo = (ele) => {
    window.scrollTo({ top: ele.offsetTop - 50, behavior: "smooth" });
  };

  const onClickTab = (id) => () => {
    setActiveTab(id);
    sectionRefs.forEach((sectionRef) => {
      if (sectionRef.section === id) {
        scrollTo(sectionRef.ref.current);
      }
    });
  };

  useEffect(() => {
    if (stories && stories.length !== 0) {
      const sortedArr = stories
        .filter((story) => story.data.related_project.id === data.id)
        .sort(function (a, b) {
          return (
            new Date(b.data.published_date) - new Date(a.data.published_date)
          );
        });
      if (sortedArr.length !== 0) {
        setLatestStory(sortedArr[0]);
      }
    }
  }, [stories]);

  useEffect(() => {
    const newTabData = [...tabItemData];
    if (stories.length === 0 || latestStory === null) {
      newTabData.splice(1, 1);
    }
    if (!!!progress_data || Object.keys(progress_data).length === 0) {
      newTabData.splice(newTabData.length - 2, 1);
    }
    setTabData([...newTabData]);
  }, [stories, latestStory]);

  return (
    <>
      <Section
        sectionCss={tabSectionCss}
        wrapperCss={tabWrapperCss}
        ref={headerRef}
      >
        {tabData.map(({ id, title }) => (
          <TabItem
            key={title}
            title={title}
            onTabItemClicked={onClickTab(id)}
            isActive={activeTab === id}
          />
        ))}
      </Section>

      <Overview data={data.data} forwardRef={overviewRef} />

      <RegionJoinMovementBar
        data={cta.data}
        forwardRef={joinmovementbarRef}
        cta_url={data.data.cta_url}
        projects={projects}
      />

      {(latestStory !== null || updates.length !== 0) && (
        <RegionUpdate
          stories={stories}
          pageType="detail"
          language={
            data.data.language.length !== 0
              ? data.data.language
              : data.region.data.region_name
          }
          data={updates}
          latestStory={latestStory}
          forwardRef={updatesRef}
        />
      )}

      <Goal data={data} progress_data={progress_data} forwardRef={gospelRef} />
    </>
  );
}

const tabSectionCss = css`
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  background: #fff;
  z-index: 10;
`;

const tabWrapperCss = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 50px;
  padding: 0;

  @media (max-width: 425px) {
    overflow: scroll;
    justify-content: flex-start;
  }
`;
