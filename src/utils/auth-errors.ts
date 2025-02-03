export function getAuthErrorMessage(error: any): string {
  // Handle Supabase specific error codes
  if (error.code === 'user_already_exists' || error.code === '23505') {
    return 'An account with this email already exists. Please sign in instead.';
  }

  // Handle other common error scenarios
  switch (error.message) {
    case 'Invalid login credentials':
      return 'Invalid email or password';
    case 'Email not confirmed':
      return 'Please verify your email address';
    case 'Password should be at least 6 characters':
      return 'Password must be at least 6 characters long';
    case 'User already registered':
    case 'An account with this email already exists. Please sign in instead.':
      return 'An account with this email already exists. Please sign in instead.';
    default:
      return error.message || 'An unexpected error occurred. Please try again.';
  }
}