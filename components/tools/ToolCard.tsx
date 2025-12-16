import Link from "next/link";
import styles from "./ToolCard.module.css"
type ToolCardProps = {
  id: string;
  name: string;
  image: string;
  pricePerDay: number;
  rating?: number;
};

export default function ToolCard({

  id,  
  name,
  pricePerDay,
  image,
  rating=0,
}: ToolCardProps) {
  return (
    <article className={styles.card}>
      <img
        src={image}
        alt={name}
        className={styles.image}
      />

      <div className={styles.rating}>
          ⭐ {rating.toFixed(1)}
        </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{name}</h3>

        <p className={styles.price}>
          {pricePerDay} ₴ / доба
        </p>

        

        <Link href={`/tools/${id}`} className={styles.details}>
          Детальніше
        </Link>
      </div>
    </article>
  );
}
