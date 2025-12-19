import ToolCard from "./ToolCard";
import styles from "./PopularTools.module.css";
import Link from "next/link";
import { Tool } from "@/types/Tool";
import { getAllToolsServer } from "@/lib/api/serverApi";

export default async function PopularTools() {
  const data = await getAllToolsServer();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Популярні інструменти</h2>

      <ul className={styles.list}>
        {data.tools.map((tool: Tool) => (
          <li key={tool._id} className={styles.item}>
            <ToolCard
              id={tool._id}
              name={tool.name}
              pricePerDay={tool.pricePerDay}
              image={tool.images}
              rating={tool.rating}
            />
          </li>
        ))}
      </ul>

      <Link href="/tools" className={styles.link}>
        До всіх інструментів
      </Link>
    </section>
  );
}
