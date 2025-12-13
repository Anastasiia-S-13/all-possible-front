import Header from "@/components/layout/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <h1 className={styles.title}>Ласкаво просимо</h1>
        <p className={styles.description}>This is the main landing page of the application.</p>
      </main>
    </>
  );
}
