import css from "./SwiperBtn.module.css";

const SwiperBtnNext = () => {
  return (
    <button className={css.swiperButtonNext}>
      <svg width="24" height="24">
        <use href="/sprite/sprite.svg#icon-arrow_forward"></use>
      </svg>
    </button>
  );
};

export default SwiperBtnNext;
