import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface BookingState {
  formData: {
    firstName: string;
    lastName: string;
    phone: string;
    deliveryCity: string;
    novaPoshtaBranch: string;
  };
  setField: (field: keyof BookingState["formData"], value: string) => void;
  resetForm: () => void;
}

const initialState = {
  firstName: "",
  lastName: "",
  phone: "",
  deliveryCity: "",
  novaPoshtaBranch: "",
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      formData: initialState,

      setField: (field, value) =>
        set((state) => ({
          formData: { ...state.formData, [field]: value },
        })),

      resetForm: () => set({ formData: initialState }),
    }),
    {
      name: "booking-form-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
