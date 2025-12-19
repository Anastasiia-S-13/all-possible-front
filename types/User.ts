// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  bio?: string;
};

export interface UserProfileProps {
  user: { name: string };
  isOwner: boolean; 
}

export type EditProfileData = Pick<User, 'name' | 'email' | 'bio'>;

