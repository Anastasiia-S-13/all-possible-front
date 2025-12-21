//  lib/validation/validateUser.ts

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

export const editProfileSchema = Yup.object().shape({
  name: Yup.string().required('Імʼя обовʼязкове'),
  email: Yup.string().email('Невірний email').required('Email обовʼязковий'),
  bio: Yup.string().max(200, 'Bio не може перевищувати 200 символів'),
  avatarFile: Yup.mixed<File>()
    .test('fileSize', 'Файл занадто великий', value => {
      if (!value) return true; 
      return value.size <= 5 * 1024 * 1024;
    })
    .test('fileType', 'Неправильний формат', value => {
      if (!value) return true;
      return ['image/jpeg', 'image/png', 'image/webp', 'image/gif'].includes(value.type);
    }),
});
