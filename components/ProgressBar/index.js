import React from "react";
import styled from "styled-components";
import { css } from "styled-components";

const ProgressBar = (props) => {
  const { label, bgColor, progressColor, percent, inverse = false } = props;

  if (typeof percent === "undefined") return <></>;

  return (
    <>
      <ProgressTitle inverse={inverse}>
        {!!label ? label : "Project Progress"}
      </ProgressTitle>
      <ContainerStyles bgColor={bgColor}>
        <FillerStyles percent={percent} progressColor={progressColor}>
          {/* <LabelStyles>{`${percent}%`}</LabelStyles> */}
        </FillerStyles>
      </ContainerStyles>
    </>
  );
};

const ContainerStyles = styled.div`
  height: 20px;
  width: 100%;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 5px;
`;

const FillerStyles = styled.div`
  height: 100%;
  width: ${({ percent }) => `${percent}%`};
  background-color: ${({ progressColor }) => progressColor};
  border-radius: 5px 0 0 5px;
  text-align: right;
`;

const ProgressTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #8e8e8e;
  margin-bottom: 2px;
  margin-top: 10px;
  text-transform: uppercase;

  ${({ inverse }) =>
    inverse == true &&
    css`
      color: #fff;
    `}
`;

const LabelStyles = styled.span`
  padding: 5px;
  color: white;
  font-weight: bold;
`;

export default ProgressBar;
