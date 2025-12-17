"use client";

import React, { useState, useMemo } from "react";
import { BookedPeriod, DateRange } from "@/types/booking";
import { buildCalendar, CalendarDay } from "@/lib/util/buildCalendar";
import styles from "./Calendar.module.css";

interface CalendarProps {
  reservedPeriods: BookedPeriod[];
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const MONTH_NAMES = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const WEEKDAYS = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"];

export default function Calendar({
  reservedPeriods,
  selectedRange,
  onRangeChange,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectingEnd, setSelectingEnd] = useState(false);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const reservedDates = useMemo(() => {
    const dates = new Set<string>();
    reservedPeriods.forEach((period) => {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);
      const current = new Date(start);
      while (current <= end) {
        dates.add(current.toISOString().split("T")[0]);
        current.setDate(current.getDate() + 1);
      }
    });
    return dates;
  }, [reservedPeriods]);

  const days = useMemo(() => buildCalendar(year, month), [year, month]);

  const isDateReserved = (day: number): boolean => {
    const dateStr = new Date(year, month, day).toISOString().split("T")[0];
    return reservedDates.has(dateStr);
  };

  const isDateInPast = (day: number): boolean => {
    const date = new Date(year, month, day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  const isToday = (day: number): boolean => {
    const today = new Date();
    return (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    );
  };

  const isWeekend = (day: number): boolean => {
    const date = new Date(year, month, day);
    const dayOfWeek = date.getDay();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  const isInSelectedRange = (day: number): boolean => {
    if (!selectedRange.startDate || !selectedRange.endDate) return false;
    const date = new Date(year, month, day);
    return date > selectedRange.startDate && date < selectedRange.endDate;
  };

  const isRangeStart = (day: number): boolean => {
    if (!selectedRange.startDate) return false;
    const date = new Date(year, month, day);
    return date.toDateString() === selectedRange.startDate.toDateString();
  };

  const isRangeEnd = (day: number): boolean => {
    if (!selectedRange.endDate) return false;
    const date = new Date(year, month, day);
    return date.toDateString() === selectedRange.endDate.toDateString();
  };

  const handleDayClick = (day: number) => {
    if (isDateReserved(day) || isDateInPast(day)) return;

    const clickedDate = new Date(year, month, day);

    if (!selectingEnd || !selectedRange.startDate) {
      onRangeChange({ startDate: clickedDate, endDate: null });
      setSelectingEnd(true);
    } else {
      if (clickedDate < selectedRange.startDate) {
        onRangeChange({
          startDate: clickedDate,
          endDate: selectedRange.startDate,
        });
      } else {
        onRangeChange({
          startDate: selectedRange.startDate,
          endDate: clickedDate,
        });
      }
      setSelectingEnd(false);
    }
  };

  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  function getDayClasses(item: CalendarDay) {
    const { day, type } = item;

    const classesArray = [];
    classesArray.push(styles.day);

    if (type !== "current") {
      classesArray.push(styles.empty);
      return classesArray.join(" ");
    }

    const isReserved = isDateReserved(day);
    if (isReserved === true) {
      classesArray.push(styles.reserved);
    } else {
      const isPast = isDateInPast(day);
      if (isPast === true) {
        classesArray.push(styles.disabled);
      } else {
        const isStart = isRangeStart(day);
        if (isStart === true) {
          classesArray.push(styles.rangeStart);
        } else {
          const isEnd = isRangeEnd(day);
          if (isEnd === true) {
            classesArray.push(styles.rangeEnd);
          } else {
            const isInRange = isInSelectedRange(day);
            if (isInRange === true) {
              classesArray.push(styles.inRange);
            }
          }
        }

        const isWeekendDay = isWeekend(day);
        const notStart = !isRangeStart(day);
        const notEnd = !isRangeEnd(day);
        if (isWeekendDay === true && notStart === true && notEnd === true) {
          classesArray.push(styles.weekend);
        }
      }
    }

    const isTodayDay = isToday(day);
    if (isTodayDay === true) {
      classesArray.push(styles.today);
    }

    return classesArray.join(" ");
  }

  return (
    <div className={styles.calendarContainer}>
      <div className={styles.header}>
        <span className={styles.year}>{year}</span>
        <div className={styles.monthNav}>
          <button onClick={prevMonth} className={styles.navBtn} type="button">
            ‹
          </button>
          <span className={styles.monthName}>{MONTH_NAMES[month]}</span>
          <button onClick={nextMonth} className={styles.navBtn} type="button">
            ›
          </button>
        </div>
      </div>
      <div className={styles.calendar}>
        <div className={styles.weekDays}>
          {WEEKDAYS.map((day) => (
            <div key={day} className={styles.weekDay}>
              {day}
            </div>
          ))}
        </div>

        <div className={styles.days}>
          {days.map((item, index) => (
            <button
              key={index}
              type="button"
              className={getDayClasses(item)}
              onClick={() =>
                item.type === "current" && handleDayClick(item.day)
              }
              disabled={
                item.type !== "current" ||
                isDateReserved(item.day) ||
                isDateInPast(item.day)
              }
            >
              {item.day}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
