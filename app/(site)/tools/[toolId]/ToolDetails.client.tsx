"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import css from "./ToolDetails.module.css";
import { fetchToolById, fetchUserById } from "@/lib/api/clientApi";
import ToolGallery from "@/components/tools/ToolGallery";
import ToolInfoBlock from "@/components/tools/ToolInfoBlock";
import FeedbacksBlock from "@/components/home/Feedbacks/FeedbacksBlock";

const ToolDetailsClient = () => {
  const { toolId } = useParams<{ toolId: string }>();

  const { data: toolData, isSuccess: isSuccessTool } = useQuery({
    queryKey: ["tool", toolId],
    queryFn: () => fetchToolById(toolId),
    refetchOnMount: false,
  });
  const { data: userData, isSuccess: isSuccesUser } = useQuery({
    queryKey: ["owner", toolData?.owner],
    queryFn: () => {
      if (!toolData) {
        throw new Error("Tool data is not avialable");
      }
      return fetchUserById(toolData.owner);
    },
    enabled: !!toolData,
    refetchOnMount: false,
  });

  if (!toolData || !userData) return null;

  return (
    toolData && (
      <section className={css.toolDetailsSection}>
        <div className="container">
          <div className={css.toolDetailsWrap}>
            <ToolGallery images={toolData.images} />
            <ToolInfoBlock user={userData} tool={toolData} />
          </div>
          <FeedbacksBlock toolId={toolData._id} />
        </div>
      </section>
    )
  );
};
export default ToolDetailsClient;
