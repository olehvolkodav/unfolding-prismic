import { useState, useEffect, useCallback } from "react";

import { queryRepeatableDocuments } from "utils/queries";
import { GiveNowUrl } from "utils/general";

const useClickLink = (data, data1 = "", isCTA = false, projects = null) => {
  const [href, setHref] = useState("");
  const [target, setTarget] = useState("");

  useEffect(() => {
    const loadConf = async () => {
      let localHref = "", localTarget = "_self";
      const link = data1 && data1?.link_type !== "Any" ? data1 : data;
      if (!link) return;
      if (link.link_type === "Web" || link.link_type === "Media") {
        const url = link.url.indexOf("#") === 8 ? link.url.substr(8) : link.url;
        if (link.target === "_blank") {
          localTarget = "_blank";
        }
        localHref = url;
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
        localHref = url;
      }
      else if (isCTA)
        localHref = GiveNowUrl;
      setHref(localHref);
      setTarget(localTarget);
    }

    loadConf();
  }, [data, data1, isCTA]);

  const handleClickLink = useCallback(async (e, data, data1 = "", isCTA = false, projects) => {
    e.preventDefault();
    const link = data1 && data1.link_type !== "Any" ? data1 : data;
    if (!link) return;
    if (link.link_type === "Web" || link.link_type === "Media") {
      const url = link.url.indexOf("#") === 8 ? link.url.substr(8) : link.url;
      if (link.target === "_blank") {
        window.open(url, "_blank");
      } else {
        window.open(url, "_self");
      }
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
      window.open(url, "_self");
    }
    else if (isCTA)
      window.open(GiveNowUrl, "_self");
  }, []);

  return { href, target, handleClickLink };
}

export default useClickLink;