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
import { useAuthStore } from "@/stores/authStore";
import toast from "react-hot-toast";

const getValidationSchema = (isEditMode: boolean) =>
  Yup.object({
    name: Yup.string()
      .min(3, "Назва має бути не коротшою за 3 символи")
      .max(96, "Назва занадто довга")
      .required("Введіть назву"),
    pricePerDay: Yup.number()
      .typeError("Ціна має бути числом")
      .min(0, "Ціна не може бути від'ємною")
      .required("Вкажіть ціну"),
    category: Yup.string().required("Оберіть категорію"),
    description: Yup.string()
      .min(20, "Опис має бути не коротшим за 20 символів")
      .max(2000, "Опис занадто довгий")
      .required("Введіть опис"),
    rentalTerms: Yup.string()
      .min(20, "Умови оренди мають бути не коротшими за 20 символів")
      .max(1000, "Умови занадто довгі")
      .required("Введіть умови оренди"),
    specifications: Yup.string().required("Введіть характеристики"),
    image: isEditMode
      ? Yup.mixed().nullable()
      : Yup.mixed().required("Додайте фото"),
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
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth/login");
    }
  }, [isAuthenticated, router]);

  const [categories, setCategories] = useState<ToolsCategory[]>([]);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch((e) => console.error("Failed to load categories", e));
  }, []);

  const mutation = useMutation<ToolCreate | any, Error, FormData>({
    mutationFn: (formData: FormData) =>
      toolId ? (updateTool(toolId, formData) as any) : createTool(formData),
  });

  const initialValues: AddEditToolFormRes = initialData
    ? {
        name: initialData.name,
        pricePerDay: initialData.pricePerDay.toString(),
        category: initialData.category,
        description: initialData.description,
        rentalTerms: initialData.rentalTerms,
        specifications:
          typeof initialData.specifications === "string"
            ? initialData.specifications
            : Object.entries(initialData.specifications || {})
                .map(([k, v]) => `${k}: ${v}`)
                .join("\n"),
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

    formData.append("name", values.name.trim());
    formData.append("pricePerDay", String(values.pricePerDay));
    formData.append("category", values.category);
    formData.append("description", values.description.trim());
    formData.append("rentalTerms", values.rentalTerms.trim());

    const specsObject: Record<string, string> = {};
    if (values.specifications) {
      values.specifications.split("\n").forEach((line) => {
        const colonIndex = line.indexOf(":");
        if (colonIndex !== -1) {
          const key = line.substring(0, colonIndex).trim();
          const value = line.substring(colonIndex + 1).trim();
          if (key) specsObject[key] = value;
        } else if (line.trim()) {
          specsObject[line.trim()] = "";
        }
      });
    }
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
        validationSchema={getValidationSchema(!!toolId)}
        onSubmit={async (values, { setSubmitting }) => {
          const formData = buildToolFormData(values);
          try {
            const tool = await mutation.mutateAsync(formData);
            router.push(`/tools/${tool._id || toolId}`);
            router.refresh();
          } catch (err: any) {
            const errorMessage =
              err.response?.data?.message || err?.message || "Сталася помилка";
            toast.error(`Помилка: ${errorMessage}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, isSubmitting }) => (
          <Form className={css.form}>
            <div className={css.left}>
              <AvatarPicker
                value={initialData?.images}
                onChange={(file) => setFieldValue("image", file)}
              />
              <ErrorMessage name="image" component="p" className={css.error} />

              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-name`} className={css.label}>
                  Назва
                </label>
                <Field
                  type="text"
                  id={`${fieldId}-name`}
                  name="name"
                  className={css.input}
                  placeholder="Введіть назву (мін. 3 симв.)"
                />
                <ErrorMessage
                  name="name"
                  component="span"
                  className={css.error}
                />
              </div>

              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-pricePerDay`} className={css.label}>
                  Ціна/день (грн)
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

              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-category`} className={css.label}>
                  Категорія
                </label>
                <div className={css.select_wrapper}>
                  <Field
                    as="select"
                    id={`${fieldId}-category`}
                    name="category"
                    className={`${css.input} ${css.select}`}
                    onFocus={() => setIsSelectOpen(true)}
                    onBlur={() => setIsSelectOpen(false)}
                  >
                    <option value="">Оберіть категорію</option>
                    {categories?.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Field>
                  <svg className={css.arrow} width="24" height="24">
                    <use
                      href={`/sprite/sprite.svg#icon-keyboard_arrow_${
                        isSelectOpen ? "up" : "down"
                      }`}
                    />
                  </svg>
                </div>
                <ErrorMessage
                  name="category"
                  component="span"
                  className={css.error}
                />
              </div>

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
                  placeholder="Застава 8000 грн. Паспорт. Мінімум 20 символів."
                />
                <ErrorMessage
                  name="rentalTerms"
                  component="span"
                  className={css.error}
                />
              </div>

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
                  placeholder="Детальний опис інструменту. Мінімум 20 символів."
                />
                <ErrorMessage
                  name="description"
                  component="span"
                  className={css.error}
                />
              </div>

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
                  rows={5}
                  placeholder="Вага: 5кг&#10;Потужність: 2000Вт"
                />
                <ErrorMessage
                  name="specifications"
                  component="span"
                  className={css.error}
                />
              </div>
            </div>

            <div className={css.boxButtons}>
              <button
                className={css.btn}
                type="submit"
                disabled={isSubmitting || mutation.isPending}
              >
                {isSubmitting || mutation.isPending
                  ? "Завантаження..."
                  : toolId
                  ? "Оновити"
                  : "Опублікувати"}
              </button>
              <button
                className={css.btnCan}
                type="button"
                onClick={() => router.back()}
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
