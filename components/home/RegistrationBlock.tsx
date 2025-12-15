import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import pageStyles from '@/app/page.module.css';
import styles from './RegistrationBlock.module.css';

export default function RegistrationBlock() {
  return (
    <section className={`${styles.cta} ${pageStyles.section}`}>
      <div className={pageStyles.container}>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h2 className={styles.heading}>
              Зареєструйтесь і отримайте доступ до інструментів поруч із вами
            </h2>
            <p className={styles.text}>
              Не витрачайте гроші на купівлю — орендуйте зручно та швидко.
              <br />
              Приєднуйтесь до ToolNext вже сьогодні!
            </p>
            <div className={styles.actions}>
              <Link href="/auth/register" className={styles.actionLink}>
                <Button variant="primary" size="lg" className={styles.actionButton}>
                  Зареєструватися
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/cta-image.png"
              alt="Інструменти для роботи"
              fill
              className={styles.image}
              sizes="(max-width: 768px) 100vw, 525px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
