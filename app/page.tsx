import BenefitsBlock from "@/components/home/BenefitsBlock/BenefitsBlock";
import FeedbacksBlock from "@/components/home/Feedbacks/FeedbacksBlock";
import RegistrationBlock from "@/components/home/RegistrationBlock";
import HeroBlock from "@/components/home/HeroBlock/HeroBlock";
import styles from './page.module.css';


export default function Home() {
  return (
    <>
      <HeroBlock />
      <div className={styles.container}>
        <BenefitsBlock />
        {/* tools */}
        <FeedbacksBlock />
      </div>
      <RegistrationBlock />
    </>
  );
}
