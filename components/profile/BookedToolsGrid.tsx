"use client";

import { UserBooking } from "@/types/Booking";
import BookedToolCard from "../tools/BookedToolCard";
import styles from "./ToolsGrid.module.css";

interface BookedToolsGridProps {
    bookings: UserBooking[];
    listRef?: React.RefObject<HTMLUListElement | null>;
}

export default function BookedToolsGrid({
    bookings,
    listRef,
}: BookedToolsGridProps) {
    if (bookings.length === 0) {
        return null;
    }

    return (
        <>
            <h2>Заброньовані інструменти</h2>
            <ul className={styles.list} ref={listRef}>
                {bookings.map((booking) => (
                    <li key={booking.id} className={styles.item}>
                        <BookedToolCard
                            id={booking.toolId}
                            name={booking.toolName}
                            image={booking.toolImage}
                            rating={0}
                            startDate={booking.startDate}
                            endDate={booking.endDate}
                            totalPrice={booking.totalPrice}
                            status={booking.status}
                        />
                    </li>
                ))}
            </ul>
        </>
    );
}
