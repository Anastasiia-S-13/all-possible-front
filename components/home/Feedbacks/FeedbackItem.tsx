import EmptyStar from "@/components/RateStars/EmptyStar";
import FulledStar from "@/components/RateStars/FullerStar";
import { Feedback } from "@/type/Feedback";
import { Rating } from "react-simple-star-rating";
import css from "./FeedbacksBlock.module.css";

interface FeedbackItemProps {
  feedback: Feedback;
}

const FeedbackItem = ({ feedback }: FeedbackItemProps) => {
  return (
    <div className={css.feedbackItemBox}>
      <Rating
        emptyIcon={<EmptyStar />}
        allowFraction
        fillIcon={<FulledStar />}
        initialValue={feedback.rate}
        readonly
      />
      <p className={css.feedbackItemText}>{feedback.description}</p>
      <p className={css.feedbackItemName}>{feedback.name}</p>
    </div>
  );
};

export default FeedbackItem;
