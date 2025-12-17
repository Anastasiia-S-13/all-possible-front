export interface CalendarDay {
  day: number;
  type: "prev" | "current" | "next";
}

export const buildCalendar = (year: number, month: number): CalendarDay[] => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = (firstDay.getDay() + 6) % 7; // Пн = 0

  const prevMonthLastDay = new Date(year, month, 0).getDate();

  const calendar: CalendarDay[] = [];

  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    calendar.push({
      day: prevMonthLastDay - i,
      type: "prev",
    });
  }

  for (let d = 1; d <= daysInMonth; d++) {
    calendar.push({
      day: d,
      type: "current",
    });
  }

  while (calendar.length % 7 !== 0) {
    calendar.push({
      day: calendar.length - (startDayOfWeek + daysInMonth) + 1,
      type: "next",
    });
  }

  return calendar;
};
