import styled from "styled-components";

export const DialogContainer = styled.div<{ width?: string, height?: string }>`
  position: relative;
  border-radius: 5px;
  overflow: hidden;
  box-shadow: 0 0.25em 0.5em rgba(0, 45, 98, .3);
  max-width: ${({width}) => width};
  max-height: ${({height}) => height};
  width: ${({width}) => width ? 'calc(100% - 32px)' : ''};
  height: ${({width}) => width ? 'calc(100% - 32px)' : ''};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;