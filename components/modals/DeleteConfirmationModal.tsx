"use client";

import css from "./DeleteConfirmationModal.module.css";

type Variant = "primary" | "danger";

type ConfirmationModalProps = {
  title: string;
  text?: string; // optional helper text under title
  leftText: string;
  rightText: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  rightVariant?: Variant;
};

export default function ConfirmationModal({
  title,
  text,
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
  rightVariant = "primary",
}: ConfirmationModalProps) {
  return (
    <div className={css.modalWrap}>
      <div className={css.headingWrap}>
        <h2 className={css.heading}>{title}</h2>
        {text ? <p className={css.text}>{text}</p> : null}
      </div>

      <div className={css.buttons}>
        <button type="button" className={css.leftBtn} onClick={onLeftClick}>
          {leftText}
        </button>

        <button
          type="button"
          className={`${css.rightBtn} ${
            rightVariant === "danger" ? css.danger : css.primary
          }`}
          onClick={onRightClick}
        >
          {rightText}
        </button>
      </div>
    </div>
  );
}