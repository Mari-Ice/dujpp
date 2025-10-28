import styled from "styled-components";

export const OverlayContainer = styled.div<{ hidden?: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: ${({hidden}) => hidden ? 0 : 1};
  pointer-events: ${({hidden}) => hidden ? 'none' : 'auto'};
  transition: opacity 300ms ease;
`;