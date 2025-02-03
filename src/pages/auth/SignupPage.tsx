import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthForm } from '../../components/auth/AuthForm';
import { UserTypeSelect } from '../../components/auth/UserTypeSelect';
import { signUp } from '../../lib/supabase/auth/signUp';
import { getAuthErrorMessage } from '../../utils/auth-errors';
import type { SignUpData } from '../../lib/supabase/types';

export function SignupPage() {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'freelancer' | 'client' | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (data: Omit<SignUpData, 'userType'>) => {
    try {
      setError(null);
      setIsLoading(true);

      await signUp({
        ...data,
        userType: userType!
      });

      // Navigate to onboarding after successful signup
      navigate('/onboarding');
    } catch (err) {
      console.error('Signup error:', err);
      setError(getAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  if (!userType) {
    return (
      <AuthLayout 
        title="Create your account"
        subtitle="Choose how you want to use Gigzy"
      >
        <UserTypeSelect onSelect={setUserType} />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title={`Sign up as a ${userType}`}
      subtitle="Create your account to get started"
    >
      <AuthForm 
        type="signup"
        userType={userType}
        onSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}