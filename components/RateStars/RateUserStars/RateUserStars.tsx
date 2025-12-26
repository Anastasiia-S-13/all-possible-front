"use client";

import { Rating } from "react-simple-star-rating";
import EmptyStar from "../EmptyStar";
import FulledStar from "../FullerStar";
import css from "./RateUserStars.module.css";

interface RateUserStarsProps {
  rating?: number;
  feedbackCount?: number;
}

export const RateUserStars = ({ rating = 0, feedbackCount = 0 }: RateUserStarsProps) => {
  return (
    <div className={css.rateUserBox}>
      <Rating
        className={css.rating}
        allowFraction
        initialValue={rating}
        emptyIcon={<EmptyStar />}
        fillIcon={<FulledStar />}
        readonly
      />
      <div className={css.feedBackCountBox}>
        <p>{`(${rating?.toFixed(1) ?? "0.0"})`}</p>
        <p className={css.rateUserFeedBackCount}>
          {`• ${feedbackCount} відгуки`}
        </p>
      </div>
    </div>
  );
};
