// app/(site)/profile/[userId]/edit/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { EditProfileFormValues } from "@/types/User";
import { updateProfileFormData } from "@/lib/api/clientApi";
import EditProfileForm from "./EditProfileForm";

export default function EditProfilePage() {
  const params = useParams<{ userId: string }>();
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [initialValues, setInitialValues] = useState<EditProfileFormValues>({
    name: "",
    email: "",
    bio: "",
    avatarFile: null,
  });

  const [avatarPreview, setAvatarPreview] = useState("");

  useEffect(() => {
    if (!currentUser) return;
    if (params.userId !== currentUser.id) notFound();

    setInitialValues({
      name: currentUser.name,
      email: currentUser.email,
      bio: currentUser.bio,
      avatarFile: null,
    });

    setAvatarPreview(currentUser.avatar || "");
  }, [currentUser, params.userId]);

  const handleAvatarSelect = (file: File) => {
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (values: EditProfileFormValues) => {
    if (!currentUser) return;

    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("bio", values.bio || "");
      if (values.avatarFile) formData.append("avatar", values.avatarFile);
      const updatedUser = await updateProfileFormData(formData);
      const normalizedUser = {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        avatar: updatedUser.avatar,
        bio: updatedUser.bio,
      };
      setUser(normalizedUser);
      toast.success("Профіль успішно оновлено!");
      router.push(`/profile/${normalizedUser.id}`);
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Помилка оновлення профілю");
    }
  };

  if (!currentUser) return <p>Завантаження...</p>;

  return (
    <EditProfileForm
      initialValues={initialValues}
      avatarPreview={avatarPreview}
      onSubmit={handleSubmit}
      onAvatarSelect={handleAvatarSelect}
    />
  );
}
