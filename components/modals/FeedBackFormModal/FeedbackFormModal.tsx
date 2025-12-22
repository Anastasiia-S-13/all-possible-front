"use client";

import { useEffect, useState } from "react";
import { Rating } from "react-simple-star-rating";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import css from "./FeedbackFormModal.module.css";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";

import { CreateNewFeedback, FeedbackFormModalProps } from "@/types/Feedback";
import { createNewFeedBack } from "@/lib/api/clientApi";
import EmptyStar from "@/components/RateStars/EmptyStar";
import FulledStar from "@/components/RateStars/FullerStar";
import { validationSchema } from "@/lib/validation/feedBackFormValidation";
import { useFeedBackDraftStore } from "@/stores/feedBackFormStore";

export default function FeedbackFormModal({
  toolId,
  onSuccess,
}: FeedbackFormModalProps) {
  const queryClient = useQueryClient();

  const [rate, setRate] = useState<number>(0);
  const [rateError, setRateError] = useState<string | null>(null);

  const { draft, setDraft, clearDraft } = useFeedBackDraftStore();

  useEffect(() => {
    if (draft.rate) {
      setRate(draft.rate);
    }
  }, [draft.rate]);

  const handleRating = (rate: number) => {
    setDraft({
      ...draft,
      rate: rate,
    });
    setRate(rate);
    setRateError(null);
  };

  const initialValues: CreateNewFeedback = {
    name: draft?.name || "",
    description: draft?.description || "",
  };

  const mutationFeedBack = useMutation({
    mutationFn: async ({ name, description, rate }: CreateNewFeedback) => {
      return createNewFeedBack({ name, description, rate }, { toolId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "feedbackAllKey",
      });

      clearDraft();
      setRate(0);
      onSuccess?.();
    },
  });

  const handleSubmit = (
    values: CreateNewFeedback,
    actions: FormikHelpers<CreateNewFeedback>
  ) => {
    if (rate === 0) {
      setRateError("Будь ласка, поставте оцінку");
      return;
    }
    mutationFeedBack.mutate({
      name: values.name,
      description: values.description,
      rate,
    });

    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ handleChange }) => (
        <Form className={css.form}>
          <div className={css.feedBackModalBox}>
            <div className={css.feedBackModalSubBox}>
              <label htmlFor="name">Імʼя</label>
              <Field
                id="name"
                name="name"
                type="text"
                className={css.feedBackModalName}
                minLength={2}
                maxLength={15}
                placeholder="Ваше ім'я"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange(e);
                  setDraft({
                    ...draft,
                    name: e.target.value,
                  });
                }}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.feedBackModalSubBox}>
              <label htmlFor="description">Відгук</label>
              <Field
                as="textarea"
                id="description"
                name="description"
                rows={10}
                maxLength={80}
                className={css.feedBackModalDescription}
                placeholder="Ваш відгук"
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  handleChange(e);
                  setDraft({
                    ...draft,
                    description: e.target.value,
                  });
                }}
              />
              <ErrorMessage
                name="description"
                component="span"
                className={css.error}
              />
            </div>

            <div className={css.feedBackModalSubBox}>
              <label>Оцінка</label>
              <Rating
                allowFraction
                onClick={handleRating}
                transition
                initialValue={draft?.rate}
                size={24}
                emptyIcon={<EmptyStar />}
                fillIcon={<FulledStar />}
                className={css.feedBackModalRating}
              />
              {rateError && <span className={css.error}>{rateError}</span>}
            </div>

            <div className={css.feedBackModalButtonBox}>
              <button
                type="submit"
                className={css.feedBackModalButton}
                disabled={mutationFeedBack.isPending}
              >
                Надіслати
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}
