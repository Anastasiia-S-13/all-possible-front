"use client";

import { Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export type Tool = {
  id: string;
  title: string;
  pricePerDay: number;
  category: string;
  rentTerms: string;
  description: string;
  characteristics: string;
  imageUrl: string | null;
};

type FormValues = {
  title: string;
  pricePerDay: number;
};

type Props = {
  tool?: Tool; // якщо є — edit, якщо нема — create
};

const validationSchema = Yup.object({
  title: Yup.string().required("Вкажіть назву"),
  pricePerDay: Yup.number()
    .typeError("Вкажіть число")
    .positive("Має бути більше 0")
    .required("Вкажіть ціну"),
});

export default function AddEditToolForm({ tool }: Props) {
  const router = useRouter();
  const isEdit = Boolean(tool);

  const initialValues: FormValues = {
    title: tool?.title ?? "",
    pricePerDay: tool?.pricePerDay ?? 0,
  };

  return (
    <Formik<FormValues>
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting }) => {
        try {
          const url = isEdit
            ? `/api/tools/${tool!.id}`
            : `/api/tools`;

          const method = isEdit ? "PATCH" : "POST";

          const res = await fetch(url, {
            method,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
            credentials: "include",
          });

          if (!res.ok) {
            throw new Error("Помилка збереження");
          }

          toast.success(
            isEdit ? "Інструмент оновлено" : "Інструмент створено"
          );

          if (isEdit) {
            router.push(`/tools/${tool!.id}`);
          } else {
            router.push("/tools");
          }

          router.refresh();
        } catch (error) {
          toast.error("Не вдалося зберегти дані");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {(f) => (
        <form onSubmit={f.handleSubmit}>
          <div>
            <input
              name="title"
              placeholder="Назва"
              value={f.values.title}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
            />
            {f.touched.title && f.errors.title && (
              <div>{f.errors.title}</div>
            )}
          </div>

          <div>
            <input
              name="pricePerDay"
              type="number"
              placeholder="Ціна за день"
              value={f.values.pricePerDay}
              onChange={f.handleChange}
              onBlur={f.handleBlur}
            />
            {f.touched.pricePerDay && f.errors.pricePerDay && (
              <div>{f.errors.pricePerDay}</div>
            )}
          </div>

          <button type="submit" disabled={f.isSubmitting}>
            {f.isSubmitting
              ? "Збереження..."
              : isEdit
              ? "Зберегти зміни"
              : "Опублікувати"}
          </button>
        </form>
      )}
    </Formik>
  );
}
