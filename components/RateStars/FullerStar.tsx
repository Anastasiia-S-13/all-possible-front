import css from "./Star.module.css";

const FulledStar = () => {
  return (
    <svg className={css.star} width="24" height="24">
      <use href="/sprite/sprite.svg#icon-star-filled"></use>
    </svg>
  );
};

export default FulledStar;
