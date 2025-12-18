// components/forms/EditProfileForm/EditProfileForm.tsx
'use client';

import { useState, useEffect } from 'react';
import css from './ProfileEdit.module.css';
import iziToast from 'izitoast';
import { EditProfileData } from '../../../types/User';
import { getProfile, updateProfile } from "@/lib/api/clientApi";
import { profileSchema } from "@/lib/validation/validateUser";
import { ValidationError } from "yup";

type FormErrors = {
  [key in keyof EditProfileData]?: string;
};

export default function ProfileEditForm() {
  const [user, setUser] = useState<EditProfileData>({ name: '', email: '', bio: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch {
        iziToast.error({ title: 'Помилка', message: 'Не вдалося завантажити профіль' });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await profileSchema.validate(user, { abortEarly: false });

      const data = await updateProfile(user);

      iziToast.success({ title: 'Успіх', message: 'Профіль оновлено!' });
      setUser(data);

    } catch (error) {
           if (error instanceof ValidationError) {
        const newErrors: FormErrors = {};
        error.inner.forEach(err => {
          if (err.path) {
            newErrors[err.path as keyof EditProfileData] = err.message;
          }
        });
        setErrors(newErrors);
        return;
      }
      if (error instanceof Error) {
        iziToast.error({ title: 'Помилка', message: error.message });
      } else {
        iziToast.error({ title: 'Помилка', message: 'Сервер недоступний' });
      }
    }
  };

  if (loading) return <p>Завантаження...</p>;

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h1 className={css.formTitle}>Редагування профілю</h1>

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor="name">Ім’я</label>
        <input
          className={`${css.formInput} ${errors.name ? css.inputError : ''}`}
          type="text"
          id="name"
          name="name"
          value={user.name}
          onChange={handleChange}
          placeholder="Наприклад: Антон Петренко"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? 'name-error' : undefined}
        />
        {errors.name && (
          <p id="name-error" className={css.errorText}>{errors.name}</p>
        )}
      </div>

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor="email">Пошта</label>
        <input
          className={`${css.formInput} ${errors.email ? css.inputError : ''}`}
          type="email"
          id="email"
          name="email"
          value={user.email}
          onChange={handleChange}
          placeholder="example@email.com"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'email-error' : undefined}
        />
        {errors.email && (
          <p id="email-error" className={css.errorText}>{errors.email}</p>
        )}
      </div>

      <div className={css.formGroup}>
        <label className={css.formLabel} htmlFor="bio">Біо</label>
        <textarea
          className={css.formTextarea}
          id="bio"
          name="bio"
          value={user.bio}
          onChange={handleChange}
          placeholder="Розкажіть трохи про себе та інструменти, які пропонуєте"
        />
      </div>

      <div className={css.actions}>
        <button className={css.button} type="submit">Зберегти</button>
      </div>
    </form>
  );
}
