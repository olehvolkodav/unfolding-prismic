import React, { useCallback } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

import { GiveNowUrl } from "utils/general";

const Anouncementbar = ({ data, onClose, open }) => {
  const router = useRouter();

  const onClickAnnounmentLink = useCallback((e) => {
    e.preventDefault();
    const announceContent = data.announce_content[0];
    const contentData = announceContent.spans.length > 0 ? announceContent.spans[0].data : null;
    if (contentData && contentData.link_type === "Web") {
      if (contentData.target === "_blank") {
        window.open(contentData.url, "_blank");
      } else {
        router.push(contentData.url);
      }
    } else if (contentData && contentData.uid) {
      let url = `/${contentData.uid.replace("_", "/")}`;
      if (contentData.type === "stories") {
        url = `/stories/${contentData.uid}`;
      } else if (contentData.type === "page") {
        url = "/";
      }
      router.push(url);
    } else {
      router.push(GiveNowUrl);
    }
  }, [data]);

  return (
    <>
      {
        data.announce_content.length > 0 &&
        <Container open={open}>
          <AnnouncementLink onClick={onClickAnnounmentLink}>
            {data.announce_content[0].text}
          </AnnouncementLink>
          <CloseButtonWrapper>
            <CloseButton onClick={onClose}>×</CloseButton>
          </CloseButtonWrapper>
        </Container>
      }
    </>
  );
};

export default Anouncementbar;

const Container = styled.div`
  background-color: #222222;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;

  display: ${({ open }) => (open ? "block" : "none")};
  .content {
    * {
      color: white !important;
      font-size: 1.1rem;
      margin: 0;
      padding: 15px 0;
      text-align: center;
    }
  }
`;

const AnnouncementLink = styled.p`
  text-decoration: underline;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  text-align: center;
`;

const CloseButton = styled.button`
  font-size: 1.6rem;
  font-weight: 400;
  border: none;
  outline: none;
  background-color: transparent;
  color: white;
  padding: 0;
  cursor: pointer;
`;

const CloseButtonWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 25px;
  width: 51px;
  height: 51px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #1d1d1d;
    cursor: pointer;
  }
`;
