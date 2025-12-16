"use client";

import HeaderModal from "./HeaderModal";
import styles from "./ConfirmationModal.module.css";

interface Props {
  title: string;
  description?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal({ title, description, onConfirm, onCancel }: Props) {
  return (
    <HeaderModal onClose={onCancel}>
      <div className={styles.content}>
        <h2>{title}</h2>
        {description && <p>{description}</p>}

        <div className={styles.actions}>
          <button className={styles.cancel} onClick={onCancel}>
            Скасувати
          </button>
          <button className={styles.confirm} onClick={onConfirm}>
            Вийти
          </button>
        </div>
      </div>
    </HeaderModal>
  );
}
