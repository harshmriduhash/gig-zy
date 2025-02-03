import React from 'react';
import { HeroSection } from '../components/hero/HeroSection';
import { WhyChooseGigzy } from '../components/features/WhyChooseGigzy';
import { FeaturedSection } from '../components/features/FeaturedSection';
import { AINicheServices } from '../components/services/ai-niche/AInicheServices';
import { GigzyPro } from '../components/GigzyPro';
import { BlogSection } from '../components/blog/BlogSection';
import { NewsletterSubscribe } from '../components/newsletter/NewsletterSubscribe';

export function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseGigzy />
      <FeaturedSection />
      <AINicheServices />
      <GigzyPro />
      <BlogSection />
      <NewsletterSubscribe />
    </>
  );
}