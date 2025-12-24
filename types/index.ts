export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
