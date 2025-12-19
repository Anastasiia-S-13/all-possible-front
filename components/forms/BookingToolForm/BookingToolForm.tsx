"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import * as yup from "yup";
import { DateRange } from "@/types/Booking";
import {
  BookingFormSchema,
  bookingSchema,
} from "@/lib/validation/validateBooking";
import { calculateTotalPrice } from "@/lib/utils/calculateRating";
import { useBookingStore } from "@/lib/store/BookingStore";
import styles from "./BookingForm.module.css";

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
  const router = useRouter();

  const { formData, setField, resetForm } = useBookingStore();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalPrice = calculateTotalPrice(pricePerDay, selectedRange);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setField(name as keyof typeof formData, value);

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);

    const fullData: BookingFormSchema = {
      ...formData,
      toolId: toolId,
      startDate: selectedRange.startDate
        ? selectedRange.startDate.toISOString().split("T")[0]
        : "",
      endDate: selectedRange.endDate
        ? selectedRange.endDate.toISOString().split("T")[0]
        : "",
    };

    if (!fullData.startDate || !fullData.endDate) {
      setServerError("Будь ласка, виберіть період бронювання");
      return;
    }

    setIsSubmitting(true);

    try {
      await bookingSchema.validate(fullData, { abortEarly: false });

      const result = await onSubmit(fullData);

      if (result.success) {
        resetForm();
        router.back();
      } else {
        setServerError(result.message || "Помилка при створенні бронювання");
      }
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path] = error.message;
          }
        });
        setErrors(newErrors);
      } else {
        setServerError("Помилка з'єднання з сервером.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="firstName" className={styles.label}>
            Ім&apos;я
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Ваше ім'я"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? styles.inputError : styles.input}
          />
          {errors.firstName && (
            <span className={styles.error}>{errors.firstName}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="lastName" className={styles.label}>
            Прізвище
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Ваше прізвище"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? styles.inputError : styles.input}
          />
          {errors.lastName && (
            <span className={styles.error}>{errors.lastName}</span>
          )}
        </div>
      </div>
      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Номер телефону
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+38 (XXX) XXX XX XX"
          value={formData.phone}
          onChange={handleChange}
          className={errors.phone ? styles.inputError : styles.input}
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>
      {children} {/* Календар */}
      <div className={styles.row}>
        <div className={styles.field}>
          <label htmlFor="deliveryCity" className={styles.label}>
            Місто доставки
          </label>
          <input
            id="deliveryCity"
            name="deliveryCity"
            type="text"
            placeholder="Ваше місто"
            value={formData.deliveryCity}
            onChange={handleChange}
            className={errors.deliveryCity ? styles.inputError : styles.input}
          />
          {errors.deliveryCity && (
            <span className={styles.error}>{errors.deliveryCity}</span>
          )}
        </div>

        <div className={styles.field}>
          <label htmlFor="novaPoshtaBranch" className={styles.label}>
            Відділення НП
          </label>
          <input
            id="novaPoshtaBranch"
            name="novaPoshtaBranch"
            type="text"
            placeholder="24"
            value={formData.novaPoshtaBranch}
            onChange={handleChange}
            className={
              errors.novaPoshtaBranch ? styles.inputError : styles.input
            }
          />
          {errors.novaPoshtaBranch && (
            <span className={styles.error}>{errors.novaPoshtaBranch}</span>
          )}
        </div>
      </div>
      {serverError && <div className={styles.serverError}>{serverError}</div>}
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
