import React from "react";
import { Elements } from "prismic-reactjs";
import styled from "styled-components";
import { Paragraph } from "components/atoms/Typography";
import { linkResolver } from 'prismic-configuration'
import { compressSetting } from 'utils/general';

// -- Function to add unique key to props
const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key });
};

const H1 = styled.h1`
  font-size: 72px;
  margin: 0 0 .5rem;
`
const H2 = styled.h2`
  font-size: 56px;
  margin: 0 0 .5rem; 
`
const H3 = styled.h3`
  font-size: 40px;
  margin: 0 0 .5rem;
`
const H4 = styled.h4`
  font-size: 56px;
  margin: 0 0 .5rem;
`
const H5 = styled.h5`
  font-size: 24px;
  margin: 0 0 .5rem;
`
const H6 = styled.h6`
  font-size: 16px;
  margin: 0 0 .5rem;
`

const UL = styled.ul`
  margin-left: 1.5rem;
`

const OL = styled.ol`
  margin-left: 1.5rem;
`

const LI = styled.li`
  margin-left: 1rem;
  padding-bottom: .5rem;
  line-height: 1.5rem;
`

// -- HTML Serializer
export const htmlSerializer = function (type, element, content, children, key, documents, projects) {
  var props = {};

  switch (type) {
    case Elements.heading1: // Heading 1
      return (
        <H1 {...propsWithUniqueKey(props, key)}>
          {children}
        </H1>
      );

    case Elements.heading2: // Heading 2
      return (
        <H2 {...propsWithUniqueKey(props, key)}>
          {children}
        </H2>
      );

    case Elements.heading3: // Heading 3
      return (
        <H3 {...propsWithUniqueKey(props, key)}>
          {children}
        </H3>
      );

    case Elements.heading4: // Heading 4
      return (
        <H4 {...propsWithUniqueKey(props, key)}>
          {children}
        </H4>
      );

    case Elements.heading5: // Heading 5
      return (
        <H5 {...propsWithUniqueKey(props, key)}>
          {children}
        </H5>
      );

    case Elements.heading6: // Heading 6
      return (
        <H6 {...propsWithUniqueKey(props, key)}>
          {children}
        </H6>
      );

    case Elements.paragraph: // Paragraph
      return (
        <Paragraph size="1.2" height="160" {...propsWithUniqueKey(props, key)}>
          {children}
        </Paragraph>
      );

    case Elements.preformatted: // Preformatted
      return React.createElement(
        "pre",
        propsWithUniqueKey(props, key),
        children
      );

    case Elements.strong: // Strong
      return React.createElement(
        "strong",
        propsWithUniqueKey(props, key),
        children
      );

    case Elements.em: // Emphasis
      return React.createElement(
        "em",
        propsWithUniqueKey(props, key),
        children
      );

    case Elements.listItem: // Unordered List Item
      return (
        <LI {...propsWithUniqueKey(props, key)}>
          {children}
        </LI>
      );

    case Elements.oListItem: // Ordered List Item
      return (
        <LI {...propsWithUniqueKey(props, key)}>
          {children}
        </LI>
      );

    case Elements.list: // Unordered List
      return (
        <UL {...propsWithUniqueKey(props, key)}>
          {children}
        </UL>
      );

    case Elements.oList: // Ordered List
      return (
        <OL {...propsWithUniqueKey(props, key)}>
          {children}
        </OL>
      );

    case Elements.image: // Image
      const linkUrl = element.linkTo
        ? element.linkTo.url || linkResolver(element.linkTo)
        : null;
      const linkTarget =
        element.linkTo && element.linkTo.target
          ? { target: element.linkTo.target }
          : {};
      const linkRel = linkTarget.target ? { rel: "noopener" } : {};
      const img = React.createElement("img", {
        src: compressSetting(element.url, element.dimensions.width),
        alt: element.alt || "",
      });
      return React.createElement(
        "p",
        propsWithUniqueKey(
          { className: [element.label || "", "block-img"].join(" ") },
          key
        ),
        linkUrl
          ? React.createElement(
            "a",
            Object.assign({ href: linkResolver(element.linkTo, documents, projects) }, linkTarget, linkRel),
            img
          )
          : img
      );

    case Elements.embed: // Embed
      props = Object.assign(
        {
          "data-oembed": element.oembed.embed_url,
          "data-oembed-type": element.oembed.type,
          "data-oembed-provider": element.oembed.provider_name,
        },
        element.label ? { className: element.label } : {}
      );
      const embedHtml = React.createElement("div", {
        dangerouslySetInnerHTML: { __html: element.oembed.html },
      });
      return React.createElement(
        "div",
        propsWithUniqueKey(props, key),
        embedHtml
      );

    case Elements.hyperlink: // Image
      const targetAttr = element.data.target
        ? { target: element.data.target }
        : {};
      const relAttr = element.data.target ? { rel: "noopener" } : {};
      props = Object.assign(
        {
          href: linkResolver(element.data, documents, projects),
        },
        targetAttr,
        relAttr
      );
      return React.createElement("a", propsWithUniqueKey(props, key), children);

    case Elements.label: // Label
      props = element.data
        ? Object.assign({}, { className: element.data.label })
        : {};
      return React.createElement(
        "span",
        propsWithUniqueKey(props, key),
        children
      );

    case Elements.span: // Span
      if (content) {
        return content.split("\n").reduce((acc, p) => {
          if (acc.length === 0) {
            return [p];
          } else {
            const brIndex = (acc.length + 1) / 2 - 1;
            const br = React.createElement(
              "br",
              propsWithUniqueKey({}, brIndex)
            );
            return acc.concat([br, p]);
          }
        }, []);
      } else {
        return null;
      }

    default:
      // Always include a default that returns null
      return null;
  }
};
