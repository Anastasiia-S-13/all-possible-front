// types/User.ts

import { Tool } from "./Tool";
export interface User {
  id: string;
  name: string;
  email: string;
  createdAt?: string;
  bio?: string;
  avatar?: string;
};

export type EditProfileData = Pick<User, 'name' | 'email' | 'bio' | 'avatar'>;

export interface UserProfileProps {
  user: {
    name: string;
    avatar?: string; 
  };
  userId: string;
    tools?: Tool[];
    containerClassName?: string;
}

  export interface EditProfileFormValues {
    name: string;
    email: string;
    bio?: string;
    avatarFile: File | null;
  }
