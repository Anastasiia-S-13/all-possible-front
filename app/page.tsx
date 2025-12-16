import BenefitsBlock from "@/components/home/BenefitsBlock/BenefitsBlock";
import FeedbacksBlock from "@/components/home/Feedbacks/FeedbacksBlock";
import RegistrationBlock from "@/components/home/RegistrationBlock";
import styles from './page.module.css';
import PopularTools from '@/components/tools/PopularTools';

export default function Home() {
  return (

    <>
      <div className={styles.container}>
        {/* hero */}
        <BenefitsBlock />
         {<PopularTools />}
        <FeedbacksBlock />
      </div>
      <RegistrationBlock />
    </>
  );

}
