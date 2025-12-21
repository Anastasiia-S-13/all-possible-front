// lib/validation/validateUser.ts
import * as Yup from "yup";

export const profileSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Мінімум 2 символи")
    .max(50, "Максимум 50 символів")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email("Невірний формат пошти")
    .required("Пошта обов'язкова"),
  bio: Yup.string()
    .max(300, "Занадто довгий опис")
    .nullable(),
});
