export type User = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
  createdAt: string;
  updatedAt: string;
};

export type EditProfileData = Pick<User, "name" | "email" | "bio">;
