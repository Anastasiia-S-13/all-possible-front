"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeedbackItem from "./FeedbackItem";
import { useQuery } from "@tanstack/react-query";
import css from "./FeedbacksBlock.module.css";
import { fetchFeedbacks } from "@/lib/api/clientApi";
import EmptyFeedbacks from "../EmptyFeedback/EmptyFeedbacks";
import SwiperBtnPrev from "./SwiperButton/SwiperBtnPrev";
import SwiperBtnNext from "./SwiperButton/SwiperBtnNext";
import EmptyUserFeedbacks from "../EmptyFeedback/EmptyUserFeedbacks";
import { useState } from "react";
import EmptyUserPersonalFeedbacks from "../EmptyFeedback/EmptyUserPersonalFeedbacks";
import { useAuthStore } from "@/stores/authStore";
import Modal from "@/components/Modal/Modal";
import AuthRedirectModal from "@/components/modals/AuthRedirect/AuthRedirectModal";
import FeedbackFormModal from "@/components/modals/FeedBackFormModal/FeedbackFormModal";

interface FeedbacksBlockProps {
  toolId?: string;
  userId?: string;
  isOwner?: boolean;
}

const FeedbacksBlock = ({
  toolId,
  userId,
  isOwner = false,
}: FeedbacksBlockProps) => {
  const { isAuthenticated } = useAuthStore();

  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const handleLeaveFeedback = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsFeedbackOpen(true);
  };

  const { data, isSuccess } = useQuery({
    queryKey: ["feedbackAllKey", toolId, userId],
    queryFn: () => fetchFeedbacks({ page: 1, toolId, userId }),
  });

  const allFeedbacks = data?.feedbacks ?? [];

  const hasFeedbacks = isSuccess && allFeedbacks.length > 0;
  const hasNoFeedbacks = isSuccess && allFeedbacks.length === 0;

  const isToolPage = Boolean(toolId);
  const isUserPage = Boolean(userId);
  const isMainPage = !toolId && !userId;

  return (
    <section className={css.feedbackSection}>
      <div className={css.feedbackStaticBox}>
        <h2 className={css.feedbackTitle}>
          {isMainPage && "Останні відгуки"}
          {(isToolPage || isUserPage) && "Відгуки"}
        </h2>
        {isToolPage && (
          <button className={css.feedbackBtn} onClick={handleLeaveFeedback}>
            Залишити відгук
          </button>
        )}
      </div>
      {hasNoFeedbacks && isToolPage && <EmptyFeedbacks />}
      {hasNoFeedbacks && isUserPage && !isOwner && <EmptyUserFeedbacks />}
      {hasNoFeedbacks && isUserPage && isOwner && (
        <EmptyUserPersonalFeedbacks />
      )}
      {hasFeedbacks && (
        <>
          <Swiper
            className={css.feedbackSwiper}
            modules={[Navigation, Pagination]}
            navigation={{
              nextEl: ".swaperBtnNext",
              prevEl: ".swaperBtnPrev",
            }}
            pagination={{
              el: ".feedback-pagination",
              clickable: true,
            }}
            spaceBetween={32}
            grabCursor={true}
            breakpoints={{
              375: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1440: { slidesPerView: 3 },
            }}
            onSwiper={(swiper) => {
              setIsStart(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
            onSlideChange={(swiper) => {
              setIsStart(swiper.isBeginning);
              setIsEnd(swiper.isEnd);
            }}
          >
            {allFeedbacks.map((feedback) => (
              <SwiperSlide key={feedback._id}>
                <FeedbackItem feedback={feedback} />
              </SwiperSlide>
            ))}
          </Swiper>
          <div className={css.feedbackSwiperContainer}>
            <div className="feedback-pagination"></div>
            <div className={css.feedbackSwiperBtnBox}>
              <div
                className={`swaperBtnPrev ${
                  isStart ? css.feedbackSwiperBtnDisabled : ""
                }`}
              >
                <SwiperBtnPrev />
              </div>
              <div
                className={`swaperBtnNext ${
                  isEnd ? css.feedbackSwiperBtnDisabled : ""
                }`}
              >
                <SwiperBtnNext />
              </div>
            </div>
          </div>
        </>
      )}
      {isAuthModalOpen && (
        <Modal onClose={() => setIsAuthModalOpen(false)}>
          <AuthRedirectModal />
        </Modal>
      )}
      {isFeedbackOpen && toolId && (
        <Modal onClose={() => setIsFeedbackOpen(false)}>
          <div className={css.feedBackModalContainer}>
            <h2 className={css.feedBackModalTitle}>Залишити відгук на товар</h2>
            <FeedbackFormModal
              toolId={toolId}
              onSuccess={() => setIsFeedbackOpen(false)}
            />
          </div>
        </Modal>
      )}
    </section>
  );
};

export default FeedbacksBlock;
