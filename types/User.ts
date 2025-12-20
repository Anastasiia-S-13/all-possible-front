// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  bio?: string;
  avatar?: string;
};

export interface UserProfileProps {
  user: { name: string; avatar?: string };
  userId: string;
  containerClassName?: string;
}

export type EditProfileData = Pick<User, 'name' | 'email' | 'bio' | 'avatar'>;

