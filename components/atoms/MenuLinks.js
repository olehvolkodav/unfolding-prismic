import React, { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";

import { getClickLink } from "utils/general";

const NavLink = ({ children, url, title, childMenu = [], isVisibleProjectItems }) => {
  return (
    <NavLinkItemWrapper>
      <NavLinkItem href={url} title={title}>
        {children}
        {childMenu.length > 0 && (
          <NavLinkChildWrapper isVisibleProjectItems={isVisibleProjectItems}>
            {childMenu.map((menuItem, index) => {
              return <NavLink
                key={`prj-${index}`}
                url={menuItem.url}
                title={menuItem.title}
              >
                {menuItem.children}
              </NavLink>
            })}
          </NavLinkChildWrapper>
        )}
      </NavLinkItem>
    </NavLinkItemWrapper>)
}

const MenuLinks = ({ isMobileMenuOpen, onClickMenu, data, navigationLinks, projects }) => {
  const [links, setLinks] = useState([{href: "/about"}, {href: "/for-translators"}, {href: "/publications"}, {href: "/join-us"}]);
  const [isVisibleProjectItems, setVisibleProjectItems] = useState(false);
  // useEffect(async () => {
  //   if (!navigationLinks) return;
  //   const localLinks = await Promise.all(navigationLinks.map(async link => await getClickLink(link.primary.nav_link_url, "", false, projects)));
  //   setLinks(localLinks);
  // }, [navigationLinks, projects]);

  const projectsMobileSubMenu = useMemo(() => (
    !!data?.regions && data.regions.map((region) => (
      {
        title: region.data.region_name[0].text,
        url: `/projects/${region.uid}`,
        children: region.data.region_name[0].text
      }
    ))
  ), [data]);

  return (
    <Navigation>
      <NavLinkWrapper>
        {
          isMobileMenuOpen &&
          <NavLinkItemWrapper>
            <a href="/">Home</a>
          </NavLinkItemWrapper>
        }
        <NavLink
          title="Discover Projects"
          childMenu={isMobileMenuOpen && projectsMobileSubMenu}
          isVisibleProjectItems={isVisibleProjectItems}
        >
          <NavLinkMenu
            onClick={isMobileMenuOpen ? (() => setVisibleProjectItems(!isVisibleProjectItems)) : (() => onClickMenu("projects"))}
            isVisibleProjectItems={isVisibleProjectItems}
            isMobileMenuOpen={isMobileMenuOpen}
          >Projects</NavLinkMenu>
        </NavLink>
        {
          navigationLinks && navigationLinks.map((link, index) => (
            <NavLinkItemWrapper key={`nav-link-item-${index}`}>
              <a href={links[index]?.href ? links[index]?.href : "/"}>{RichText.asText(link.primary.nav_link_title)}</a>
            </NavLinkItemWrapper>
          ))
        }
      </NavLinkWrapper>
    </Navigation>
  );
};

export default MenuLinks;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
  transition: 0.5s;

  @media (min-width: 1224px) {
    display: flex;
    margin-right: 20px;
    height: 100%;
  }
`;

const NavLinkWrapper = styled.ul`
  & { 
    list-style: none;
    display: flex;
    flex-direction: column;
    padding-left: 0px;
  }
  @media (min-width: 1024px) {
    & { flex-direction: row; }
  }
`;

const NavLinkChildWrapper = styled.ul`
  display: ${({ isVisibleProjectItems }) => isVisibleProjectItems ? "flex" : "none"};
  list-style: none;
  flex-direction: column;
  padding-left: 1rem;
`

const NavLinkItemWrapper = styled.li`
  margin-top: 1rem;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
  & > a {
    text-decoration: none;
    font-weight: normal;
    color: #ffffff;
    &:hover {
      color: "#0000008";
    }
    @media (min-width: 1024px) {
      color: #000000;
    }
  }
  @media (min-width: 1024px) {
    margin-left: 1rem;
  }
`;

const NavLinkMenu = styled.p`
  position: relative;
  display: inline;
  &::after {
    position: absolute;
    content: "";
    top: 6px;
    right: -22px;
    width: 0;
    height: 0;
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    border-bottom: ${({ isMobileMenuOpen, isVisibleProjectItems }) => isVisibleProjectItems && isMobileMenuOpen ? '8px solid #fff' : 'none'};
    border-top: ${({ isMobileMenuOpen, isVisibleProjectItems }) => !isVisibleProjectItems && isMobileMenuOpen ? '8px solid #fff' : 'none'};
  }
`;

const NavLinkItem = styled.a`
  text-decoration: none;
  font-weight: normal;
  color: #ffffff;
  &:hover {
    color: "#0000008";
  }
  @media (min-width: 1024px) {
    color: #000000;
  }
`;