'use client';

import styled from 'styled-components';
import TestComponent from '@/components/TestComponent';

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  font-family: Arial, Helvetica, sans-serif;
`;

const Title = styled.h1`
  font-size: 3rem;
  color: #0070f3;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.25rem;
  margin-bottom: 2rem;
  text-align: center;
  max-width: 600px;
  line-height: 1.6;
`;

const FeatureList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  text-align: center;
`;

const FeatureItem = styled.li`
  padding: 0.5rem 0;
  font-size: 1.1rem;
  
  &:before {
    content: "✅ ";
    color: #00d084;
  }
`;

export default function Home() {
  return (
    <Container>
      <Title>andandandweb-2</Title>
      <Description>
        A Next.js project configured with styled-components, Turbopack, and custom path mapping.
      </Description>
      
      <FeatureList>
        <FeatureItem>JavaScript (no TypeScript)</FeatureItem>
        <FeatureItem>Styled Components for styling</FeatureItem>
        <FeatureItem>Turbopack for fast builds</FeatureItem>
        <FeatureItem>App directory structure</FeatureItem>
        <FeatureItem>Path mapping: @/* → ./app/*</FeatureItem>
        <FeatureItem>No Tailwind CSS</FeatureItem>
      </FeatureList>
      
      <TestComponent />
    </Container>
  );
}
