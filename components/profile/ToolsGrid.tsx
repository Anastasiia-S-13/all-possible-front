// components/profile/ToolsGrid.tsx
// components/profile/ToolsGrid.tsx
import { Tool } from '../../types/Tool';

export default function ToolsGrid({ tools }: { tools: Tool[] }) {
  return (
    <div style={{ marginTop: 32 }}>
      {tools.map(tool => (
        <div key={tool._id}>
          {tool.name}
        </div>
      ))}
    </div>
  );
}
