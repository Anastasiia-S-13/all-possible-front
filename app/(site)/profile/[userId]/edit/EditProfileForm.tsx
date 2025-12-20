'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, notFound } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAuthStore } from '@/stores/authStore';
import { updateProfileFormData } from '@/lib/api/clientApi';
import Button from '@/components/Button';
import styles from '@/EditProfile.module.css';
import { toast } from 'react-hot-toast';

interface EditProfileValues {
  name: string;
  email: string;
  bio: string;
  avatarFile?: File | null;
}

const editProfileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має бути не менше 2 символів")
    .max(32, "Ім'я має бути не більше 32 символів")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email('Невірний формат email')
    .max(64, 'Email має бути не більше 64 символів')
    .required("Email обов'язковий"),
  bio: Yup.string().max(200, 'Bio має бути не більше 200 символів'),
});

export default function EditProfilePage() {
  const params = useParams();
  const router = useRouter();
  const currentUser = useAuthStore(state => state.user);
  const setUser = useAuthStore(state => state.setUser);

  const [initialValues, setInitialValues] = useState<EditProfileValues>({
    name: '',
    email: '',
    bio: '',
    avatarFile: null,
  });

  const [avatarPreview, setAvatarPreview] = useState<string>('');

  useEffect(() => {
  if (!currentUser) return; // чекаємо на завантаження
  if (params.userId !== currentUser.id) notFound();
  setInitialValues({
    name: currentUser.name,
    email: currentUser.email,
    bio: currentUser.bio || '',
    avatarFile: null,
  });
}, [currentUser, params.userId]);

      const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFieldValue('avatarFile', files[0]);
      setAvatarPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (values: EditProfileValues) => {
    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('bio', values.bio);
      if (values.avatarFile) formData.append('avatar', values.avatarFile);

      const updatedUser = await updateProfileFormData(formData);

      setUser(updatedUser);
      toast.success('Профіль успішно оновлено!');
      router.push(`/profile/${currentUser?.id}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Не вдалося оновити профіль');
    }
  };

  if (!currentUser) return <p>Завантаження...</p>;

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Редагування профілю</h1>

      {avatarPreview && (
        <div className={styles.avatarWrapper}>
          <img src={avatarPreview} alt="Avatar" className={styles.avatarPreview} />
        </div>
      )}

      <Formik
        initialValues={initialValues}
        validationSchema={editProfileSchema}
        enableReinitialize
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Ім'я</label>
              <Field name="name" type="text" className={styles.input} />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email">Email</label>
              <Field name="email" type="email" className={styles.input} />
              <ErrorMessage name="email" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio">Bio</label>
              <Field name="bio" as="textarea" className={styles.textarea} />
              <ErrorMessage name="bio" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="avatar">Avatar</label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" disabled={isSubmitting} className={styles.submitButton}>
              {isSubmitting ? 'Збереження...' : 'Зберегти'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
