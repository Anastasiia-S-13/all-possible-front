import { fetchToolById } from "@/lib/api/clientApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import DevtoolsDetailsClient from "./DevtoolsDetails.client";

type Props = {
  params: Promise<{ toolId: string }>;
};

const ToolDetails = async ({ params }: Props) => {
  const { toolId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tool", toolId],
    queryFn: () => fetchToolById(toolId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <DevtoolsDetailsClient />
    </HydrationBoundary>
  );
};

export default ToolDetails;
