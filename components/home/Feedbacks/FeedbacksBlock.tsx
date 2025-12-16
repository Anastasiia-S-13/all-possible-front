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

const FeedbacksBlock = () => {
  const { data, isSuccess, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["feedbackAllKey"],
      initialPageParam: 1,
      queryFn: ({ pageParam }) => fetchFeedbacks(pageParam),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const allFeedbacks = data?.pages.flatMap((p) => p.feedbacks) ?? [];

  return (
    <section className={css.feedbackSection}>
      <div className={css.feedbackStaticBox}>
        <h2 className={css.feedbackTitle}>Останні відгуки</h2>
        {isSuccess && (data?.pages[0]?.totalPages ?? 0) === 0 && (
          <button className={css.feedbackBtn}>Залишити відгук</button>
        )}
      </div>
      {isSuccess && (data?.pages[0]?.totalPages ?? 0) === 0 && (
        <EmptyFeedbacks />
      )}
      {isSuccess && (data?.pages[0]?.totalPages ?? 0) > 0 && (
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
              <div className="swaperBtnPrev">
                <SwiperBtnPrev />
              </div>
              <div className="swaperBtnNext">
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
