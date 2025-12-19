"use client";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

import css from "./ToolDetails.module.css";
import { getToolById } from "@/lib/api/bookingApi";
//import ToolInfoBlock from "@/components/tools/ToolInfoBlock";
// import ToolGallery from "@/components/tools/ToolGallery";

const ToolDetailsClient = () => {
  const { toolId } = useParams<{ toolId: string }>();

  const {
    data: toolData,
    isLoading: isLoadingTool,
    error: toolError,
  } = useQuery({
    queryKey: ["tool", toolId],
    queryFn: () => getToolById(toolId),
    refetchOnMount: false,
  });
  const {
    data: userData,
    isLoading: isLoadingUser,
    error: userError,
  } = useQuery({
    queryKey: ["owner" /**toolData?.owner*/],
    // queryFn: () => getUserById(toolData.owner),
    enabled: !!toolData,
    refetchOnMount: false,
  });

  if (isLoadingTool || isLoadingUser) return <p>Loading, please wait...</p>;
  if (toolError || userError || !toolData || !userData)
    return <p>Something went wrong.</p>;

  return (
    toolData &&
    userData && (
      <div className={css.container}>
        <div className={css.tool_details_wrap}>
          {/* <ToolGallery {data.images} /> */}
        </div>
      </div>
    )
  );
};

export default ToolDetailsClient;
