"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema, BookingFormSchema } from "@/validation/bookingSchema";
import { DateRange } from "@/types/booking";
import { calculateTotalPrice } from "@/lib/util/calculateTotalPrice";
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

export default function BookingForm({
  toolId,
  pricePerDay,
  selectedRange,
  onSubmit,
  children,
}: BookingFormProps) {
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isLoaded, setIsLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<BookingFormSchema>({
    resolver: yupResolver(bookingSchema),
    mode: "onBlur",
  });

  const watchedValues = watch();

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);

        if (
          parsedData.toolId !== toolId ||
          Date.now() - parsedData.timestamp >= 3600000
        ) {
          localStorage.removeItem(STORAGE_KEY);
          setIsLoaded(true);
          return;
        }

        setTimeout(() => {
          reset({
            firstName: parsedData.firstName || "",
            lastName: parsedData.lastName || "",
            phone: parsedData.phone || "",
            deliveryCity: parsedData.deliveryCity || "",
            novaPoshtaBranch: parsedData.novaPoshtaBranch || "",
          });
        }, 0);
      }
    } catch (error) {
      console.warn("Failed to load saved form data:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoaded(true);
    }
  }, [toolId, reset]);

  useEffect(() => {
    if (!isLoaded) return;

    const hasData = Object.values(watchedValues).some(
      (value) => value && value.trim() !== ""
    );

    if (hasData) {
      const formDataToSave = {
        firstName: watchedValues.firstName || "",
        lastName: watchedValues.lastName || "",
        phone: watchedValues.phone || "",
        deliveryCity: watchedValues.deliveryCity || "",
        novaPoshtaBranch: watchedValues.novaPoshtaBranch || "",
        toolId,
        timestamp: Date.now(),
      };

      localStorage.setItem(STORAGE_KEY, JSON.stringify(formDataToSave));
    }
  }, [watchedValues, toolId, isLoaded]);

  const totalPrice = calculateTotalPrice(pricePerDay, selectedRange);

  const handleFormSubmit = async (data: BookingFormSchema) => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      setServerError("Будь ласка, виберіть період бронювання");
      return;
    }

    setIsSubmitting(true);
    setServerError(null);
    setSuccessMessage(null);

    try {
      const result = await onSubmit(data);

      if (result.success) {
        setSuccessMessage("Бронювання успішно створено!");
        reset({
          firstName: "",
          lastName: "",
          phone: "",
          deliveryCity: "",
          novaPoshtaBranch: "",
        });
        localStorage.removeItem(STORAGE_KEY); //  очищаємо тільки при успіху
      } else {
        setServerError(result.message || "Помилка при створенні бронювання");
      }
    } catch {
      setServerError("Помилка з'єднання з сервером. Спробуйте пізніше.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(handleFormSubmit)}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="firstName" className={styles.label}>
            Ім&apos;я
          </label>
          <input
            id="firstName"
            type="text"
            placeholder="Ваше ім'я"
            className={errors.firstName ? styles.inputError : styles.input}
            {...register("firstName")}
          />
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName" className={styles.label}>
            Прізвище
          </label>
          <input
            id="lastName"
            type="text"
            placeholder="Ваше прізвище"
            className={errors.lastName ? styles.inputError : styles.input}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName.message}</span>
          )}
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Номер телефону
        </label>
        <input
          id="phone"
          type="tel"
          placeholder="+38 (XXX) XXX XX XX"
          className={errors.phone ? styles.inputError : styles.input}
          {...register("phone")}
        />
        {errors.phone && (
          <span className={styles.error}>{errors.phone.message}</span>
        )}
      </div>
      {/*календар*/}
      {children}

      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="deliveryCity" className={styles.label}>
            Місто доставки
          </label>
          <input
            id="deliveryCity"
            type="text"
            placeholder="Ваше місто"
            className={errors.deliveryCity ? styles.inputError : styles.input}
            {...register("deliveryCity")}
          />
          {errors.deliveryCity && (
            <span className={styles.error}>{errors.deliveryCity.message}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="novaPoshtaBranch" className={styles.label}>
            Відділення Нової Пошти
          </label>
          <input
            id="novaPoshtaBranch"
            type="text"
            placeholder="24"
            className={
              errors.novaPoshtaBranch ? styles.inputError : styles.input
            }
            {...register("novaPoshtaBranch")}
          />
          {errors.novaPoshtaBranch && (
            <span className={styles.error}>
              {errors.novaPoshtaBranch.message}
            </span>
          )}
        </div>
      </div>

      {serverError && <div className={styles.serverError}>{serverError}</div>}
      {successMessage && <div className={styles.success}>{successMessage}</div>}

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
    </form>
  );
}
