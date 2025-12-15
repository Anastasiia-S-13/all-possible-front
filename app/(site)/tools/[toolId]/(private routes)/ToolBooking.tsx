"use client";

import { use, useEffect, useState } from "react";
import styles from "./ToolBooking.module.css";
import { DateRange, Tool } from "@/type/Booking";
import { BookingFormSchema } from "@/lib/validation/validateBooking";
import { createBooking } from "@/lib/api/clientApi";
import BookingForm from "@/components/forms/BookingToolForm/BookingToolForm";
import Calendar from "@/components/Calendar/Calendar";
import Loader from "@/app/loading";

interface BookingPageProps {
  params: Promise<{ toolId: string }>;
}

export default function BookingPage({ params }: BookingPageProps) {
  const { toolId } = use(params);
  const [tool, setTool] = useState<Tool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRange, setSelectedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  useEffect(() => {
    const fetchToolData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`/api/tools/${toolId}`);

        if (!response.ok) {
          throw new Error("Не вдалося завантажити дані інструменту");
        }

        const data = await response.json();
        setTool(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Сталася помилка");
      } finally {
        setIsLoading(false);
      }
    };

    if (toolId) {
      fetchToolData();
    }
  }, [toolId]);

  const handleBookingSubmit = async (
    formData: BookingFormSchema
  ): Promise<{ success: boolean; message?: string }> => {
    if (!selectedRange.startDate || !selectedRange.endDate) {
      return { success: false, message: "Виберіть період бронювання" };
    }

    try {
      const userId = "temp-user-id-" + Date.now();

      const bookingData = {
        toolId,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        startDate: selectedRange.startDate.toISOString().split("T")[0],
        endDate: selectedRange.endDate.toISOString().split("T")[0],
        deliveryCity: formData.deliveryCity,
        novaPoshtaBranch: formData.novaPoshtaBranch,
        userId,
      };

      const result = await createBooking(bookingData);

      if (result.success) {
        setSelectedRange({ startDate: null, endDate: null });
        return { success: true };
      } else {
        return {
          success: false,
          message: result.message || "Помилка при створенні бронювання",
        };
      }
    } catch {
      return {
        success: false,
        message: "Помилка з'єднання з сервером",
      };
    }
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
      <main className={styles.main}>
        <div className={styles.container}>
          <Loader />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Помилка</h1>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  if (!tool) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Інструмент не знайдено</h1>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
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
    </main>
  );
}
