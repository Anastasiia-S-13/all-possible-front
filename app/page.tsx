import styles from "./page.module.css";
import NewTool from "./(site)/tools/new/page";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Ласкаво просимо</h1>
      <NewTool />
      <p className={styles.description}>
        This is the main landing page of the application.
      </p>
    </main>
  );
}
