import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './RegistrationBlock.module.css';

export default function RegistrationBlock() {
  return (
    <section className={styles.cta}>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.textBlock}>
            <h2 className={styles.heading}>
              0@5TAB@C9B5AL V >B@8<09B5 4>ABC? 4> V=AB@C<5=BV2 ?>@CG V7 20<8
            </h2>
            <p className={styles.text}>
              5 28B@0G09B5 3@>HV =0 :C?V2;N  >@5=4C9B5 7@CG=> B0 H284:>.
              @8T4=C9B5AL 4> ToolNext 265 AL>3>4=V!
            </p>
            <div className={styles.actions}>
              <Link href="/auth/register">
                <Button variant="primary" size="lg">
                  0@5TAB@C20B8AO
                </Button>
              </Link>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            <Image
              src="/images/cta-image.png"
              alt="=AB@C<5=B8 4;O @>1>B8"
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
