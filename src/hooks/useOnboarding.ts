import { useState } from 'react';
import { supabase } from '../lib/supabase/client';

interface OnboardingState {
  step: number;
  role: 'freelancer' | 'client' | null;
  data: Record<string, any>;
}

export function useOnboarding() {
  const [state, setState] = useState<OnboardingState>({
    step: 1,
    role: null,
    data: {}
  });

  const setRole = (role: 'freelancer' | 'client') => {
    setState(prev => ({
      ...prev,
      role,
      step: 2
    }));
  };

  const updateData = (newData: Record<string, any>) => {
    setState(prev => ({
      ...prev,
      data: { ...prev.data, ...newData },
      step: prev.step + 1
    }));
  };

  const completeOnboarding = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user found');

    if (state.role === 'freelancer') {
      const { error: profileError } = await supabase
        .from('freelancer_profiles')
        .upsert({
          user_id: user.id,
          skills: state.data.skills,
          hourly_rate: state.data.hourlyRate,
          experience: state.data.yearsOfExperience,
          availability: state.data.availability
        });

      if (profileError) throw profileError;
    } else {
      const { error: profileError } = await supabase
        .from('client_profiles')
        .upsert({
          user_id: user.id,
          company_name: state.data.companyName,
          company_description: state.data.description,
          industry: state.data.industry,
          size: state.data.size
        });

      if (profileError) throw profileError;
    }

    // Assign role
    const { error: roleError } = await supabase
      .from('user_roles')
      .insert({
        user_id: user.id,
        role_id: state.role === 'freelancer' ? 'freelancer' : 'client'
      });

    if (roleError) throw roleError;
  };

  return {
    currentStep: state.step,
    role: state.role,
    data: state.data,
    setRole,
    updateData,
    completeOnboarding
  };
}