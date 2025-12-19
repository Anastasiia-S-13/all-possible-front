// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  bio?: string;
}

export type EditProfileData = Pick<User, 'name' | 'email' | 'bio'>;

