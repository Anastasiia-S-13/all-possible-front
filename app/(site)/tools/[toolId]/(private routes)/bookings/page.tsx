"use client";

import React, { useState } from "react";
import Link from "next/link";
import Calendar from "@/components/Calendar/Calendar";
import BookingForm from "@/components/BookingForm/BookingForm";
import { Tool, DateRange } from "@/types/Booking";
import { BookingFormSchema } from "@/validation/bookingSchema";
import { createBooking, getToolById } from "@/lib/api/bookingApi";
import styles from "./page.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";

interface BookingPageProps {
  params: { toolId: string };
}

export default function BookingPage({ params }: BookingPageProps) {
  const { toolId } = params;

  const queryClient = useQueryClient();
  const { isAuthenticated, isLoading: authLoading, user } = useAuthStore();

  const getUserId = () => user?.id;

  const {
    data: tool,
    isLoading,
    error,
  } = useQuery<Tool>({
    queryKey: ["tool", toolId],
    queryFn: () => getToolById(toolId),
  });

  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  // бронювання..
  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (result) => {
      if (!result.success) return;

      const newPeriod = {
        startDate: result.booked.rentalPeriod.startDate,
        endDate: result.booked.rentalPeriod.endDate,
      };

      // оновлення кеш...
      queryClient.setQueryData<Tool>(["tool", toolId], (old) =>
        old
          ? {
              ...old,
              bookedPeriods: [...old.bookedPeriods, newPeriod],
            }
          : old
      );

      setSelectedRange({ startDate: null, endDate: null });
    },
  });

  const handleBookingSubmit = async (
    formData: BookingFormSchema
  ): Promise<{ success: boolean; message?: string }> => {
    const userId = getUserId();

    if (!userId) {
      return { success: false, message: "Потрібна авторизація" };
    }

    if (!selectedRange.startDate || !selectedRange.endDate) {
      return { success: false, message: "Виберіть період бронювання" };
    }

    const bookingData = {
      toolId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      startDate: selectedRange.startDate.toISOString(),
      endDate: selectedRange.endDate.toISOString(),
      deliveryCity: formData.deliveryCity,
      novaPoshtaBranch: formData.novaPoshtaBranch,
      userId,
    };

    const result = await bookingMutation.mutateAsync(bookingData);
    return result;
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "-";
    return date.toLocaleDateString("uk-UA", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (authLoading || isLoading) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.loading}>Завантаження...</div>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.loginRequired}>
            <h2>Потрібна авторизація</h2>
            <p>Для бронювання інструменту потрібно увійти в систему</p>
            <Link href="/login" className={styles.loginBtn}>
              Увійти
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (error || !tool) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.error}>Помилка завантаження інструменту</div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Підтвердження бронювання</h1>

        <div className={styles.bookingWrapper}>
          <BookingForm
            toolId={toolId}
            pricePerDay={tool.pricePerDay}
            selectedRange={selectedRange}
            onSubmit={handleBookingSubmit}
          >
            <div className={styles.section}>
              <p className={styles.sectionTitle}>Виберіть період бронювання</p>

              <Calendar
                reservedPeriods={tool.bookedPeriods || []}
                selectedRange={selectedRange}
                onRangeChange={setSelectedRange}
              />

              {(selectedRange.startDate || selectedRange.endDate) && (
                <div className={styles.dateRangeInfo}>
                  <strong>Обраний період:</strong>{" "}
                  {formatDate(selectedRange.startDate)} —{" "}
                  {formatDate(selectedRange.endDate)}
                </div>
              )}
            </div>
          </BookingForm>
        </div>
      </div>
    </main>
  );
}
