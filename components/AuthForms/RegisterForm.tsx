"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { registerSchema } from "@/lib/validation/ragisterValidations";
import Button from "@/components/Button";
import styles from "./AuthForms.module.css";
import type { RegisterFormValues } from "@/types";

export default function RegisterForm() {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: RegisterFormValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values: RegisterFormValues) => {
    setIsSubmitting(true);
    try {
      await register(values.name, values.email, values.password);
      toast.success("Реєстрація успішна!");
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Помилка реєстрації");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={registerSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name" className={styles.label}>
              Імʼя*
            </label>
            <Field
              type="text"
              id="name"
              name="name"
              placeholder="Ваше імʼя"
              className={`${styles.input} ${
                errors.name && touched.name ? styles.inputError : ""
              }`}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="email" className={styles.label}>
              Пошта*
            </label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Ваша пошта"
              className={`${styles.input} ${
                errors.email && touched.email ? styles.inputError : ""
              }`}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password" className={styles.label}>
              Пароль*
            </label>
            <Field
              type="password"
              id="password"
              name="password"
              placeholder="*******"
              className={`${styles.input} ${
                errors.password && touched.password ? styles.inputError : ""
              }`}
            />
            <ErrorMessage
              name="password"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="confirmPassword" className={styles.label}>
              Підтвердіть пароль*
            </label>
            <Field
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="*******"
              className={`${styles.input} ${
                errors.confirmPassword && touched.confirmPassword
                  ? styles.inputError
                  : ""
              }`}
            />
            <ErrorMessage
              name="confirmPassword"
              component="span"
              className={styles.error}
            />
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Реєстрація..." : "Зареєструватись"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
