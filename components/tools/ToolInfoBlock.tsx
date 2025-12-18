"use client";

import Image from "next/image";

import css from "../../app/(site)/tools/[toolId]/ToolDetails.module.css";

import { Tool } from "@/types/Tool";
import { User } from "@/types/User";
interface ToolInfoBlockProps {
  tool: Pick<Tool, "name" | "pricePerDay" | "description" | "specifications">;
  user: User;
}
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
        <button className={css.user_profile_btn}>Переглянути профіль</button>
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
      <button className={css.booking_btn}>Забронювати</button>
    </div>
  );
};

export default ToolInfoBlock;
