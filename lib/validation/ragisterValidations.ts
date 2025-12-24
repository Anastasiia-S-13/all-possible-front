import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невірний формат email')
    .required("Email обов'язковий"),
  password: Yup.string()
    .required("Пароль обов'язковий"),
});

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Ім'я має бути не менше 2 символів")
    .max(32, "Ім'я має бути не більше 32 символів")
    .required("Ім'я обов'язкове"),
  email: Yup.string()
    .email('Невірний формат email')
    .max(64, 'Email має бути не більше 64 символів')
    .required("Email обов'язковий"),
  password: Yup.string()
    .min(8, 'Пароль має бути не менше 8 символів')
    .max(128, 'Пароль має бути не більше 128 символів')
    .required("Пароль обов'язковий"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Паролі не співпадають')
    .required("Підтвердіть пароль"),
});

export const toolSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Назва має бути не менше 3 символів")
    .max(96, "Назва має бути не більше 96 символів")
    .required("Назва обов'язкова"),
  pricePerDay: Yup.number()
    .min(0, "Ціна не може бути від'ємною")
    .required("Ціна обов'язкова"),
  category: Yup.string()
    .required("Оберіть категорію"),
  description: Yup.string()
    .min(20, "Опис має бути не менше 20 символів")
    .max(2000, "Опис має бути не більше 2000 символів")
    .required("Опис обов'язковий"),
  rentalTerms: Yup.string()
    .min(20, "Умови мають бути не менше 20 символів")
    .max(1000, "Умови мають бути не більше 1000 символів")
    .required("Умови оренди обов'язкові"),
  specifications: Yup.string()
    .max(1000, "Характеристики мають бути не більше 1000 символів"),
});
