"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId, useState, useEffect } from "react";
import * as Yup from "yup";

import css from "./AddEditToolForm.module.css";
import { Category } from "@/types/typesCategories";
import { getCategories } from "@/lib/api/clientApi";
import AvatarPicker from "../../AvatarPicker/AvatarPicker";

// типізація категорій

// типізація полей
interface AddEditToolForm {
  toolname: string;
  category: string;
  toolPhotoUrl: string;
}
// встановлюємо початкове значення полів вводу данних
const initialValues: AddEditToolForm = {
  toolname: "Назва інструмету",
  category: "",
  toolPhotoUrl: "",
};
// валідація полів вводу данних
const AddEditToolSchema = Yup.object().shape({
  toolname: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name is too long")
    .required("toolname is required"),
  category: Yup.string(),
  // .required("Select category is required"),
});

export default function AddEditToolForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  // ід для класів
  const fieldId = useId();
  // отримання категорій для меню
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

  // зміна зображення
  const handlePhotoChange = (
    file: File | null,
    setFieldValue: FormikHelpers<AddEditToolForm>["setFieldValue"]
  ) => {
    if (!file) {
      setPhotoUrl("");
      setFieldValue("toolPhotoUrl", "");
      return;
    }

    // const preview = URL.createObjectURL(file);
    // setPhotoUrl(preview);
    // setFieldValue("toolPhotoUrl", preview);
  };

  // фуннкція відправки полів форми у змінній values
  const handleSubmit = (
    values: AddEditToolForm,
    actions: FormikHelpers<AddEditToolForm>
  ) => {
    console.log("Order data:", values);
    actions.resetForm();
    setPhotoUrl("");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={AddEditToolSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <>
          <AvatarPicker
            toolPhotoUrl={photoUrl}
            onChangePhoto={(url) => handlePhotoChange(url, setFieldValue)}
          />

          <Form className={css.form}>
            <fieldset className={css.fieldset}>
              {/* Назва */}
              <div>
                <legend className={css.legend}>Блок</legend>
                <label htmlFor={`${fieldId}-toolname`} className={css.label}>
                  Назва інструменту
                </label>
                <Field
                  type="text"
                  className={css.field}
                  name="toolname"
                  id={`${fieldId}-toolname`}
                />
                <ErrorMessage
                  name="toolname"
                  className={css.error}
                  component="span"
                />

                {/* Вибір категорій */}
                <Field
                  as="select"
                  type="text"
                  id={`${fieldId}-category`}
                  name="category"
                  className={css.input}
                >
                  <option value="">Категорія інструменту</option>
                  {categories?.map((cat: Category) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.title}
                    </option>
                  ))}
                </Field>

                <button className={css.btn} type="submit">
                  Кнопка
                </button>
              </div>
            </fieldset>
          </Form>
        </>
      )}
    </Formik>
  );
}
