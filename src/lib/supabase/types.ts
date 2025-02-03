export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  userType: 'freelancer' | 'client';
}

export interface SignInData {
  email: string;
  password: string;
}

export interface AuthError extends Error {
  status?: number;
  code?: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
}

export interface Permission {
  id: string;
  name: string;
  description?: string;
}