"use client";

import Loader from "@/app/loading";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder";
import ToolsGridProfile from "@/components/profile/ToolsGridProfile";
import BookedToolsGrid from "@/components/profile/BookedToolsGrid";
import { getUserToolsClient, getUserBookings } from "@/lib/api/clientApi";
import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

type ProfileClientProps = {
  userId: string;
};
const ProfileClient = ({ userId }: ProfileClientProps) => {
  const queryClient = useQueryClient();
  const listRef = useRef<HTMLUListElement>(null);
  const bookingsListRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    return () => {
      queryClient.removeQueries({
        queryKey: ["user-tools", userId],
      });
      queryClient.removeQueries({
        queryKey: ["user-bookings", userId],
      });
    };
  }, [queryClient, userId]);

  const perPage = 8;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["user-tools", userId],
      initialPageParam: 1,
      queryFn: ({ pageParam = 1 }) =>
        getUserToolsClient(userId, pageParam, perPage),
      getNextPageParam: (lastPage) =>
        lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    });

  const { data: bookings = [], isLoading: isLoadingBookings } = useQuery({
    queryKey: ["user-bookings", userId],
    queryFn: () => getUserBookings(userId),
  });

  const tools = data?.pages.flatMap((page) => page.tools) || [];

  if (tools.length === 0 && bookings.length === 0) {
    return <ProfilePlaceholder userId={userId} />;
  }

  const handleLoadMore = async () => {
    await fetchNextPage();
    setTimeout(() => {
      if (listRef.current) {
        listRef.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }
    }, 50);
  };

  return (
    <>
      {tools.length > 0 && (
        <>
          <ToolsGridProfile tools={tools} ownerId={userId} listRef={listRef} />
          {hasNextPage && (
            <button
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              className="gridBtn"
            >
              {isFetchingNextPage ? "Завантаження..." : "Завантажити ще"}
            </button>
          )}
        </>
      )}

      {isLoadingBookings ? (
        <Loader />
      ) : (
        bookings.length > 0 && (
          <BookedToolsGrid bookings={bookings} listRef={bookingsListRef} />
        )
      )}
    </>
  );
};

export default ProfileClient;
