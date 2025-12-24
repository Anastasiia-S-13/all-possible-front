'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from '@/components/Button';
import AvatarUpload from '@/app/(site)/profile/[userId]/edit/AvatarUpload';
import styles from './EditProfile.module.css';
import { EditProfileFormValues } from '@/types/User';
import { editProfileSchema } from '@/lib/validation/validateUser';

interface EditProfileFormProps {
  initialValues: EditProfileFormValues;
  avatarPreview?: string;
  onSubmit: (values: EditProfileFormValues) => Promise<void>;
  onAvatarSelect: (file: File) => void;
}

export default function EditProfileForm({
  initialValues,
  avatarPreview,
  onSubmit,
  onAvatarSelect,
}: EditProfileFormProps) {
  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Редагування профілю</h1>

      <Formik
        initialValues={initialValues}
        validationSchema={editProfileSchema}
        enableReinitialize
        onSubmit={(values, actions) => {
          onSubmit(values).finally(() => actions.setSubmitting(false));
        }}
      >
        {({ setFieldValue, isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Імʼя*</label>
                <Field
                  id="name"
                  name="name"
                  className={`${styles.input} ${
                    errors.name && touched.name ? styles.inputError : ''
                  }`}
                />
                <ErrorMessage name="name" component="span" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Пошта*</label>
                <Field
                  id="email"
                  name="email"
                  type="email"
                  className={`${styles.input} ${
                    errors.email && touched.email ? styles.inputError : ''
                  }`}
                />
                <ErrorMessage name="email" component="span" />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="bio">Bio</label>
                <Field
                  as="textarea"
                  id="bio"
                  name="bio"
                  className={`${styles.textarea} ${
                    errors.bio && touched.bio ? styles.inputError : ''
                  }`}
                />
              </div>

              <AvatarUpload
                previewUrl={avatarPreview}
                onChange={(file) => {
                  setFieldValue('avatarFile', file);
                  onAvatarSelect(file);
                }}
              />

              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Збереження...' : 'Зберегти'}
              </Button>
            </Form>
        )}
      </Formik>
    </div>
  );
}
