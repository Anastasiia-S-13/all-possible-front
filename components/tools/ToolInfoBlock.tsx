"use client";

import Image from "next/image";
import Link from "next/link";

import css from "../../app/(site)/tools/[toolId]/ToolDetails.module.css";
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
    <div className={css.tool_details_content}>
      <h1 className={css.tool_details_heading}>{tool.name}</h1>
      <p className={css.tool_price}>{tool.pricePerDay}</p>
      <div className={css.user_profile}>
        <Image
          src={user.avatar}
          width={80}
          height={80}
          loading="lazy"
          alt="User avatar"
        />
        <h2 className={css.username}>{user.name}</h2>
        <Link className={css.user_profile_btn} href={`/profile/${user._id}`}>
          Переглянути профіль
        </Link>
      </div>
      <p className={css.tool_description}>{tool.description}</p>
      <div className={css.tool_specs}>
        <ul className={css.tool_spec_list}>
          {Object.entries(tool.specifications).map(([key, value]) => (
            <li key={key} className={css.tool_spec_item}>
              <span className={css.span}>{key}:</span> {value}
            </li>
          ))}
        </ul>
      </div>
      <button className={css.booking_btn} onClick={handleClick}>
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
