import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { Metadata } from "next";

import { fetchToolById } from "@/lib/api/clientApi";
import ToolDetailsClient from "./ToolDetails.client";

interface ToolDetailsProps {
  params: Promise<{ toolId: string }>;
}

export async function generateMetadata({
  params,
}: ToolDetailsProps): Promise<Metadata> {
  const { toolId } = await params;
  const tool = await fetchToolById(toolId);
  return {
    title: tool.name,
    description: tool.description.slice(0, 50),
    openGraph: {
      title: tool.name,
      description: tool.description.slice(0, 50),
      url: `http://localhost:3000/tools/${toolId}`,
      siteName: "ToolNext",
      images: [
        {
          url: `${tool.images}`,
          width: 1200,
          height: 630,
          alt: tool.name,
        },
      ],
      type: "article",
    },
  };
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
