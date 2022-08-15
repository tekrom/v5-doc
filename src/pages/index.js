import React from 'react';
import {
  Section,
  Text,
  SectionHeader,
} from '@algolia/ui-library';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

function Home() {
  const { siteConfig } = useDocusaurusContext();

  return (
    /* ToDo: min vh değerleri gerekli */
    <div className="uil-bgc-moon">
      <Section className="min-vh-75">
        <SectionHeader title="v5 Döküman">
          <Text className="m-auto" style={{ maxWidth: '800px' }}>
            <div>
              Dökümana gitmek için <a href="/docs/tr-introduction">Tıkla</a>
            </div>
            <div>
              Tema Marketine gitmek için <a href="https://tsoftthemes.com" target="_blank">Tıkla</a>
            </div>
            <div>
              T-Soft ana sayfasına gitmek için <a href="https://tsoft.com.tr" target="_blank">Tıkla</a>
            </div>
          </Text>
        </SectionHeader>
      </Section>
    </div>
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
