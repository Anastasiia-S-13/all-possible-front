// app/(site)/profile/[userId]/edit/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, notFound } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/stores/authStore';
import Button from '@/components/Button';
import styles from './EditProfile.module.css';
import { EditProfileValues, User } from '@/types/User';
import { editProfileSchema } from '@/lib/validation/validateUser';
import { updateProfileFormData } from '@/lib/api/clientApi';

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
    if (!currentUser) return;

    if (params.userId !== currentUser.id) notFound();

    setInitialValues({
      name: currentUser.name,
      email: currentUser.email,
      bio: currentUser.bio || '',
      avatarFile: null,
    });

    setAvatarPreview(currentUser.avatar || '');
  }, [currentUser, params.userId]);

  const handleAvatarChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: any) => void
  ) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFieldValue('avatarFile', files[0]);
      setAvatarPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (values: EditProfileValues) => {
    if (!currentUser) return;

    try {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('bio', values.bio);
      if (values.avatarFile) formData.append('avatar', values.avatarFile);

      const updatedUser: User = await updateProfileFormData(currentUser.id, formData);

      setUser(updatedUser);
      toast.success('Профіль успішно оновлено!');
      router.push(`/profile/${currentUser.id}`);
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
        {({ setFieldValue, isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Ім'я*</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="Ваше імʼя"
                className={`${styles.input} ${
                  errors.name && touched.name ? styles.inputError : ''
                }`}
              />
              <ErrorMessage name="name" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="email" className={styles.label}>Email*</label>
              <Field
                type="email"
                id="email"
                name="email"
                placeholder="Ваша пошта"
                className={`${styles.input} ${
                  errors.email && touched.email ? styles.inputError : ''
                }`}
              />
              <ErrorMessage name="email" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="bio" className={styles.label}>Bio</label>
              <Field
                as="textarea"
                id="bio"
                name="bio"
                placeholder="Коротко про себе"
                className={styles.textarea}
              />
              <ErrorMessage name="bio" component="span" className={styles.error} />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="avatar" className={styles.label}>Аватар</label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className={styles.input}
                onChange={(e) => handleAvatarChange(e, setFieldValue)}
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className={styles.submitButton}
            >
              {isSubmitting ? 'Збереження...' : 'Зберегти'}
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
