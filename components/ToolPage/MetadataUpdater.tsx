import { useEffect } from "react";

interface Props {
  categoryTitle: string;
}

export default function MetadataUpdater({ categoryTitle }: Props) {
  useEffect(() => {
    const title = categoryTitle
      ? `Інструменти | ${categoryTitle}`
      : "Інструменти | Всі інструменти";
    const description = categoryTitle
      ? `Список інструментів для категорії ${categoryTitle}`
      : "Список всіх доступних інструментів";

    document.title = title;

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute("content", description);
    }
  }, [categoryTitle]);

  return null;
}
