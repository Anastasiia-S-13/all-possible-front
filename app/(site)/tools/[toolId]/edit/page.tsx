import { notFound } from "next/navigation";
import AddEditToolForm, {
  Tool,
} from "@/components/forms/AddEditToolForm";

type Props = {
  params: {
    toolId: string;
  };
};

async function getToolById(id: string): Promise<Tool | null> {
  const res = await fetch(`${process.env.API_URL}/tools/${id}`, {
    cache: "no-store",
    credentials: "include",
  });

  if (!res.ok) return null;

  return res.json();
}

export default async function EditToolPage({ params }: Props) {
  const tool = await getToolById(params.toolId);

  if (!tool) {
    notFound();
  }

  return (
    <div style={{ padding: 40, maxWidth: 720 }}>
      <h1>Редагувати інструмент</h1>
      <AddEditToolForm tool={tool} />
    </div>
  );
}
