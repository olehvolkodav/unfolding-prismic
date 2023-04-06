import React, { useState, useEffect } from "react";
import { RichText } from "prismic-reactjs";
import { useRouter } from "next/router";
import styled from "styled-components";

import { Text, Caption } from "components/atoms/Typography";
import { GiveNowUrl } from "utils/general";

export default function ProjectMenuWindow({
  onBack,
  isOpen,
  regions,
  onClose,
  blogData,
  isOpenNewsBar,
  forwardRef,
}) {
  const router = useRouter();
  const [isTempOpen, setTempOpen] = useState(true);

  useEffect(() => {
    setTimeout(() => setTempOpen(false), []);
  }, []);

  const goRegionPage = (region) => {
    router.push(`/projects/${region.uid}`);
    onClose();
  };

  return (
    <Container isOpen={isOpen} ref={forwardRef} isOpenNewsBar={isOpenNewsBar} isTempOpen={isTempOpen}>
      <MainContainer>
        <DetailContainer>
          <ProjectsColumn>
            <ColumnTitle>Projects</ColumnTitle>
            <ProjectColumnListWrapper>
              {regions?.map((region, index) => (
                <a onClick={() => goRegionPage(region)} key={index}>
                  <div className="region-item">
                    <img
                      src={region.data.icon.url}
                      width={region.data.icon.dimensions.width}
                      height={region.data.icon.dimensions.height}
                    />
                    <div>
                      <Caption color="black">
                        {RichText.asText(region.data.region_name)}
                      </Caption>
                      <Text color="#bdbdbd">
                        {RichText.asText(region.data.people_groups)}
                      </Text>
                    </div>
                  </div>
                </a>
              ))}
            </ProjectColumnListWrapper>
          </ProjectsColumn>
          <RecentProjectUpdatesColumn>
            <ColumnTitle>Stories From the Field</ColumnTitle>
            <ProjectUpdatesListWrapper>
              {blogData.stories?.slice(0, 5).map((story, index) => (
                <ProjectUpdateItem key={index}>
                  <ProjectUpdateItemTitle href={`/stories/${story.uid}`}>
                    {RichText.asText(story.data.title)}
                  </ProjectUpdateItemTitle>
                  <ProjectUpdateItemContent>
                    {RichText.asText(story.data.description).length > 125
                      ? RichText.asText(story.data.description).slice(0, 125) +
                      "..."
                      : RichText.asText(story.data.description)}
                  </ProjectUpdateItemContent>
                </ProjectUpdateItem>
              ))}
            </ProjectUpdatesListWrapper>
          </RecentProjectUpdatesColumn>
          <MenuRightPanel
            onClose={onClose}
          />
        </DetailContainer>
        <CloseButton onClick={onClose}>×</CloseButton>
      </MainContainer>
    </Container>
  );
}

const MenuRightPanel = () => {
  return (
    <>
      <LearnMoreColumn>
        <LearnMoreColumnWrapper>
          <LearnMoreHeadLine>
            Equip Churches Worldwide with Bible Translation Tools
          </LearnMoreHeadLine>
          <LearnMoreButtonWrapper>
            <a href={GiveNowUrl}>Give Now</a>
          </LearnMoreButtonWrapper>
        </LearnMoreColumnWrapper>
      </LearnMoreColumn>
    </>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  top: ${({ isOpenNewsBar }) => (isOpenNewsBar ? 166 : 108)}px;
  justify-content: center;
  z-index: 99999;
  background: #fff;
  display: ${({ isTempOpen, isOpen }) => (isTempOpen || isOpen ? "flex" : "none")};
  opacity: ${({ isTempOpen }) => (isTempOpen ? "0" : "1")};
`;

const BackIcon = styled.div`
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 14px;
  cursor: pointer;

  @media (min-width: 1224px) {
    display: none;
  }
`;

const MainContainer = styled.div`
  width: 60%;

  padding: 20px 50px;
  border-radius: 6px;
  position: relative;
  @media (min-width: 768px) {
    width: 80%;
  }

  @media (min-width: 1224px) {
    padding: 30px 50px 20px;
  }

  /* &::before {
    content: "";
    background: #383838;
    width: 30px;
    height: 12px;
    clip-path: polygon(0px 0px, 50% 100%, 100% 0);
    position: absolute;
    top: -3px;
    right: 180px;
    @media (min-width: 2560px) {
      right: 135px;
    }
    @media (max-width: 1440px) {
      height: 0;
    }
  } */
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  @media (min-width: 768px) {
    flex-direction: row;
  }
  .right-panel {
    display: flex;
    flex-direction: column;
    width: 25%;
    align-items: flex-end;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
`;

const ProjectsColumn = styled.div`
  margin-bottom: 20px;

  @media (min-width: 1024px) {
    width: 70%;
    margin-bottom: 0px;
  }

  @media (min-width: 1400px) {
    width: 45%;
  }
`;

const ColumnTitle = styled.div`
  font-size: 17px;
  font-weight: bold;
  margin-bottom: 2rem;
  color: #424242;
`;

const ProjectColumnListWrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  justify-content: flex-start;
  align-items: center;

  grid-gap: 20px 50px;
  padding-right: 20px;
  .region-item {
    cursor: pointer;
    &:hover {
      opacity: 0.7;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: auto auto;
  }

  h5 {
    margin: 0;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  }
  span {
    margin: 0;
    text-align: left;
    line-height: 160%;
  }
  div {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    img {
      margin-right: 10px;
      width: 72px;
      height: auto;
    }
    div {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }
  }
`;

const RecentProjectUpdatesColumn = styled.div`
  margin-bottom: 20px;

  @media (min-width: 1024px) {
    width: 30%;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    margin-bottom: 0px;
  }
`;

const ProjectUpdatesListWrapper = styled.div`
  margin-top: 20px;
`;

const ProjectUpdateItem = styled.div`
  margin-bottom: 1.1rem;
`;

const ProjectUpdateItemTitle = styled.a`
  text-align: left;
  font-size: 15px;
  font-weight: 600;
  color: #424242;
  text-decoration: none;
  &:hover {
    color: #014263;
  }
`;

const ProjectUpdateItemContent = styled.div`
  margin-top: 5px;
  text-align: left;
  font-size: 12px;
  color: #bdbdbd;
`;

const MoreHref = styled.a`
  font-size: 14px;
  color: #1392ff;
`;

const LearnMoreColumn = styled.div`
  display: none;

  @media (min-width: 1400px) {
    display: block;
    width: 25%;
  }
`;

const LearnMoreColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid #1392ff;
  border-radius: 5px;
  padding: 20px;
  text-align: center;

  img {
    width: 150px;
    margin: 10px auto 20px;
  }
`;

const LearnMoreHeadLine = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const LearnMoreButtonWrapper = styled.div`
  margin-top: 30px;
  a {
    border: none;
    outline: none;
    padding: 14px 50px;
    background-color: #f7b905fa;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    color: #fff;
    font-weight: bold;
    font-size: 16px;
    text-decoration: none;
    &:hover {
      background-color: #ffbe00b0;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 10px;
  font-size: 1.8rem;
  font-weight: 600;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  &:hover {
    color: #014263;
  }
`;