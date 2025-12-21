"use client";

import React, { useEffect, useId, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import css from "./AddEditToolForm.module.css";
import {
  AddEditToolFormRes,
  ToolsCategory,
  ToolCreate,
} from "@/types/typesCategories";
import { createTool, getCategories, updateTool } from "@/lib/api/clientApi";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";

// Валідація
const AddEditToolSchema = Yup.object({
  name: Yup.string().required("Введіть назву"),
  pricePerDay: Yup.number()
    .typeError("Ціна має бути числом")
    .positive("Ціна має бути більшою за 0")
    .required("Вкажіть ціну"),
  category: Yup.string().required("Оберіть категорію"),
  description: Yup.string().required("Введіть опис"),
  rentalTerms: Yup.string().required("Введіть умови оренди"),
  specifications: Yup.string().required("Введіть характеристики"),
  image: Yup.mixed().required("Додайте фото"),
});

interface ToolFormProps {
  initialData?: ToolCreate | null;
  toolId?: string;
}

export default function AddEditToolForm({
  initialData,
  toolId,
}: ToolFormProps) {
  const router = useRouter();
  const fieldId = useId();

  const [categories, setCategories] = useState<ToolsCategory[]>([]);

  // Завантаження категорій
  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => console.error("Failed to load categories", e));
  }, []);

  // React Query мутація
  const mutation = useMutation<ToolCreate, Error, FormData>({
    mutationFn: (formData: FormData) =>
      toolId ? updateTool(toolId, formData) : createTool(formData),
    onSuccess: (tool: ToolCreate) => {
      router.push(`/tools/${tool._id}`);
    },
    onError: (err: any) => {
      alert(err?.message || "Сталася помилка");
    },
  });

  const normalizeSpecifications = (spec: any) => {
    if (!spec) return "";
    if (typeof spec === "string") return spec;
    return JSON.stringify(spec);
  };

  const initialValues: AddEditToolFormRes = initialData
    ? {
        name: initialData.name,
        pricePerDay: initialData.pricePerDay.toString(),
        category: initialData.category, // бекенд зберігає id в полі category
        description: initialData.description,
        rentalTerms: initialData.rentalTerms,
        specifications:
          typeof initialData.specifications === "string"
            ? initialData.specifications
            : JSON.stringify(
                Object.fromEntries(Object.entries(initialData.specifications))
              ),
        image: null,
      }
    : {
        name: "",
        pricePerDay: "",
        category: "",
        description: "",
        rentalTerms: "",
        specifications: "",
        image: null,
      };
  function buildToolFormData(values: AddEditToolFormRes): FormData {
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("pricePerDay", String(values.pricePerDay));
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("rentalTerms", values.rentalTerms);

    const specsObject = Object.fromEntries(
      values.specifications
        .split("\n")
        .map((line) => line.split(":").map((s) => s.trim()))
    );

    formData.append("specifications", JSON.stringify(specsObject));

    if (values.image) {
      formData.append("image", values.image);
    }

    return formData;
  }

  return (
    <div className={css.AddEditToolForm}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={AddEditToolSchema}
        onSubmit={(values) => {
          const formData = buildToolFormData(values);
          mutation.mutate(formData);
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.left}>
              {/* Фото */}
              <AvatarPicker
                value={initialData?.images}
                onChange={(file) => setFieldValue("image", file)}
              />
              <ErrorMessage name="image" component="p" className={css.error} />

              {/* Назва */}
              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-name`} className={css.label}>
                  Назва
                </label>
                <Field
                  type="text"
                  id={`${fieldId}-name`}
                  name="name"
                  className={css.input}
                  placeholder="Введіть назву"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* Ціна */}
              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-pricePerDay`} className={css.label}>
                  Ціна/день
                </label>
                <Field
                  type="number"
                  id={`${fieldId}-pricePerDay`}
                  name="pricePerDay"
                  className={css.input}
                  placeholder="500"
                />
                <ErrorMessage
                  name="pricePerDay"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* Категорія */}
              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-category`} className={css.label}>
                  Категорія
                </label>
                <Field
                  as="select"
                  id={`${fieldId}-category`}
                  name="category"
                  className={css.input}
                >
                  <option value="">Категорія</option>
                  {categories?.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="category"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* Умови оренди */}
              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-rentalTerms`} className={css.label}>
                  Умови оренди
                </label>
                <Field
                  as="textarea"
                  id={`${fieldId}-rentalTerms`}
                  name="rentalTerms"
                  className={css.textarea}
                  rows={3}
                  placeholder="Застава 8000 грн..."
                />
                <ErrorMessage
                  name="rentalTerms"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* Опис */}
              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-description`} className={css.label}>
                  Опис
                </label>
                <Field
                  as="textarea"
                  id={`${fieldId}-description`}
                  name="description"
                  rows={7}
                  className={css.textarea}
                  placeholder="Ваш опис"
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className={css.error}
                />
              </div>

              {/* Характеристики */}
              <div className={css.boxField}>
                <label
                  htmlFor={`${fieldId}-specifications`}
                  className={css.label}
                >
                  Характеристики
                </label>
                <Field
                  as="textarea"
                  id={`${fieldId}-specifications`}
                  name="specifications"
                  className={css.textarea}
                  rows={7}
                  placeholder="Характеристики інструменту"
                />
                <ErrorMessage
                  name="specifications"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.boxButtons}>
              <button className={css.btn} type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Завантаження..."
                  : toolId
                  ? "Оновити"
                  : "Опублікувати"}
              </button>

              <button
                className={css.btnCan}
                type="button"
                onClick={() => router.push("/")}
              >
                Відмінити
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
