import HeaderModal from "./HeaderModal";
import styles from "./AuthHeaderModal.module.css";

const RegisterModal = ({ onClose }: { onClose: () => void }) => {
  return (
    <HeaderModal onClose={onClose}>
      <div className={styles.form}>
        <h2 className={styles.mainh}>Реєстрація</h2>

        <input placeholder="Ваше ім'я" />
        <input placeholder="Ваша пошта" />
        <input type="password" placeholder="Пароль" />
        <input type="password" placeholder="Підтвердіть пароль" />

        <button className={styles.primary}>Зареєструватися</button>
        <p className={styles.noaccount}>
          Вже маєте аккаунт? <span>Вхід</span>
        </p>
      </div>

      <div className={styles.image}>
        <img src="/auth/register.jpg" />
      </div>
    </HeaderModal>
  );
};

export default RegisterModal;
