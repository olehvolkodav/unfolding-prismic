import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { hexToRgb, compressSetting } from "utils/general";

export const Section = ({
  children,
  sectionCss,
  wrapperCss,
  bgImg,
  bgColor,
  maskColor,
  maskOpacity,
  forwardRef,
  narrow = false
}) => {

  const [rgbaMaskColor, setRgbaMaskColor] = useState(null);
  useEffect(() => {
    if (!!maskColor) {
      const rgb = hexToRgb(maskColor);
      setRgbaMaskColor(
        `rgba(${rgb.r},${rgb.g},${rgb.b}, ${(maskOpacity ?? 100) / 100
        })`
      );
    }
  }, [maskColor, maskOpacity]);

  return (
    <ContainerEl
      additionalCss={sectionCss}
      bgImg={bgImg}
      bgColor={bgColor}
      ref={forwardRef}
      narrow={narrow}
    >
      {!!maskColor && (
        <MaskBg maskColor={rgbaMaskColor} />
      )}
      <Wrapper additionalCss={wrapperCss} narrow={narrow}>
        {children}
      </Wrapper>
    </ContainerEl>
  );
};

const ContainerEl = styled.section`

  width: 100%;
  position: relative;

  ${props =>
    props.additionalCss &&
    props.additionalCss
  }

  ${props =>
    props.bgImg &&
    css`
      background: url(${compressSetting(props.bgImg.url, props.bgImg.dimensions?.width)}) no-repeat center center;
      background-size: cover;
    `
  }

  ${props =>
    props.bgColor &&
    css`
      background-color:${props.bgColor};
    `
  }

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin-left: auto;
  margin-right: auto;
  padding: 4rem 1rem;
  box-sizing: border-box;

  @media (min-width: 768px) {
    width: 100%;
  }
  
  @media (min-width: 1024px) {
    margin: auto;
    max-width: 1400px;
    ${props =>
    !!props.narrow &&
    css`
        width: 65%;  
      `
  }}

  ${props =>
    props.additionalCss &&
    props.additionalCss
  }
`
const MaskBg = styled.div`
  ${({ maskColor }) => Boolean(maskColor) && `background-color: ${maskColor};`}
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`;