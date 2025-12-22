// types/User.ts

import { Tool } from "./Tool";

export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  bio?: string;
  avatar?: string;
  feedbackCount?: number;
  rating?: number;
}

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
