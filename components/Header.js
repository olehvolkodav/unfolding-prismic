import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import MenuLinks from "components/atoms/MenuLinks";
import LightTopBar from "components/organisms/Topbar";
import ProjectsDetailWindow from "components/HeaderMenuWIndow/ProjectsMenuWindow";
import { useClickOutside } from "hooks";
import { GiveNowUrl } from "utils/general";
import Anouncementbar from "./organisms/AnouncementBar";

const Header = ({ regions, updates, blogData, cta, navigationLinks, isMobileMenuOpen, setIsMobileMenuOpen, projects }) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState(null);
  const [isOpenNewsBar, setIsOpenNewsBar] = useState(
    cta?.data && Object.keys(cta?.data?.announce_content[0]).length
  );

  const handleClickMenuItem = (menuLink) => {
    if (menuLink === selectedMenuItem) {
      return setSelectedMenuItem(null);
    }
    setSelectedMenuItem(menuLink);
    setIsMobileMenuOpen(false);
  };

  const handleClickBackMenu = () => {
    setSelectedMenuItem(null);
    setIsMobileMenuOpen(true);
  };

  const menuWndRef = useRef(null);
  const emptyRef = useRef(null);
  useClickOutside(selectedMenuItem ? menuWndRef : emptyRef, () =>
    setSelectedMenuItem(null)
  );

  const onCloseAnnouce = () => {
    setIsOpenNewsBar(false);
    window.sessionStorage.setItem("showAnnounceBar", false);
  };

  useEffect(() => {
    const isShowAnnunce = window.sessionStorage.getItem("showAnnounceBar");
    if (isShowAnnunce === "false") setIsOpenNewsBar(false);
  }, []);

  return (
    <Container>
      {!!cta?.data && (
        <Anouncementbar
          data={cta.data}
          open={isOpenNewsBar}
          onClose={onCloseAnnouce}
        />
      )}

      <LightTopBar />
      <div>
        <MenuArea>
          <RightArea>
            <a href="/">
              <Logo src="/ufw-assets/images/icons/logo.svg" />
            </a>
            <IconMenu
              src="/ufw-assets/images/icons/icon-menu.svg"
              alt=""
              onClick={() => setIsMobileMenuOpen(true)}
            />
          </RightArea>
          <MenuLinkWrapper>
            <MenuLinkWrapper>
              <MenuLinks
                isMobileMenuOpen={isMobileMenuOpen}
                onClickMenu={handleClickMenuItem}
                data={{ regions }}
                navigationLinks={navigationLinks}
                projects={projects}
              />
            </MenuLinkWrapper>
            <RightBtnArea>
              <a href={GiveNowUrl}>Give Now</a>
            </RightBtnArea>
          </MenuLinkWrapper>
        </MenuArea>
        <ProjectsDetailWindow
          onBack={handleClickBackMenu}
          isOpen={selectedMenuItem === "projects"}
          onClose={() => setSelectedMenuItem(null)}
          regions={regions}
          updates={updates}
          forwardRef={menuWndRef}
          blogData={blogData}
          isOpenNewsBar={isOpenNewsBar}
        />
        {isMobileMenuOpen && (
          <MobileMenuWrapper>
            <MobileMenuHeader>
              <CloseMobileMenuButton onClick={() => setIsMobileMenuOpen(false)}>
                &times;
              </CloseMobileMenuButton>
            </MobileMenuHeader>
            <MobileMenuLinkWrapper>
              <MenuLinks
                isMobileMenuOpen={isMobileMenuOpen}
                onClickMenu={handleClickMenuItem}
                data={{ regions }}
                navigationLinks={navigationLinks}
                projects={projects}
              />
            </MobileMenuLinkWrapper>
          </MobileMenuWrapper>
        )}
      </div>
    </Container>
  );
};
export default Header;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 999;
`;

const MenuArea = styled.header`
  height: 30px;
  display: flex;
  font-weight: 700;
  justify-content: space-between;
  flex-direction: column;
  padding: 20px 40px;

  @media (min-width: 1024px) {
    padding: 20px 40px;
    align-items: center;
    flex-direction: row;
  }

  @media (min-width: 1224px) {
    align-items: center;
    flex-direction: row;
  }
`;

const Logo = styled.img`
  display: inline-block;
  font-size: 40px;
  font-weight: 900;
  height: 40px;
`;
const RightArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 1224px) {
    width: auto;
    margin-right: 25px;
    margin-left: 150px;
  }
`;

const IconMenu = styled.img`
  width: 44px;
  height: 44x;
  cursor: pointer;

  @media (min-width: 1024px) {
    display: none;
  }
`;

const MenuLinkWrapper = styled.div`
  display: none;
  @media (min-width: 1024px) {
    display: flex;
    flex-shrink: 0;
    margin-right: 15px;
  }
`;

const RightBtnArea = styled.div`
  display: flex;
  align-items: center;

  @media (min-width: 1224px) {
    display: flex;
  }

  a {
    display: block;
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

const MobileMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  position: fixed;
  z-index: 50;
  top: 0;
  left: 0;
  padding-top: 1rem;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.95);
  overflow-y: hidden;
  transition: 0.5s;
  z-index: 101;
`;

const MobileMenuHeader = styled.div`
  width: 100%;
`;

const CloseMobileMenuButton = styled.a`
  text-decoration: none;
  font-size: 36px;
  color: #fff;
  display: block;
  transition: 0.3s;
  position: absolute;
  top: 10px;
  right: 20px;
  font-size: 40px;
  &:hover {
    cursor: pointer;
  }
`;

const MobileMenuLinkWrapper = styled.div`
  padding: 40px;

  @media (min-width: 1024px) {
    padding: 40px 135px;
  }
`;
