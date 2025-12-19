import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { fetchToolById } from "@/lib/api/clientApi";
import ToolDetailsClient from "./ToolDetails.client";

interface ToolDetailsProps {
  params: Promise<{ toolId: string }>;
}

export default async function ToolDetailsPage({ params }: ToolDetailsProps) {
  const { toolId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tool", toolId],
    queryFn: () => fetchToolById(toolId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ToolDetailsClient />
    </HydrationBoundary>
  );
}
