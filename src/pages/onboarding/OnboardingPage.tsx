import React from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingLayout } from '../../components/onboarding/OnboardingLayout';
import { UserTypeSelect } from '../../components/auth/UserTypeSelect';
import { SkillsForm } from '../../components/onboarding/freelancer/SkillsForm';
import { ExperienceForm } from '../../components/onboarding/freelancer/ExperienceForm';
import { CompanyForm } from '../../components/onboarding/client/CompanyForm';
import { useOnboarding } from '../../hooks/useOnboarding';

export function OnboardingPage() {
  const navigate = useNavigate();
  const { currentStep, role, setRole, updateData, completeOnboarding } = useOnboarding();

  const handleComplete = async () => {
    try {
      await completeOnboarding();
      navigate(role === 'freelancer' ? '/find-work' : '/post-project');
    } catch (error) {
      console.error('Failed to complete onboarding:', error);
    }
  };

  const renderStep = () => {
    if (!role) {
      return (
        <OnboardingLayout
          title="Welcome to Gigzy"
          subtitle="Let's get started by setting up your account"
          step={1}
          totalSteps={role === 'freelancer' ? 3 : 2}
        >
          <UserTypeSelect onSelect={setRole} />
        </OnboardingLayout>
      );
    }

    if (role === 'freelancer') {
      if (currentStep === 2) {
        return (
          <OnboardingLayout
            title="Your Skills"
            subtitle="Add the skills you want to offer"
            step={2}
            totalSteps={3}
          >
            <SkillsForm onSubmit={updateData} />
          </OnboardingLayout>
        );
      }

      if (currentStep === 3) {
        return (
          <OnboardingLayout
            title="Experience & Availability"
            subtitle="Tell us about your experience and preferences"
            step={3}
            totalSteps={3}
          >
            <ExperienceForm onSubmit={handleComplete} />
          </OnboardingLayout>
        );
      }
    }

    if (role === 'client') {
      if (currentStep === 2) {
        return (
          <OnboardingLayout
            title="Company Details"
            subtitle="Tell us about your company"
            step={2}
            totalSteps={2}
          >
            <CompanyForm onSubmit={handleComplete} />
          </OnboardingLayout>
        );
      }
    }
  };

  return renderStep();
}