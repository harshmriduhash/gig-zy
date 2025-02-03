import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthLayout } from '../../components/auth/AuthLayout';
import { AuthForm } from '../../components/auth/AuthForm';
import { useAuth } from '../../contexts/AuthContext';
import { getAuthErrorMessage } from '../../utils/auth-errors';

export function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (data: { email: string; password: string }) => {
    try {
      setError(null);
      setIsLoading(true);

      const { data: authData, error: signInError } = await signIn(data.email, data.password);
      
      if (signInError) throw signInError;

      // Redirect based on role or return URL
      if (authData?.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (authData?.role === 'freelancer') {
        navigate('/find-work');
      } else if (authData?.role === 'client') {
        navigate('/post-project');
      } else {
        navigate(from, { replace: true });
      }
    } catch (err) {
      console.error('Login error:', err);
      setError(getAuthErrorMessage(err));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout 
      title="Welcome back"
      subtitle="Sign in to your account"
    >
      <AuthForm 
        type="login"
        onSubmit={handleSubmit}
        error={error}
        isLoading={isLoading}
      />
    </AuthLayout>
  );
}