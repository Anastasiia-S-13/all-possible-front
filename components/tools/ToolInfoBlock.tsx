"use client";

import Image from "next/image";
import Link from "next/link";

import css from "./ToolInfoBlock.module.css";
import { Tool } from "@/types/Tool";
import { User } from "@/types/User";
import { useAuthStore } from "@/stores/authStore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "../Modal/Modal";
import AuthRedirectModal from "../modals/AuthRedirect/AuthRedirectModal";

interface ToolInfoBlockProps {
  tool: Tool;
  user: User;
}

const ToolInfoBlock = ({ tool, user }: ToolInfoBlockProps) => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    if (!isAuthenticated) {
      setIsOpen(true);
      return;
    }
    router.push(`/tools/${tool._id}/booking`);
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
          src={user.avatar || ""}
          width={80}
          height={80}
          loading="lazy"
          alt="User avatar"
        />
        <div className={css.toolOwner}>
          <h2 className={css.username}>{user.name}</h2>
          <Link className={css.profileBtn} href={`/profile/${user.id}`}>
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
      <button className={css.bookingBtn} onClick={handleClick}>
        Забронювати
      </button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <AuthRedirectModal />
        </Modal>
      )}
    </div>
  );
};

export default ToolInfoBlock;
