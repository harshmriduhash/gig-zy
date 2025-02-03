import React from 'react';
import { Layout } from '../../components/layout/Layout';
import { ProfileHeader } from './components/ProfileHeader';
import { SkillsSection } from './components/SkillsSection';
import { PortfolioSection } from './components/PortfolioSection';
import { RatesSection } from './components/RatesSection';
import { SummarySection } from './components/SummarySection';

export function ProfileBuilderPage() {
  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProfileHeader />
        <div className="mt-8 space-y-8">
          <SummarySection />
          <SkillsSection />
          <RatesSection />
          <PortfolioSection />
        </div>
      </div>
    </Layout>
  );
}