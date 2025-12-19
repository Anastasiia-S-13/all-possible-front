type Props = {
  params: Promise<{
    toolId: string;
  }>;
};

export default async function ToolDetailsPage({ params }: Props) {
  const { toolId } = await params;

  return (
    <div>
      <h1>Tool details works</h1>
      <p>ID: {toolId}</p>
    </div>
  );
}
