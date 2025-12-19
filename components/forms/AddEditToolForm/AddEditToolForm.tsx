"use client";

import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useId, useState, useEffect } from "react";
import * as Yup from "yup";

import css from "./AddEditToolForm.module.css";
import {
  AddEditToolFormRes,
  Category,
  CreateToolPayload,
} from "@/types/typesCategories";
import { createTool, getCategories, uploadImage } from "@/lib/api/clientApi";
import AvatarPicker from "@/components/AvatarPicker/AvatarPicker";

// типізація категорій

// встановлюємо початкове значення полів вводу данних
const initialValues: AddEditToolFormRes = {
  name: "",
  category: "",
  description: "",
  pricePerDay: 0,
  images: "",
  specificationsText: "",
  rentalTerms: "",
};
// валідація полів вводу данних
const AddEditToolSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(30, "Name is too long")
    .required("name is required"),
  category: Yup.string(),
  // .required("Select category is required"),
  description: Yup.string(),
  pricePerDay: Yup.number(),
  images: Yup.string(),
  specificationsText: Yup.string(),
  rentalTerms: Yup.string(),
});

export default function AddEditToolForm() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [photoUrl, setPhotoUrl] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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
    setFieldValue: FormikHelpers<CreateToolPayload>["setFieldValue"]
  ) => {
    setSelectedFile(file);
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
  // const handleSubmit = (
  //   values: CreateToolPayload,
  //   actions: FormikHelpers<CreateToolPayload>
  // ) => {
  //   console.log("Order data:", values);
  //   actions.resetForm();
  //   setPhotoUrl("");
  // };
  const parseSpecifications = (text: string): Record<string, string> => {
    const lines = text.split("\n").filter(Boolean);

    const result: Record<string, string> = {};

    for (const line of lines) {
      const [key, ...rest] = line.split(":");
      if (key && rest.length > 0) {
        result[key.trim()] = rest.join(":").trim();
      }
    }

    return result;
  };

  const handleSubmit = async (
    values: AddEditToolFormRes,
    actions: FormikHelpers<AddEditToolFormRes>
  ) => {
    let uploadedUrl = values.images;

    // якщо є файл — завантажуємо
    // if (selectedFile) {
    //   const formData = new FormData();
    //   formData.append("image", selectedFile);
    if (selectedFile) {
      uploadedUrl = await uploadImage(selectedFile);
    } else {
      console.error("Помилка!");
      actions.resetForm();
      setPhotoUrl("");
      setSelectedFile(null);
    }

    //   const data = await res.json();
    //   uploadedUrl = data.imageUrl;
    // }

    const specifications = parseSpecifications(values.specificationsText);

    // формуємо фінальний обʼєкт
    const payload: CreateToolPayload = {
      name: values.images,
      category: values.category,
      images: uploadedUrl,
      description: "",
      pricePerDay: 500,
      specifications,
    };

    await createTool(payload);
    console.log("Final payload:", values);

    actions.resetForm();
    setPhotoUrl("");
    setSelectedFile(null);
  };

  return (
    <Formik<AddEditToolFormRes>
      initialValues={initialValues}
      validationSchema={AddEditToolSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue }) => (
        <div className={css.AddEditToolForm}>
          <Form className={css.form}>
            <div className={css.left}>
              <AvatarPicker
                toolPhotoUrl={photoUrl}
                onChangePhoto={(file) => handlePhotoChange(file, setFieldValue)}
              />
              {/* Назва */}
              <div className={css.boxField}>
                <label htmlFor={`${fieldId}-name`} className={css.label}>
                  Назва
                </label>
                <Field
                  type="text"
                  className={css.input}
                  name="name"
                  id={`${fieldId}-name`}
                  placeholder={`Введіть назву`}
                />
                <ErrorMessage
                  name="name"
                  className={css.error}
                  component="span"
                />

                {/* Ціна */}
                <div className={css.boxField}>
                  <label
                    htmlFor={`${fieldId}-pricePerDay`}
                    className={css.label}
                  >
                    Ціна/день
                  </label>
                  <Field
                    type="number"
                    id={`${fieldId}-pricePerDay`}
                    name="pricePerDay"
                    className={css.input}
                    placeholder={`500`}
                  ></Field>
                  <ErrorMessage
                    name="pricePerDay"
                    className=""
                    component="span"
                  />
                </div>

                {/* Вибір категорій */}
                <div className={css.boxField}>
                  <label
                    htmlFor={`${fieldId}-rentalTerms`}
                    className={css.label}
                  >
                    Категорія
                  </label>
                  <Field
                    as="select"
                    type="text"
                    id={`${fieldId}-category`}
                    name="category"
                    className={css.input}
                  >
                    <option value="">Категорія</option>
                    {categories?.map((cat: Category) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.title}
                      </option>
                    ))}
                  </Field>
                </div>

                {/* Умови оренди */}
                <div className={css.boxField}>
                  <label
                    htmlFor={`${fieldId}-rentalTerms`}
                    className={css.label}
                  >
                    Умови оренди
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    id={`${fieldId}-rentalTerms`}
                    name="rentalTerms"
                    className={css.textarea}
                    rows={3}
                    placeholder={`Застава 8000 грн. Станина та бак для води надаються окремо.`}
                  ></Field>
                  <ErrorMessage
                    name="rentalTerms"
                    className={css.error}
                    component="span"
                  />
                </div>

                {/* Опис */}
                <div className={css.boxField}>
                  <label
                    htmlFor={`${fieldId}-description`}
                    className={css.label}
                  >
                    Опис
                  </label>
                  <Field
                    as="textarea"
                    type="text"
                    id={`${fieldId}-description`}
                    name="description"
                    rows={7}
                    className={css.textarea}
                    placeholder={`Ваш опис`}
                  ></Field>
                  <ErrorMessage
                    name="description"
                    className={css.error}
                    component="span"
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
                    id="specifications"
                    name="specificationsText"
                    className={css.textarea}
                    rows={7}
                    placeholder={`Характеристики інструменту`}
                  />
                  <ErrorMessage
                    name="specifications"
                    className={css.error}
                    component="span"
                  />
                </div>
              </div>
            </div>

            <div className={css.boxButtons}>
              <button className={css.btn} type="submit">
                Опублікувати
              </button>
              {/* <button type="button" onClick={}>
                    Відмінити
                  </button> */}
            </div>
          </Form>
        </div>
      )}
    </Formik>
  );
}
