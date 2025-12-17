"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./ToolEdit.module.css";

type ToolFormValues = {
  title: string;
  pricePerDay: number | "";
  category: string;
  rentTerms: string;
  description: string;
  characteristics: string;
  image: File | null;
};


const validationSchema = Yup.object({
  title: Yup.string().required("Вкажіть назву"),
  pricePerDay: Yup.number()
    .typeError("Вкажіть число")
    .positive("Має бути більше 0")
    .required("Вкажіть ціну"),
  category: Yup.string().required("Оберіть категорію"),
  rentTerms: Yup.string().required("Заповніть умови оренди"),
  description: Yup.string().required("Заповніть опис"),
  characteristics: Yup.string().required("Заповніть характеристики"),
});

type Tool = {
  id: string;
  title: string;
  pricePerDay: number;
  category: string;
  rentTerms: string;
  description: string;
  characteristics: string;
  imageUrl?: string | null;
};


type Props = {
  tool: Tool;
};

export default function ToolEdit({ tool }: Props) {
  const router = useRouter();
  const [preview, setPreview] = useState<string | null>(tool.imageUrl || null);

  return (
    <Formik<ToolFormValues>
      initialValues={{
        title: tool.title ?? "",
        pricePerDay: tool.pricePerDay ?? "",
        category: tool.category ?? "",
        rentTerms: tool.rentTerms ?? "",
        description: tool.description ?? "",
        characteristics: tool.characteristics ?? "",
        image: null,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const formData = new FormData();

        Object.entries(values).forEach(([key, value]) => {
             if (value === null || value === "") return;

            if (value instanceof File) {
              formData.append(key, value);
             } else {
             formData.append(key, String(value));
               }
             });


          const res = await fetch(`/api/tools/${tool.id}`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("Не вдалося зберегти зміни");
          }

          router.refresh();
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(f) => (
        <form onSubmit={f.handleSubmit} className={styles.form} noValidate>
          <h2 className={styles.title}>Редагувати інструмент</h2>

          {/* Фото */}
          <div className={styles.imageBlock}>
            <div className={styles.preview}>
              {preview ? (
                <Image
                  src={preview}
                  alt="Фото інструменту"
                  fill
                  className={styles.image}
                />
              ) : (
                <span className={styles.noImage}>Немає фото</span>
              )}
            </div>

            <label className={styles.uploadBtn}>
              Завантажити фото
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => {
                  const file = e.currentTarget.files?.[0];
                  if (file) {
                    f.setFieldValue("image", file);
                    setPreview(URL.createObjectURL(file));
                  }
                }}
              />
            </label>
          </div>

          {/* Назва */}
          <input
            name="title"
            placeholder="Введіть назву"
            value={f.values.title}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            className={`${styles.input} ${
              f.touched.title && f.errors.title ? styles.error : ""
            }`}
            autoComplete="off"
          />
          {f.touched.title && f.errors.title && (
            <div className={styles.errorText}>{f.errors.title}</div>
          )}

          {/* Ціна */}
          <input
            name="pricePerDay"
            type="number"
            placeholder="500"
            value={f.values.pricePerDay}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            className={`${styles.input} ${
              f.touched.pricePerDay && f.errors.pricePerDay
                ? styles.error
                : ""
            }`}
          />
          {f.touched.pricePerDay && f.errors.pricePerDay && (
            <div className={styles.errorText}>{f.errors.pricePerDay}</div>
          )}

          {/* Категорія */}
          <input
            name="category"
            placeholder="Категорія"
            value={f.values.category}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            className={`${styles.input} ${
              f.touched.category && f.errors.category ? styles.error : ""
            }`}
          />
          {f.touched.category && f.errors.category && (
            <div className={styles.errorText}>{f.errors.category}</div>
          )}

          {/* Умови */}
          <textarea
            name="rentTerms"
            placeholder="Застава 8000 грн. Станція та бак для води надаються окремо."
            value={f.values.rentTerms}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            className={`${styles.textarea} ${
              f.touched.rentTerms && f.errors.rentTerms ? styles.error : ""
            }`}
          />
          {f.touched.rentTerms && f.errors.rentTerms && (
            <div className={styles.errorText}>{f.errors.rentTerms}</div>
          )}

          {/* Опис */}
          <textarea
            name="description"
            placeholder="Ваш опис"
            value={f.values.description}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            className={`${styles.textarea} ${
              f.touched.description && f.errors.description
                ? styles.error
                : ""
            }`}
          />
          {f.touched.description && f.errors.description && (
            <div className={styles.errorText}>{f.errors.description}</div>
          )}

          {/* Характеристики */}
          <textarea
            name="characteristics"
            placeholder="Характеристики інструменту"
            value={f.values.characteristics}
            onChange={f.handleChange}
            onBlur={f.handleBlur}
            className={`${styles.textarea} ${
              f.touched.characteristics && f.errors.characteristics
                ? styles.error
                : ""
            }`}
          />
          {f.touched.characteristics && f.errors.characteristics && (
            <div className={styles.errorText}>
              {f.errors.characteristics}
            </div>
          )}

          <button
            type="submit"
            className={styles.submit}
            disabled={f.isSubmitting}
          >
            {f.isSubmitting ? "Збереження..." : "Зберегти зміни"}
          </button>

          <button
            type="button"
            className={styles.cancel}
            onClick={() => router.back()}
            disabled={f.isSubmitting}
          >
            Відмінити
          </button>
        </form>
      )}
    </Formik>
  );
}
