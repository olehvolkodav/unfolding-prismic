import RegionUpdate from "components/organisms/Region/RegionUpdate";
import React from "react";
import styled from "styled-components";

const PrayerRequestsList = ({ slice, region_updates }) => {
  return (
    <Wrapper backgroundColor={slice.primary.slice_background_color} isMobileHide = {slice.primary.hide_on_mobile}>
      <RegionUpdate
        pageType="project"
        data={region_updates}
        limitCount={12}
        isPrayerRequestsList={true}
        backgroundColor={slice.primary.slice_background_color}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ backgroundColor }) => backgroundColor ? backgroundColor : "white"};
  @media (max-width: 576px) {
    display: ${({ isMobileHide }) => isMobileHide ? "none" : "block"};
  }
`;

export default PrayerRequestsList;