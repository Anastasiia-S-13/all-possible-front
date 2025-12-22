import styles from "./ConfirmationModal.module.css";

type Variant = "primary" | "danger";

type ConfirmationModalProps = {
  title: string;
  leftText: string;
  rightText: string;
  onLeftClick: () => void;
  onRightClick: () => void;
  rightVariant?: Variant;
};

export default function ConfirmationModal({
  title,
  leftText,
  rightText,
  onLeftClick,
  onRightClick,
  rightVariant = "primary",
}: ConfirmationModalProps) {
  return (
    <div className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>

      <div className={styles.buttons}>
        <button type="button" className={styles.leftBtn} onClick={onLeftClick}>
          {leftText}
        </button>

        <button
          type="button"
          className={`${styles.rightBtn} ${
            rightVariant === "danger" ? styles.danger : styles.primary
          }`}
          onClick={onRightClick}
        >
          {rightText}
        </button>
      </div>
    </div>
  );
}
