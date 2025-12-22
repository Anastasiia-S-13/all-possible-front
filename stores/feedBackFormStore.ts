import { CreateNewFeedback } from "@/types/Feedback";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type FeedbackDraftStore = {
  draft: CreateNewFeedback;
  setDraft: (feedback: CreateNewFeedback) => void;
  clearDraft: () => void;
};

const initialDraft: CreateNewFeedback = {
  name: "",
  description: "",
  rate: 0,
};

export const useFeedBackDraftStore = create<FeedbackDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (feedback) => set(() => ({ draft: feedback })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "feedback-draft",
      partialize: (state) => ({ draft: state.draft }),
    }
  )
);
