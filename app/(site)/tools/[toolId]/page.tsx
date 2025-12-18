"use client";

import { use } from "react";
import Link from "next/link";
import styles from "../../../../components/tools/ToolCard.module.css";

interface ToolDetailsProps {
  params: Promise<{ toolId: string }>;
}

export default function ToolDetailsPage({ params }: ToolDetailsProps) {
  const { toolId } = use(params);

  return (
    <div>
      <h1>сторінка інструменту</h1>
      <p>Це тимчасовий заповнювач для налагодження (клієнтська компонент).</p>
      <p>Tool ID: {toolId}</p>
      <Link href={`/tools/${toolId}/booking`} className={styles.details}>
        бронювання інструменту
      </Link>
    </div>
  );
}
