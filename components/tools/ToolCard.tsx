"use client";
import Link from "next/link";
import Image from "next/image";
import styles from "./ToolCard.module.css";
import { Rating } from "react-simple-star-rating";
import EmptyStar from "../RateStars/EmptyStar";
import FulledStar from "../RateStars/FullerStar";

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
  rating = 0,
}: ToolCardProps) {
  const isRate = Boolean(rating);

  return (
    <div className={styles.card}>
      <Image
        src={image}
        alt={name}
        className={styles.image}
        width={335}
        height={414}
      />
      <div className={styles.content}>
        <div className={styles.rating}>
          {isRate ? (
            <Rating
              emptyIcon={<EmptyStar />}
              allowFraction
              fillIcon={<FulledStar />}
              initialValue={rating}
              readonly
            />
          ) : (
            <p>У цього інструмента ще немає оцінки</p>
          )}
        </div>

        <h3 className={styles.name}>{name}</h3>

        <p className={styles.price}>{pricePerDay} грн/доба</p>
      </div>
      <Link href={`/tools/${id}`} className={styles.detailsBtn}>
        Детальніше
      </Link>
    </div>
  );
}
