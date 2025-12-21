"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import css from "./ToolInfoBlock.module.css";
import { Tool } from "@/types/Tool";
import { User } from "@/types/User";
import { useAuthStore } from "@/stores/authStore";
import { deleteTool } from "@/lib/api/clientApi";
import Modal from "../Modal/Modal";
import AuthRedirectModal from "../modals/AuthRedirect/AuthRedirectModal";
import DeleteConfirmationModal from "../modals/DeleteConfirmation/DeleteConfirmationModal";

interface ToolInfoBlockProps {
  tool: Tool;
  user: User;
}

const ToolInfoBlock = ({ tool, user }: ToolInfoBlockProps) => {
  const router = useRouter();
  const { isAuthenticated, user: currentUser } = useAuthStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const isOwner = isAuthenticated && (currentUser?.id === tool.owner || currentUser?.id === user.id);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      setIsAuthModalOpen(true);
      return;
    }
    router.push(`/tools/${tool._id}/booking`);
  };

  const handleEditClick = () => {
    router.push(`/tools/${tool._id}/edit`);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteTool(tool._id);
      toast.success("Інструмент успішно видалено");
      router.push("/tools");
    } catch (error) {
      toast.error("Помилка при видаленні інструменту");
      console.error("Delete tool error:", error);
    } finally {
      setIsDeleting(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <div className={css.toolDetailsContent}>
      <div className={css.toolHead}>
        <h1 className={css.toolName}>{tool.name}</h1>
        <p className={css.toolPricePerDay}>{tool.pricePerDay}</p>
      </div>
      <div className={css.userProfile}>
        <Image
          className={css.avatar}
          src={user.avatar || "/images/default-avatar.png"}
          width={80}
          height={80}
          loading="lazy"
          alt="User avatar"
        />
        <div className={css.toolOwner}>
          <h2 className={css.username}>{user.name}</h2>
          <Link className={css.profileBtn} href={`/profile/${user._id}`}>
            Переглянути профіль
          </Link>
        </div>
      </div>
      <p className={css.description}>{tool.description}</p>
      <div className={css.specs}>
        {tool.specifications && Object.keys(tool.specifications).length > 0 && (
          <ul className={css.specsList}>
            {Object.entries(tool.specifications).map(([key, value]) => (
              <li key={key} className={css.specItem}>
                <span className={css.span}>{key}:</span> {value}
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={css.actionsWrapper}>
        {isOwner ? (
          <div className={css.ownerActions}>
            <button className={css.editBtn} onClick={handleEditClick}>
              Редагувати
            </button>
            <button className={css.deleteBtn} onClick={handleDeleteClick}>
              Видалити
            </button>
          </div>
        ) : (
          <button className={css.bookingBtn} onClick={handleBookingClick}>
            Забронювати
          </button>
        )}
      </div>

      {isAuthModalOpen && (
        <Modal onClose={() => setIsAuthModalOpen(false)}>
          <AuthRedirectModal />
        </Modal>
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
};

export default ToolInfoBlock;
