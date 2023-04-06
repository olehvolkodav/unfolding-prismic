import React, { useEffect, useRef } from "react";
import styled, { css } from "styled-components";

import { Section } from "components/atoms/Section";

const Code = ({ slice }) => {
  const codeRef = useRef(null);

  useEffect(() => {
    if (!codeRef.current) return;
    let script = "";
    slice.primary.script.forEach(item => script += item.text);
    codeRef.current.innerHTML = script;
  }, [slice, codeRef.current])
  return (
    <Section wrapperCss={wrapperCss({isMobileHide: slice.primary.hide_on_mobile})}>
      <CodeWrapper ref={codeRef} />
    </Section>
  );
}

export default Code;

const CodeWrapper = styled.div`
  width: 100%;
`;

const wrapperCss = ({isMobileHide}) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 576px) {
    display: ${isMobileHide ? "none" : "flex"};
  }
`;