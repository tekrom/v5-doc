import React from 'react';
import {
  LightCta,
  Section,
  SectionTitle,
  Button,
  Text,
  TextBlock,
  Hero,
  SectionHeader,
  LabelText,
  TextBlocksGrid,
  Card,
  CardsGrid,
} from '@algolia/ui-library';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';

import showcaseProjects from './showcase-projects.json';
import demoProjects from './demo-projects.json';
import { DocSearchLogo } from '../components/DocSearchLogo';

function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <>
      <Section>
        <SectionHeader title="v5 Döküman">
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            We're kind of scratching our own itch here. As developers, we spend
            a lot of time reading documentation, and it isn’t always easy to
            find the information we need.
          </Text>
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            No one's to blame, building a good search is a complex challenge. We
            just happen to have a lot of experience doing that, and we want to
            share it with the developer community.
          </Text>
        </SectionHeader>
      </Section>

    </>
  );
}

function HomePage() {
  return (
    <Layout
      title="T-SOFT v5 Documentation"
      description="T-SOFT v5 standart temasına ait tüm detayları bulabileceğiniz dökümantasyon."
    >
      <Home />
    </Layout>
  );
}

export default HomePage;
