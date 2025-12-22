import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має містити мінімум 2 символи")
    .max(15, "Ім'я має містити максимум 15 символів")
    .required("Ім'я обов'язкове"),
  description: Yup.string().max(80, "Відгук має містити максимум 80 символів"),
});
