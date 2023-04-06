import React from 'react';
import styled from "styled-components";
import PropTypes from 'prop-types';

const TabItemWrapper = styled.a`
  position: relative;
  padding: 10px 20px;
  border-bottom: 5px solid #000;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: rgba(0, 0, 0, 0.9);
  text-decoration: none;
  @media (min-width:768px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const InActiveTabItemWrapper = styled.a`
  cursor: pointer;
  padding: 10px 20px 14px;
  border-bottom: 5px solid #fff;
  text-align: center;
  border-bottom: 1px solid #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0.3;
  filter: grayscale(100%);
  text-decoration: none;
  @media (min-width:768px) {
    padding-left: 40px;
    padding-right: 40px;
  }
`;

const TabTitle = styled.p`
  margin: 10px 0;
  font-weight: 300;
  font-size: 16px;
  white-space: nowrap;
`;

const TabItemComponent = ({ title = '', onTabItemClicked = null, isActive = false, link = null }) => {
  return (
    <>
      {
        onTabItemClicked ?
          isActive ? (
            <TabItemWrapper onClick={onTabItemClicked}>
              <TabTitle>
                {title}
              </TabTitle>
            </TabItemWrapper>
          ) : (
            <InActiveTabItemWrapper onClick={onTabItemClicked}>
              <TabTitle>{title}</TabTitle>
            </InActiveTabItemWrapper>
          ) :
          isActive ? (
            <TabItemWrapper>
              <TabTitle>
                {title}
              </TabTitle>
            </TabItemWrapper>
          ) : (
            <InActiveTabItemWrapper href={link?.href}>
              <TabTitle>
                {title}
              </TabTitle>
            </InActiveTabItemWrapper>
          )
      }
    </>
  );
};

TabItemComponent.propTypes = {
  title: PropTypes.string,
  isActive: PropTypes.bool,
  onTabItemClicked: PropTypes.func,
};

TabItemComponent.defaultProps = {
  title: '',
  isActive: false,
  onTabItemClicked: null,
};

export default TabItemComponent;
