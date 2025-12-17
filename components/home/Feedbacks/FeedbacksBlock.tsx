"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Virtual } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import FeedbackItem from "./FeedbackItem";
import { useInfiniteQuery } from "@tanstack/react-query";
import css from "./FeedbacksBlock.module.css";
import { fetchFeedbacks } from "@/lib/api/clientApi";
import EmptyFeedbacks from "../EmptyFeedback/EmptyFeedbacks";
import SwiperBtnPrev from "./SwiperButton/SwiperBtnPrev";
import SwiperBtnNext from "./SwiperButton/SwiperBtnNext";
import EmptyUserFeedbacks from "../EmptyFeedback/EmptyUserFeedbacks";
import { useState } from "react";

interface FeedbacksBlockProps {
  toolId?: string;
  userId?: string;
}

const FeedbacksBlock = ({ toolId, userId }: FeedbacksBlockProps) => {
  const [isStart, setIsStart] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feedbackAllKey", toolId, userId],
      initialPageParam: 1,
      queryFn: ({ pageParam }) =>
        fetchFeedbacks({ page: pageParam, toolId, userId }),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const allFeedbacks = data?.pages.flatMap((p) => p.feedbacks) ?? [];
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
          <button className={css.feedbackBtn}>Залишити відгук</button>
        )}
      </div>
      {hasNoFeedbacks && isToolPage && <EmptyFeedbacks />}
      {hasNoFeedbacks && isUserPage && <EmptyUserFeedbacks />}
      {hasFeedbacks && (
        <>
          <Swiper
            className={css.feedbackSwiper}
            modules={[Navigation, Virtual, Pagination]}
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
            virtual
            onReachEnd={() => {
              if (hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
              }
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
            {allFeedbacks.map((feedback, index) => (
              <SwiperSlide key={feedback._id} virtualIndex={index}>
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
                  isEnd && !hasNextPage ? css.feedbackSwiperBtnDisabled : ""
                }`}
              >
                <SwiperBtnNext />
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default FeedbacksBlock;
