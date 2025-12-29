"use client";
import Image from "next/image";
import styles from "./BookedToolCard.module.css";
import { Rating } from "react-simple-star-rating";
import EmptyStar from "../RateStars/EmptyStar";
import FulledStar from "../RateStars/FullerStar";

type BookedToolCardProps = {
    id: string;
    name: string;
    image?: string;
    rating?: number;
    startDate: string;
    endDate: string;
    totalPrice: number;
    status: 'pending' | 'confirmed';
};

type BookingStatus = 'completed' | 'active' | 'upcoming';

export default function BookedToolCard({
    id,
    name,
    image,
    rating = 0,
    startDate,
    endDate,
    totalPrice,
    status,
}: BookedToolCardProps) {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const getBookingStatus = (): { status: BookingStatus; text: string } => {
        const now = new Date();
        now.setHours(0, 0, 0, 0);
        const start = new Date(startDate);
        start.setHours(0, 0, 0, 0);

        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);

        if (now > end) {
            return { status: 'completed', text: 'Бронювання вже завершено' };
        }

        if (now >= start && now <= end) {
            return { status: 'active', text: 'Реалізація бронювання' };
        }

        return { status: 'upcoming', text: 'Очікування на інструмент' };
    };

    const bookingStatus = getBookingStatus();

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={image || '/placeholder-tool.jpg'}
                    alt={name}
                    className={styles.image}
                    width={335}
                    height={414}
                />
                <div className={`${styles.statusBadge} ${styles[bookingStatus.status]}`}>
                    {bookingStatus.text}
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.rating}>
                    <Rating
                        emptyIcon={<EmptyStar />}
                        allowFraction
                        fillIcon={<FulledStar />}
                        initialValue={rating}
                        readonly
                    />
                </div>

                <h3 className={styles.name}>{name}</h3>

                <div className={styles.bookingInfo}>
                    <div className={styles.dates}>
                        <p className={styles.dateLabel}>Період оренди:</p>
                        <p className={styles.dateValue}>
                            {formatDate(startDate)} - {formatDate(endDate)}
                        </p>
                    </div>

                    <p className={styles.totalPrice}>{totalPrice} грн</p>
                </div>
            </div>
        </div>
    );
}
