import BenefitsBlock from "@/components/home/BenefitsBlock";
import FeedbacksBlock from "@/components/home/Feedbacks/FeedbacksBlock";
import styles from './page.module.css';


export default function Home() {
  return (
    <div className={styles.container}>
      {/* hero */}
      <BenefitsBlock />
      {/* tools */}
      {<FeedbacksBlock />}
      {/* registration block */}
    </div>
  );
}
