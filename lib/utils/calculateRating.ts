import { DateRange } from "@/type/Booking";

export const calculateTotalPrice = (
  pricePerDay: number,
  selectedRange: DateRange
): number => {
  if (!selectedRange.startDate || !selectedRange.endDate) {
    return pricePerDay;
  }

  const diffTime = Math.abs(
    selectedRange.endDate.getTime() - selectedRange.startDate.getTime()
  );
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  return pricePerDay * diffDays;
};
