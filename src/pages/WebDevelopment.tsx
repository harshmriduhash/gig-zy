import React from "react";
import { Layout } from "../components/layout/Layout";
import { WebDevHero } from "../components/webdev/WebDevHero";
import { WebDevServices } from "../components/webdev/WebDevServices";
import { WebDevExperts } from "../components/webdev/WebDevExperts";
import { WebDevProcess } from "../components/webdev/WebDevProcess";
import { WebDevTestimonials } from "../components/webdev/WebDevTestimonials";

export function WebDevelopment() {
  return (
    <Layout>
      <WebDevHero />
      <WebDevServices />
      <WebDevExperts />
      <WebDevProcess />
      <WebDevTestimonials />
    </Layout>
  );
}
