import css from "./EmptyFeedback.module.css";

const EmptyFeedbacks = () => {
  return (
    <div className={css.emptyFeedbacksBox}>
      <p className={css.emptyFeedbacksTitle}>
        У цього інструменту немає жодного відгуку
      </p>
      <p className={css.emptyFeedbacksText}>
        Ми впевнені скоро їх буде значно більше!
      </p>
    </div>
  );
};
export default EmptyFeedbacks;
