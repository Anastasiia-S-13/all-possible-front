import Link from "next/link";

const AuthRedirectModal = () => {
  return (
    <div>
      <div>
        <h1>Спочатку авторизуйтесь</h1>
        <p>
          Щоб забрронювати інструмент, треба спочатку зареєструватись, або
          авторизуватись на платформі
        </p>
      </div>
      <div>
        <Link href={"/auth/login"}>Вхід</Link>
        <Link href={"/auth/register"}>Реєстрація</Link>
      </div>
    </div>
  );
};

export default AuthRedirectModal;
