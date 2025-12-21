"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Calendar from "@/components/BookingPage/Calendar/Calendar";
import BookingForm from "@/components/BookingPage/BookingForm/BookingForm";
import { Tool, DateRange } from "@/types/Booking";
import { createBooking, getToolById } from "@/lib/api/bookingApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { BookingFormSchema } from "@/lib/validation/validateBooking";
import styles from "./ToolBooking.module.css";
import Loader from "@/app/loading";
interface BookingPageProps {
  params: { toolId: string };
}

export default function ToolBookingClientPage({ params }: BookingPageProps) {
  const { toolId } = useParams<{ toolId: string }>();

  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const getUserId = () => user?.id;
  const router = useRouter();

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

  const bookingMutation = useMutation({
    mutationFn: createBooking,
    onSuccess: (result) => {
      if (!result.success) return;

      const newPeriod = {
        startDate: result.booked.rentalPeriod.startDate,
        endDate: result.booked.rentalPeriod.endDate,
      };

      queryClient.setQueryData<Tool>(["tool", toolId], (old) =>
        old
          ? {
            ...old,
            bookedPeriods: [...(old.bookedPeriods || []), newPeriod],
            bookedDates: [...(old.bookedDates || []), newPeriod],
          }
          : old
      );

      setSelectedRange({ startDate: null, endDate: null });
      router.back();
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

    const toLocalISOString = (date: Date) => {
      const y = date.getFullYear();
      const m = String(date.getMonth() + 1).padStart(2, "0");
      const d = String(date.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}T00:00:00.000Z`;
    };

    const bookingData = {
      toolId,
      firstName: formData.firstName,
      lastName: formData.lastName,
      phone: formData.phone,
      startDate: toLocalISOString(selectedRange.startDate),
      endDate: toLocalISOString(selectedRange.endDate),
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

  if (isLoading) {
    return (
      <section className={styles.main}>
        <div className="container">
          <div className={styles.loading}>
            <Loader />
          </div>
        </div>
      </section>
    );
  }

  if (error || !tool) {
    return (
      <section className={styles.main}>
        <div className="container">
          <div className={styles.error}>Помилка завантаження інструменту</div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.main}>
      <div className={styles.bookingWrapper}>
        <h1 className={styles.title}>Підтвердження бронювання</h1>

        <BookingForm
          toolId={toolId}
          pricePerDay={tool.pricePerDay}
          selectedRange={selectedRange}
          onSubmit={handleBookingSubmit}
        >
          <div className={styles.section}>
            <p className={styles.sectionTitle}>Виберіть період бронювання</p>

            <Calendar
              reservedPeriods={[
                ...(tool.bookedPeriods || []),
                ...(tool.bookedDates || []),
              ]}
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
    </section>
  );
}
