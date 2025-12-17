
type Props = {
  params: {
    toolId: string;
  };
};

export default function ToolPage({ params }: Props) {
  return (
    <div style={{ padding: 40 }}>
      <h1>Tool page works</h1>
      <p>ID: {params.toolId}</p>
    </div>
  );
}
