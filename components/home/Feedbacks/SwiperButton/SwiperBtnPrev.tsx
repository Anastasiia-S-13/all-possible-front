import css from "./SwiperBtn.module.css";

const SwiperBtnPrev = () => {
  return (
    <button className={css.swiperButtonPrev}>
      <svg width="24" height="24">
        <use href="/sprite/sprite.svg#icon-arrow_back"></use>
      </svg>
    </button>
  );
};

export default SwiperBtnPrev;
