import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { RichText } from "prismic-reactjs";

import { Title, Caption, Text } from "components/atoms/Typography";
import { Image } from "components/atoms/Image";
import { FacebookIcon, InstagramIcon, LinkedInIcon } from "./atoms/Icons";
// import { getClickLink } from "utils/general";

// const columnIds = [
//   ["for-translators", "publications", "join-us", "donate", "sweet-publishing"],
//   ["about", "strategic-overview", "staff", "leadership", "statement-of-faith", "financial-information", "disclosures-and-credits", "license"],
// ];
// const columnNames = [
//   ["For Translators", "Publications", "Join Us", "Give Now", "Bible Illustrations"],
//   ["About unfoldingWord", "Strategic Overview", "Staff", "Leadership", "Statement of Faith", "Financial Information", "Disclosures and Credits", "License"]
// ];

const linkColumns = [
  [
    { href: "/for-translators", title: "For Translators" },
    { href: "/publications", title: "Publications" },
    { href: "/join-us", title: "Join Us"},
    { href: "/donate", title: "Give Now"},
    { href: "/sweet-publishing", title: "Bible Illustrations"}
  ],
  [
    { href: "/about/strategic-overview", title: "Strategic Overview" },
    { href: "/about/staff", title: "Staff" },
    { href: "/about/leadership", title: "Leadership" },
    { href: "/about/statement-of-faith", title: "Statement of Faith" },
    { href: "/about/financial-information", title: "Financial Information" },
    { href: "/about/disclosures-and-credits", title: "Disclosures and Credits" },
    { href: "/about/license", title: "License" }
  ],
  [
    { href: "https://door43.org/u/unfoldingWord/en_ta/master/", title: "Translation Academy" },
    { href: "https://www.translationcore.com/", title: "translationCore" },
    { href: "https://forum.door43.org/t/translationstudio-desktop-version-12-1-1/465", title: "translationStudio" },
    { href: "https://td.unfoldingword.org/", title: "translationDatabase" },
    { href: "https://door43.org/", title: "Door43" },
    { href: "https://api-info.readthedocs.io/en/latest/", title: "API" }
  ]
];

const Menu = ({ projects, documents }) => {
  // const [navLinks, setNavLinks] = useState([]);

  // useEffect(async () => {
  //   const localNavLinks = await Promise.all(columnIds.map(async column => {
  //     const filteredNavLinks = [];
  //     column.forEach(item => {
  //       const findDoc = documents.find(doc => doc.uid === item);
  //       if (findDoc) {
  //         filteredNavLinks.push({ ...findDoc, link_type: "Document" });
  //       }
  //     })
  //     const filteredLinks = await Promise.all(filteredNavLinks.map(async link => await getClickLink(link, "", false, projects)));

  //     return {
  //       navLinks: filteredNavLinks,
  //       linkUrls: filteredLinks
  //     }
  //   }));
  //   setNavLinks(localNavLinks);
  // }, [projects, documents]);

  return (
    <MenuWrapper>
      <MenuGroup>
        {/* {
          columnNames.map((columnName, navLinkIndex) => (
            <MenuGroupItem key={`menu-group-item-${navLinkIndex}`}>
              {
                navLinkIndex === 1 &&
                <MenuHeading isLink={true}>
                  <a href={navLinks[navLinkIndex]?.linkUrls[0]?.href ? navLinks[navLinkIndex]?.linkUrls[0]?.href : "/"}>
                    {columnNames[1][0]}
                  </a>
                </MenuHeading>
              }
              <MenuList>
                {
                  columnName.map((name, index) => (
                    <>
                      {
                        !(navLinkIndex === 1 && index === 0) &&
                        <MenuItem key={`menu-item-${index}`}>
                          <a href={navLinks[navLinkIndex]?.linkUrls[index]?.href ? navLinks[navLinkIndex]?.linkUrls[index]?.href : "/"}>
                            {name}
                          </a>
                        </MenuItem>
                      }
                    </>
                  ))
                }
                {
                  navLinkIndex === 1 &&
                  <MenuItem>
                    <a href="https://www.unfoldingword.org/contact">Contact</a>
                  </MenuItem>
                }
              </MenuList>
            </MenuGroupItem>
          ))
        } */}
        {
          linkColumns.map((linkColumn, linkIndex) => (
            <MenuGroupItem key={`menu-group-item-${linkIndex}`}>
              {
                linkIndex === 1 &&
                <MenuHeading isLink={true}>
                  <a href="/about">
                    About unfoldingWord
                  </a>
                </MenuHeading>
              }
              {
                linkIndex === 2 &&
                <MenuHeading isLink={false}>
                  <a>translatorLinks</a>
                </MenuHeading>
              }
              <MenuList>
                {
                  linkColumn.map((link, index) => (
                    <MenuItem key={`menu-item-${index}`}>
                      <a href={link.href}>{link.title}</a>
                    </MenuItem>
                  ))
                }
              </MenuList>
            </MenuGroupItem>
          ))
        }
      </MenuGroup>
    </MenuWrapper>
  );
};

