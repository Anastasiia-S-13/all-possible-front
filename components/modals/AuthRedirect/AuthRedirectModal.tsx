import Link from "next/link";

import css from "./AuthRedirectModal.module.css";

const AuthRedirectModal = () => {
  return (
    <div className={css.modalWrap}>
      <div className={css.headingWrap}>
        <h1 className={css.heading}>Спочатку авторизуйтесь</h1>
        <p className={css.text}>
          Щоб забрронювати інструмент, треба спочатку зареєструватись, або
          авторизуватись на платформі
        </p>
      </div>
      <div className={css.buttons}>
        <Link className={css.login} href={"/auth/login"}>
          Вхід
        </Link>
        <Link className={css.register} href={"/auth/register"}>
          Реєстрація
        </Link>
      </div>
    </div>
  );
};

export default AuthRedirectModal;
