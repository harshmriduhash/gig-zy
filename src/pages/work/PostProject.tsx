import React from "react";
import { Layout } from "../../components/layout/Layout";
import { WorkHeader } from "../../components/work/WorkHeader";
import { ProjectForm } from "../../components/work/post/ProjectForm";

export function PostProjectPage() {
  return (
    <Layout>
      <WorkHeader
        title="Post a Project"
        description="Share your project details and connect with talented freelancers ready to bring your vision to life"
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ProjectForm />
      </div>
    </Layout>
  );
}