const Footer = ({ content, navigationLinks, projects, documents }) => {
  return (
    <Container>
      <MainFooter>
        <Aboutus>
          <Title color="white">{RichText.asText(content.data.about)}</Title>
          <Text color="#919090">
            {RichText.asText(content.data.about_description)}
          </Text>
          <div>
            {content.data.sponsors.map((item, index) => (
              <a
                key={`content-${index}`}
                href={item?.sponsor_link?.url}
                target={item?.sponsor_link?.target}
              >
                <Image source={item.company} key={index} />
              </a>
            ))}
          </div>
        </Aboutus>
        <Menu navigationLinks={navigationLinks} projects={projects} documents={documents} />
      </MainFooter>
      <Copyright>
        <Caption color="white">
          © Copyright {new Date().getFullYear()} unfoldingWord. All Rights
          Reserved. | {RichText.asText(content.data.copyright)}
        </Caption>
        <ul className="footer-links">
          <li>
            <a href="https://www.unfoldingword.org/privacy">Privacy Policy</a>
          </li>
          <li>
            <a href="https://www.unfoldingword.org/terms-of-use">
              Terms of Use
            </a>
          </li>
        </ul>
        <ul className="social-icons">
          <li>
            <a href="https://www.facebook.com/unfoldingWord/" title="Facebook">
              <FacebookIcon />
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/unfoldingword/"
              title="Instagram"
            >
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a
              href="http://linkedin.com/company/unfoldingword/"
              title="LinkedIn"
            >
              <LinkedInIcon />
            </a>
          </li>
        </ul>
      </Copyright>
    </Container>
  );
};

export default Footer;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  @media (min-width: 1024px) {
    width: 70%;
    padding-left: 48px;
  }
`;
const MenuGroup = styled.div`
  display: flex;
  margin-top: 30px;
  & > div:not(:last-child) {
    margin-right: 150px;
  }
  @media (max-width: 576px) {
    display: block;
    & > div:not(:last-child) {
      margin-bottom: 30px
    }
  }
`;
const MenuGroupItem = styled.div``;
const MenuHeading = styled.h5`
  margin: 0 0 0.5rem;
  a {
    color: white;
    text-decoration: underline;
    font-weight: bold;
    font-size: 1rem;
    cursor: ${({ isLink }) => isLink ? "pointer" : "initial"};
  }
`;
const MenuList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;
const MenuItem = styled.li`
  margin: 0 0 0.5rem;
  a {
    color: white;
    text-decoration: none;
    &:hover {
      font-weight: bold;
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const Container = styled.footer`
  display: flex;
  flex-direction: column;
`;

const MainFooter = styled.div`
  background-color: #231f20;
  display: flex;
  flex-direction: column;
  padding: 30px 40px;

  @media (min-width: 1024px) {
    padding: 30px 135px;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const Copyright = styled.div`
  background: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: flex-start;
    padding: 0 135px;
  }

  .social-icons {
    margin-left: auto;
    margin-right: auto;
    display: flex;
    list-style: none;
    > li {
      padding: 0 0.5rem;
    }
    @media (min-width: 1024px) {
      margin-left: auto;
    }
  }

  .footer-links {
    display: flex;
    list-style: none;
    > li {
      padding: 0 0.5rem;
      > a {
        color: #919090;
      }
    }
    @media (min-width: 1024px) {
      margin-left: 1rem;
    }
  }

  div {
    display: flex;
    margin-left: 20px;
    margin-right: 30px;
    margin-bottom: 20px;

    @media (min-width: 1024px) {
      margin-bottom: 0px;
    }

    img {
      margin-right: 10px;
      cursor: pointer;
      &:hover {
        filter: brightness(1.5);
      }
    }
  }
  h5 {
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
    color: #919090;
    padding: 0 40px;
    text-align: left;

    @media (min-width: 1024px) {
      padding: 0;
    }
  }
`;
const Aboutus = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 1024px) {
    width: 30%;
  }

  h3 {
    text-align: left;
    font-weight: 800;
    font-size: 16px;
    line-height: 24px;
  }
  span {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 24px;
  }
  div {
    margin-top: 24px;
    img {
      margin-right: 15px;
    }
  }
`;
