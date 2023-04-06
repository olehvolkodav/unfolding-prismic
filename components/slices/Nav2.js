import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { css } from "styled-components";

import TabItem from "components/organisms/Projects/Tab/OverviewTabItem";
import { Section } from "components/atoms/Section";
import { getClickLink } from "utils/general";

export default function Nav2({
  slice,
  secondaryNavs,
  projects,
}) {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const { navigation_link_set, navigation_sticky } = useMemo(() => slice.primary, [slice]);
  const data = useMemo(() => {
    if (!secondaryNavs?.length)
      return [];
    else
      return secondaryNavs.find(item => item.id === navigation_link_set.id)?.data.body;
  }, [navigation_link_set, secondaryNavs]);
  const currentUid = useMemo(() => {
    const urlSplits = router.asPath.split("/");
    return urlSplits[urlSplits.length - 1];
  }, [router]);

  useEffect(async () => {
    if (!data) return;
    const localLinks = await Promise.all(data.map(async ({ primary }) => await getClickLink(primary.nav_link_url, "", false, projects)));
    setLinks(localLinks);
  }, [data, projects]);

  return (
    <Section
      sectionCss={tabSectionCss({ navigation_sticky })}
      wrapperCss={tabWrapperCss({isMobileHide: slice.primary.hide_on_mobile})}
    >
      {data.map(({ primary }, index) => (
        <TabItem
          key={`tab-item-${index}`}
          title={primary.nav_link_title?.length ? primary.nav_link_title[0].text : ""}
          link={links[index]}
          isActive={currentUid.includes(primary.nav_link_url.uid)}
        />
      ))}
    </Section>
  );
}

const tabSectionCss = ({ navigation_sticky }) => css`
  position: -webkit-sticky;
  position: ${navigation_sticky ? "sticky" : "initial"};
  top: 0;
  background: #fff;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const tabWrapperCss = ({isMobileHide}) => css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0;

  @media (max-width: 425px) {
    overflow: scroll;
    justify-content: flex-start;
  }
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
`;
