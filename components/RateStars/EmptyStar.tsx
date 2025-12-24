import css from "./Star.module.css";

const EmptyStar = () => {
  return (
    <svg className={css.star} width="24" height="24">
      <use href="/sprite/sprite.svg#icon-star"></use>
    </svg>
  );
};

export default EmptyStar;
