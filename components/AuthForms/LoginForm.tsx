"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/stores/authStore";
import { loginSchema } from "@/lib/validation/ragisterValidations";
import Button from "@/components/Button";
import styles from "./AuthForms.module.css";
import type { LoginFormValues } from "@/types";

export default function LoginForm() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: LoginFormValues) => {
    setIsSubmitting(true);
    try {
      await login(values.email, values.password);
      toast.success("Успішний вхід!");
      router.push("/");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      toast.error(err.response?.data?.error || "Помилка входу");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={loginSchema}
      onSubmit={handleSubmit}
    >
      {({ errors, touched }) => (
        <Form className={styles.form}>
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

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "Вхід..." : "Увійти"}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
