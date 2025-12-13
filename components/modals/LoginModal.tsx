import HeaderModal from "./HeaderModal";
import styles from "./AuthHeaderModal.module.css";

const LoginModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <HeaderModal onClose={onClose}>
      <div className={styles.form}>
        <h2 className={styles.mainh}>Вхід</h2>

        <label>Пошта*</label>
        <input placeholder="Ваша пошта" />

        <label>Пароль*</label>
        <input type="password" />

        <button className={styles.primary}>Увійти</button>

        <p className={styles.noaccount}>
          Не маєте акаунту? <span>Реєстрація</span>
        </p>
      </div>

      <div className={styles.image}>
        <img src="/auth/login.jpg" alt="Workshop" />
      </div>
    </HeaderModal>
  );
};

export default LoginModal;
