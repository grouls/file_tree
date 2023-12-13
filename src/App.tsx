import './style.css';
import { useState } from 'react';

const files = {
  children: [
    {
      name: 'src',
      children: [
        {
          name: 'App.tsx',
        },
        {
          name: 'index.tsx',
        },
      ],
    },
    {
      name: 'package.json',
    },
    {
      name: 'tsconfig.json',
    },
  ],
};

type TEntry = {
  children?: TEntry[];
  name: string;
};

const Entry = ({ entry, depth }: { entry: TEntry; depth: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const icon = isExpanded ? '-' : '+';
  const title = isExpanded ? 'Close' : 'Open';
  return (
    <div>
      {entry.children ? (
        <button
          type="button"
          title={title}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {icon} {entry.name}
        </button>
      ) : (
        <div>{entry.name}</div>
      )}
      {isExpanded && (
        <div style={{ paddingLeft: `${depth * 10}px` }}>
          {entry.children?.map((entry) => (
            <Entry entry={entry} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <div>
      {files.children.map((entry) => (
        <Entry entry={entry} depth={1} />
      ))}
    </div>
  );
};
