"use client";

import { User } from "@/types/User";
import { Rating } from "react-simple-star-rating";
import EmptyStar from "../EmptyStar";
import FulledStar from "../FullerStar";
import css from "./RateUserStars.module.css";
interface RateUserStarsProps {
  user: User;
}

export const RateUserStars = async ({ user }: RateUserStarsProps) => {
  return (
    <div className={css.rateUserBox}>
      <Rating
        allowFraction
        initialValue={user.rating}
        emptyIcon={<EmptyStar />}
        fillIcon={<FulledStar />}
        readonly
      />
      <div className={css.feedBackCountBox}>
        <p>{`(${Number(user.rating.toFixed(1))})`}</p>
        <p className={css.rateUserFeedBackCount}>
          {`• ${user.feedbackCount} відгуки`}
        </p>
      </div>
    </div>
  );
};
