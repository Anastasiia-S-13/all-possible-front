import * as yup from "yup";

export const bookingSchema = yup.object({
  firstName: yup
    .string()
    .min(2, "Ім'я повинно містити мінімум 2 символи")
    .max(50, "Ім'я повинно містити максимум 50 символів")
    .required("Ім'я обов'язкове"),
  lastName: yup
    .string()
    .min(2, "Прізвище повинно містити мінімум 2 символи")
    .max(50, "Прізвище повинно містити максимум 50 символів")
    .required("Прізвище обов'язкове"),
  phone: yup
    .string()
    .matches(
      /^\+38\s?\(?\d{3}\)?\s?\d{3}\s?\d{2}\s?\d{2}$/,
      "Невірний формат телефону. Приклад: +38 (XXX) XXX XX XX"
    )
    .required("Номер телефону обов'язковий"),
  deliveryCity: yup
    .string()
    .min(2, "Місто повинно містити мінімум 2 символи")
    .max(100, "Місто повинно містити максимум 100 символів")
    .required("Місто доставки обов'язкове"),
  novaPoshtaBranch: yup
    .string()
    .min(1, "Відділення обов'язкове")
    .max(200, "Відділення повинно містити максимум 200 символів")
    .required("Відділення Нової Пошти обов'язкове"),
  toolId: yup.string(),
  startDate: yup.string(),
  endDate: yup.string(),
});

export type BookingFormSchema = yup.InferType<typeof bookingSchema>;
