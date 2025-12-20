"use client";

import React, { useEffect, useId, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import css from "./AddEditToolForm.module.css";
import {
  AddEditToolFormRes,
  Category,
  ToolCreate,
} from "@/types/typesCategories";
import { createTool, getCategories, updateTool } from "@/lib/api/clientApi";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";

// схема валідації
const AddEditToolSchema = Yup.object({
  name: Yup.string().required("Введіть назву"),
  pricePerDay: Yup.number()
    .typeError("Ціна має бути числом")
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

  const [categories, setCategories] = useState<Category[]>([]);

  // завантаження категорій
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (e) {
        console.error("Failed to load categories", e);
      }
    };
    fetchCategories();
  }, []);

  // React Query мутація
  const mutation = useMutation<ToolCreate, Error, FormData>({
    mutationFn: (formData: FormData) =>
      toolId ? updateTool(toolId, formData, {}) : createTool(formData),
    onSuccess: (tool: ToolCreate) => {
      router.push(`/tools/${tool._id}`);
    },
    onError: (err: any) => {
      alert(err?.message || "Сталася помилка");
    },
  });

  // Formik
  const formik = useFormik<AddEditToolFormRes>({
    initialValues: {
      name: initialData?.name || "",
      pricePerDay: initialData?.pricePerDay || "",
      category: initialData?.category || "",
      description: initialData?.description || "",
      rentalTerms: initialData?.rentalTerms || "",
      specifications:
        typeof initialData?.specifications === "string"
          ? initialData.specifications
          : JSON.stringify(initialData?.specifications || {}),
      image: null,
    },
    enableReinitialize: true,
    validationSchema: AddEditToolSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      if (values.image) {
        formData.append("image", values.image);
      }

      formData.append("name", values.name);
      formData.append("pricePerDay", String(values.pricePerDay));
      formData.append("category", values.category);
      formData.append("description", values.description);
      formData.append("rentalTerms", values.rentalTerms);
      formData.append("specifications", values.specifications);

      mutation.mutate(formData);
    },
  });

  const loading = mutation.isPending;

  return (
    <div className={css.AddEditToolForm}>
      <form className={css.form} onSubmit={formik.handleSubmit}>
        <div className={css.left}>
          {/* Фото */}
          <AvatarPicker
            value={initialData?.images}
            onChange={(file) => formik.setFieldValue("image", file)}
          />
          {formik.touched.image && formik.errors.image && (
            <p className={css.error}>{formik.errors.image}</p>
          )}

          {/* Назва */}
          <div className={css.boxField}>
            <label htmlFor={`${fieldId}-name`} className={css.label}>
              Назва
            </label>
            <input
              type="text"
              className={css.input}
              id={`${fieldId}-name`}
              name="name"
              placeholder="Введіть назву"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <span className={css.error}>{formik.errors.name}</span>
            )}
          </div>

          {/* Ціна */}
          <div className={css.boxField}>
            <label htmlFor={`${fieldId}-pricePerDay`} className={css.label}>
              Ціна/день
            </label>
            <input
              type="number"
              id={`${fieldId}-pricePerDay`}
              name="pricePerDay"
              className={css.input}
              placeholder="500"
              value={formik.values.pricePerDay}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.pricePerDay && formik.errors.pricePerDay && (
              <span className={css.error}>{formik.errors.pricePerDay}</span>
            )}
          </div>

          {/* Категорія */}
          <div className={css.boxField}>
            <label htmlFor={`${fieldId}-category`} className={css.label}>
              Категорія
            </label>
            <select
              id={`${fieldId}-category`}
              name="category"
              className={css.input}
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <option value="">Категорія</option>
              {categories?.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.title}
                </option>
              ))}
            </select>
            {formik.touched.category && formik.errors.category && (
              <span className={css.error}>{formik.errors.category}</span>
            )}
          </div>

          {/* Умови оренди */}
          <div className={css.boxField}>
            <label htmlFor={`${fieldId}-rentalTerms`} className={css.label}>
              Умови оренди
            </label>
            <textarea
              id={`${fieldId}-rentalTerms`}
              name="rentalTerms"
              className={css.textarea}
              rows={3}
              placeholder="Застава 8000 грн. Станина та бак для води надаються окремо."
              value={formik.values.rentalTerms}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.rentalTerms && formik.errors.rentalTerms && (
              <span className={css.error}>{formik.errors.rentalTerms}</span>
            )}
          </div>

          {/* Опис */}
          <div className={css.boxField}>
            <label htmlFor={`${fieldId}-description`} className={css.label}>
              Опис
            </label>
            <textarea
              id={`${fieldId}-description`}
              name="description"
              rows={7}
              className={css.textarea}
              placeholder="Ваш опис"
              value={formik.values.description}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.description && formik.errors.description && (
              <span className={css.error}>{formik.errors.description}</span>
            )}
          </div>

          {/* Характеристики */}
          <div className={css.boxField}>
            <label htmlFor={`${fieldId}-specifications`} className={css.label}>
              Характеристики
            </label>
            <textarea
              id={`${fieldId}-specifications`}
              name="specifications"
              className={css.textarea}
              rows={7}
              placeholder="Характеристики інструменту"
              value={formik.values.specifications}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.specifications && formik.errors.specifications && (
              <span className={css.error}>{formik.errors.specifications}</span>
            )}
          </div>
        </div>

        <div className={css.boxButtons}>
          <button className={css.btn} type="submit" disabled={loading}>
            {loading ? "Завантаження..." : toolId ? "Оновити" : "Опублікувати"}
          </button>
          <button
            className={css.btnCan}
            type="button"
            onClick={() => router.push("/")}
          >
            Відмінити
          </button>
        </div>
      </form>
    </div>
  );
}
