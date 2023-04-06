import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";

const Wrapper = styled.div``;

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, onClickOutside) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside();
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ children, onClickOutside }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onClickOutside);

  return <Wrapper ref={wrapperRef}>{children}</Wrapper>;
}

OutsideAlerter.propTypes = {
  children: PropTypes.element.isRequired,
  onClickOutside: PropTypes.func,
};

OutsideAlerter.defaultProps = {
  onClickOutside: () => {},
};

export default OutsideAlerter;
