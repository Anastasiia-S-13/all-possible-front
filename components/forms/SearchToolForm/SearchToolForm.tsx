"use client";

import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";

import Button from "@/components/Button";

import css from "./SearchToolForm.module.css";

interface SearchToolFormValues {
  searchQuery: string;
}

export function SearchToolForm() {
  const router = useRouter();

  const handleSubmit = (values: SearchToolFormValues) => {
    if (values.searchQuery.trim()) {
      router.push(
        `/tools?query=${encodeURIComponent(values.searchQuery.trim())}`
      );
    }
  };

  return (
    <Formik initialValues={{ searchQuery: "" }} onSubmit={handleSubmit}>
      <Form className={css.form}>
        <Field
          className={css.field}
          type="text"
          name="searchQuery"
          placeholder="Дриль алмазного свердління"
        />

        <Button variant="primaryHero" type="submit" size="lg">
          Пошук
        </Button>
      </Form>
    </Formik>
  );
}
