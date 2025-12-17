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
