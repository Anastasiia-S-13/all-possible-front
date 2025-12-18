"use client";

import Image from "next/image";
import Link from "next/link";

import css from "../../app/(site)/tools/[toolId]/ToolDetails.module.css";
import { Tool } from "@/types/Tool";
import { User } from "@/types/User";
import { useAuthStore } from "@/stores/authStore";

interface ToolInfoBlockProps {
  tool: Pick<Tool, "name" | "pricePerDay" | "description" | "specifications">;
  user: User;
}

const { isAuthenticated } = useAuthStore();

const ToolInfoBlock = ({ tool, user }: ToolInfoBlockProps) => {
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
        <Link className={css.user_profile_btn} href={`/profile`}>
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
      {isAuthenticated ? (
        <Link className={css.booking_btn} href={`/booking`}>
          Забронювати
        </Link>
      ) : (
        
      )}
    </div>
  );
};

export default ToolInfoBlock;
