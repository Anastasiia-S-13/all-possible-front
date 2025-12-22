"use client";

import { User } from "@/types/User";
import { Rating } from "react-simple-star-rating";
import EmptyStar from "../EmptyStar";
import FulledStar from "../FullerStar";
import css from "./RateUserStars.module.css";
interface RateUserStarsProps {
  user: User;
}

export const RateUserStars = ({ user }: RateUserStarsProps) => {
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
       <p>{`(${user.rating?.toFixed(1) ?? "0.0"})`}</p>
        <p className={css.rateUserFeedBackCount}>
          {`• ${user.feedbackCount} відгуки`}
        </p>
      </div>
    </div>
  );
};
