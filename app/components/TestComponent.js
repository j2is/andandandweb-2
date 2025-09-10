'use client';

import styled from 'styled-components';

const StyledDiv = styled.div`
  background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
  padding: 1rem;
  border-radius: 8px;
  margin: 1rem 0;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export default function TestComponent() {
  return (
    <StyledDiv>
      This component was imported using the @ path alias!
    </StyledDiv>
  );
}