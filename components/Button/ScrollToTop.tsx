import css from "./Button.module.css";

interface ScrollToTopProps {
  isVisible: boolean;
  onClick: () => void;
}

const ScrollToTop = ({ isVisible, onClick }: ScrollToTopProps) => {
  return (
    <button
      className={`${css.scrollToTopBtn} ${
        isVisible ? css.scrollToTopBtnVisible : ""
      }`}
      onClick={onClick}
    >
      <svg width="50" height="50">
        <use href="/sprite/sprite.svg#icon-keyboard_arrow_up"></use>
      </svg>
    </button>
  );
};

export default ScrollToTop;
