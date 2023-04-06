import { queryRepeatableDocuments } from "./queries";

export const GiveNowUrl =
  "https://www.unfoldingword.org/donate";

const getResizeWidth = (isThumbnail, width, resizeWidth) => {
  if (isThumbnail)
    return resizeWidth;
  else
    return width < resizeWidth ? width : resizeWidth;
}

export const compressSetting = (url, width) => {
  if (!url) return "";
  let index = url.indexOf("auto=compress,format");
  const necessaryUrl = url.substring(0, index + 20);
  index = url.indexOf("&w=");
  if (index > 0) {
    const restUrl = url.substring(index + 3);
    index = restUrl.indexOf("&");
    width = parseInt(restUrl.substring(0, index), 10);
  }
  return `${necessaryUrl}&width=${width < 1400 ? width : 1400}`;
}

export const resizeImgSetting = (imageInfo) => {
  const url = imageInfo.url;
  let width = imageInfo.dimensions?.width;
  const isThumbnail = !!imageInfo.thumbnail;
  const resizeWidth = isThumbnail ? imageInfo.thumbnail.dimensions?.width : imageInfo.default ? imageInfo.default.dimensions?.width : 1400;
  const resizeHeight = isThumbnail ? imageInfo.thumbnail.dimensions?.height : 0;

  if (!url) return "";
  let index = url.indexOf("auto=compress,format");
  const necessaryUrl = url.substring(0, index + 20);
  index = url.indexOf("&w=");
  if (index > 0) {
    const restUrl = url.substring(index + 3);
    index = restUrl.indexOf("&");
    width = parseInt(restUrl.substring(0, index), 10);
  }

  const optimizeWidth = getResizeWidth(isThumbnail, width, resizeWidth);
  const optimizeHeight = resizeHeight;
  const optimizeUrl = `${necessaryUrl}&width=${optimizeWidth}${isThumbnail ? `&height=${optimizeHeight}` : ""}`;
  return { optimizeUrl, optimizeWidth, optimizeHeight };
}

export const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    }
    : null;
};

export const projectLinkResolver = (data) => {
  return `/projects/${data.data.region_link.uid}/${data.uid}`
}

export const regionLinkResolver = (data) => {
  return `/projects/${data.uid}`
}

export const getFlexDirectionFromAlignment = (alignment) => {
  return alignment === "left" ? "flex-start" : alignment === "right" ? "flex-end" : "center";
}

export const getClickLink = async (data, data1 = "", isCTA = false, projects) => {
  let href = "", target = "";
  const link = data1 && data1.link_type !== "Any" ? data1 : data;
  if (!link) return;
  if (link.link_type === "Web" || link.link_type === "Media") {
    const url = data.url.indexOf("#") === 8 ? link.url.substr(8) : link.url;
    if (link.target === "_blank") {
      target = "_blank";
    }
    href = url;
  } else if (link.link_type === "Document") {
    let url = `/${link.uid}`;
    const documents = await queryRepeatableDocuments(
      (doc) => doc.type === "page"
    );
    if (link.type === "page") {
      const linkDoc = documents.find(doc => doc.id === link.id);
      if (linkDoc.data.url_prefix)
        url = `/${linkDoc.data.url_prefix}${url}`;
    }
    if (link.type === "projects" || link.type === "region") {
      url = `/${link.uid}`;
      if (projects) {
        const linkProject = projects.find(project => project.id === link.id);
        if (linkProject && linkProject.data?.region_link?.uid) {
          url = `/projects/${linkProject.data?.region_link?.uid}${url}`;
        }
        else {
          url = `/projects${url}`;
        }
      }
    }
    if (link.type === "stories") {
      url = `/stories${url}`;
    }
    href = url;
  }
  else if (isCTA)
    href = GiveNowUrl;

  return { href, target };
};