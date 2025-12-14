import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type Props = {
  params: Promise<{ toolId: string }>;
};

const ToolDetails = async ({ params }: Props) => {
  const { toolId } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["tool", toolId],
    // queryFn: () => getSingleTool(toolId), <-- get function
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>Tool</HydrationBoundary>
  );
};

export default ToolDetails;
