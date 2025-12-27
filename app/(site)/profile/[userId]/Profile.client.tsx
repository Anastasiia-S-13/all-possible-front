"use client";

import Loader from "@/app/loading";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder";
import ToolsGridProfile from "@/components/profile/ToolsGridProfile";
import { getUserToolsClient } from "@/lib/api/clientApi";
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

type ProfileClientProps = {
  userId: string;
};
const ProfileClient = ({ userId }: ProfileClientProps) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["user-tools", userId],
      });
    };
  }, [queryClient, userId]);
  const perPage = 8;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useInfiniteQuery({
      queryKey: ["user-tools", userId],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        getUserToolsClient(userId, pageParam, perPage),

      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const tools = data?.pages.flatMap((page) => page.tools) || [];
  if (tools.length === 0) {
    return <ProfilePlaceholder userId={userId} />;
  }
  if (status === "pending") {
    return <Loader />;
  }
  return (
    <>
      <ToolsGridProfile tools={tools} ownerId={userId} />
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="gridBtn"
        >
          {isFetchingNextPage ? "Завантаження..." : "Завантажити ще"}
        </button>
      )}
    </>
  );
};

export default ProfileClient;
