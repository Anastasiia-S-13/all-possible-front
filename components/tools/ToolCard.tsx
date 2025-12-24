"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import styles from "./ToolCard.module.css";
import { Rating } from "react-simple-star-rating";
import EmptyStar from "../RateStars/EmptyStar";
import FulledStar from "../RateStars/FullerStar";
import { deleteTool } from "@/lib/api/clientApi";
import Modal from "../Modal/Modal";
import DeleteConfirmationModal from "../modals/DeleteConfirmation/DeleteConfirmationModal";

type ToolCardProps = {
  id: string;
  name: string;
  image: string;
  pricePerDay: number;
  rating?: number;
  isOwner?: boolean;
};

export default function ToolCard({
  id,
  name,
  pricePerDay,
  image,
  rating = 0,
  isOwner = false,
}: ToolCardProps) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTool(id);
      toast.success("Інструмент успішно видалено");
      router.refresh();
    } catch (error) {
      toast.error("Помилка при видаленні інструменту");
      console.error("Delete tool error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

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
          <Rating
            emptyIcon={<EmptyStar />}
            allowFraction
            fillIcon={<FulledStar />}
            initialValue={rating}
            readonly
          />
        </div>

        <h3 className={styles.name}>{name}</h3>

        <p className={styles.price}>{pricePerDay} грн/день</p>
      </div>

      {isOwner ? (
        <div className={styles.ownerActions}>
          <Link href={`/tools/${id}/edit`} className={styles.editBtn}>
            Редагувати
          </Link>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={() => setIsDeleteModalOpen(true)}
            aria-label="Видалити"
          >
            <svg width="20" height="20" aria-hidden="true">
              <use href="/sprite/sprite.svg#icon-delete" />
            </svg>
          </button>
        </div>
      ) : (
        <Link href={`/tools/${id}`} className={styles.detailsBtn}>
          Детальніше
        </Link>
      )}

      {isDeleteModalOpen && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <DeleteConfirmationModal
            onConfirm={handleDeleteConfirm}
            onCancel={() => setIsDeleteModalOpen(false)}
            isLoading={isDeleting}
          />
        </Modal>
      )}
    </div>
  );
}
