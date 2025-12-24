import css from "./DeleteConfirmationModal.module.css";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const DeleteConfirmationModal = ({
  onConfirm,
  onCancel,
  isLoading = false,
}: DeleteConfirmationModalProps) => {
  return (
    <div className={css.modalWrap}>
      <h1 className={css.heading}>
        Ви впевнені, що хочете видалити оголошення?
      </h1>
      <div className={css.buttons}>
        <button
          className={css.cancelBtn}
          onClick={onCancel}
          disabled={isLoading}
        >
          Залишити
        </button>
        <button
          className={css.deleteBtn}
          onClick={onConfirm}
          disabled={isLoading}
        >
          {isLoading ? "Видалення..." : "Видалити"}
        </button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
