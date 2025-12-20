"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from "formik";
import { toast } from "react-hot-toast";
import { DateRange } from "@/types/Booking";
import {
  BookingFormSchema,
  bookingSchema,
} from "@/lib/validation/validateBooking";
import { calculateTotalPrice } from "@/lib/utils/calculateRating";
import styles from "./BookingForm.module.css";


const STORAGE_KEY = "bookingFormData";


interface BookingFormProps {
  toolId: string;
  pricePerDay: number;
  selectedRange: DateRange;
  onSubmit: (
    data: BookingFormSchema
  ) => Promise<{ success: boolean; message?: string }>;
  children?: React.ReactNode;
}

const initialValues: BookingFormSchema = {
  firstName: "",
  lastName: "",
  phone: "",
  deliveryCity: "",
  novaPoshtaBranch: "",
};

export default function BookingForm({
  toolId,
  pricePerDay,
  selectedRange,
  onSubmit,
  children,
}: BookingFormProps) {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalPrice = calculateTotalPrice(pricePerDay, selectedRange);

  useEffect(() => {
    try {

      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return;

      const parsed = JSON.parse(saved);
      if (
        parsed.toolId !== toolId ||
        Date.now() - parsed.timestamp >= 3600000
      ) {
        localStorage.removeItem(STORAGE_KEY);
        return;
      }
    } catch {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [toolId]);

  const handleSaveToStorage = (values: BookingFormSchema) => {
    const hasData = Object.values(values).some(
      (v) => v && (v as string).trim() !== ""
    );
    if (!hasData) return;

    const payload = {
      ...values,
      toolId,
      timestamp: Date.now(),
    };

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch { }
  };

  const handleSubmit = async (
    values: BookingFormSchema,
    formikHelpers: FormikHelpers<BookingFormSchema>
  ) => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      toast.error("Будь ласка, виберіть період бронювання");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await onSubmit(values);

      if (result.success) {
        toast.success("Бронювання успішно створено!");
        formikHelpers.resetForm();
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch { }
      } else {
        toast.error(result.message || "Помилка при створенні бронювання");
      }
    } catch {
      toast.error("Помилка з'єднання з сервером. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitialValues = (): BookingFormSchema => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return initialValues;
      const parsed = JSON.parse(saved);
      if (
        parsed.toolId !== toolId ||
        Date.now() - parsed.timestamp >= 3600000
      ) {
        return initialValues;
      }

      return {
        firstName: parsed.firstName || "",
        lastName: parsed.lastName || "",
        phone: parsed.phone || "",
        deliveryCity: parsed.deliveryCity || "",
        novaPoshtaBranch: parsed.novaPoshtaBranch || "",
      };
    } catch {
      return initialValues;
    }
  };

  return (
    <Formik
      initialValues={getInitialValues()}
      enableReinitialize
      validationSchema={bookingSchema}
      onSubmit={handleSubmit}
    >

      {({ values, handleChange, handleBlur }) => (
        <Form className={styles.form}>
          <div className={styles.row}>
            <div className={styles.field}>

              <label htmlFor="firstName" className={styles.label}>
                Ім&apos;я
              </label>

              <Field
                id="firstName"
                name="firstName"
                type="text"
                placeholder="Ваше ім'я"
                className={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleSaveToStorage({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="firstName"
                component="span"
                className={styles.error}
              />
            </div>


            <div className={styles.field}>
              <label htmlFor="lastName" className={styles.label}>
                Прізвище
              </label>

              <Field
                id="lastName"
                name="lastName"
                type="text"
                placeholder="Ваше прізвище"
                className={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleSaveToStorage({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="lastName"
                component="span"
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="phone" className={styles.label}>
              Номер телефону
            </label>

            <Field
              id="phone"
              name="phone"
              type="tel"
              placeholder="+38 (XXX) XXX XX XX"
              className={styles.input}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                handleChange(e);
                handleSaveToStorage({
                  ...values,
                  [e.target.name]: e.target.value,
                });
              }}
              onBlur={handleBlur}
            />

            <ErrorMessage
              name="phone"
              component="span"
              className={styles.error}
            />
          </div>

          {/* календар */}
          {children}

          <div className={styles.row}>
            <div className={styles.field}>
              <label htmlFor="deliveryCity" className={styles.label}>
                Місто доставки
              </label>

              <Field
                id="deliveryCity"
                name="deliveryCity"
                type="text"
                placeholder="Ваше місто"
                className={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleSaveToStorage({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="deliveryCity"
                component="span"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="novaPoshtaBranch" className={styles.label}>
                Відділення Нової Пошти
              </label>

              <Field
                id="novaPoshtaBranch"
                name="novaPoshtaBranch"
                type="text"
                placeholder="24"
                className={styles.input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  handleSaveToStorage({
                    ...values,
                    [e.target.name]: e.target.value,
                  });
                }}
                onBlur={handleBlur}
              />

              <ErrorMessage
                name="novaPoshtaBranch"
                component="span"
                className={styles.error}
              />
            </div>
          </div>

          <div className={styles.priceRow}>
            <span className={styles.price}>Ціна: {totalPrice} грн</span>

            <button
              type="submit"
              className={styles.submitBtn}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Обробка..." : "Забронювати"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
