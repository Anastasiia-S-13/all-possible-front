"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import css from "./ToolDetails.module.css";
import Image from "next/image";

const ToolDetailsClient = () => {
  const { toolId } = useParams<{ toolId: string }>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["tool", toolId],
    // queryFn: () => getSingleTool(toolId), <-- get function
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading, please wait...</p>;
  if (error || !data) return <p>Something went wrong.</p>;

  return (
    data && (
      <div className={css.container}>
        <div className={css.tool_details_wrap}>
          <Image
            src="#"
            width={640}
            height={480}
            loading="lazy"
            alt="Tool picture"
          />
          <div className={css.tool_details_content}>
            <h1 className={css.tool_details_heading}>
              Дриль алмазного свердління
            </h1>
            <p className={css.tool_price}>Price</p>
            <div className={css.user_profile}>
              <Image
                src="#"
                width={80}
                height={80}
                loading="lazy"
                alt="User avatar"
              />
              <h2 className={css.username}>Username</h2>
              <button className={css.user_profile_btn}>
                Переглянути профіль
              </button>
            </div>
            <p className={css.tool_description}>About tool</p>
            <div className={css.tool_specs}>specs array</div>
            <button className={css.booking_btn}>Забронювати</button>
          </div>
        </div>
      </div>
    )
  );
};

export default ToolDetailsClient;
