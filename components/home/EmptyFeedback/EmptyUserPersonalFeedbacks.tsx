import css from "./EmptyFeedback.module.css";

const EmptyUserPersonalFeedbacks = () => {
  return (
    <div className={css.emptyFeedbacksBox}>
      <p className={css.emptyFeedbacksTitle}>У вас немає жодного відгуку</p>
      <p className={css.emptyFeedbacksText}>
        Ми впевнені скоро їх буде значно більше!
      </p>
    </div>
  );
};
export default EmptyUserPersonalFeedbacks;
