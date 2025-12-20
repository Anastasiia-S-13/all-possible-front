import ToolCard from "@/components/tools/ToolCard";
import styles from "./ToolsGrid.module.css"; // Use its own listing styles
import { Tool } from "@/types/Tool";

interface ToolsGridProps {
    tools: Tool[];
}

const ToolsGrid = ({ tools }: ToolsGridProps) => {
    if (tools.length === 0) {
        return (
            <div className={styles.empty}>
                <p>Інструментів не знайдено</p>
            </div>
        );
    }

    return (
        <ul className={styles.list}>
            {tools.map((tool) => (
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
    );
};

export default ToolsGrid;
