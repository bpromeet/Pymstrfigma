import APIKeyManagement from "../components/APIKeyManagement";

interface APIKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string | null;
  status: string;
}

interface APIKeysPageProps {
  apiKeys: APIKey[];
  onCreateKey: (name: string) => void;
  onUpdateKey: (id: string, updates: Partial<APIKey>) => void;
  onDeleteKey: (id: string) => void;
  onNavigateToQuickStart: () => void;
  onNavigateToAPIReference: () => void;
}

export default function APIKeysPage({
  apiKeys,
  onCreateKey,
  onUpdateKey,
  onDeleteKey,
  onNavigateToQuickStart,
  onNavigateToAPIReference,
}: APIKeysPageProps) {
  return (
    <APIKeyManagement
      apiKeys={apiKeys}
      onCreateKey={onCreateKey}
      onUpdateKey={onUpdateKey}
      onDeleteKey={onDeleteKey}
      onNavigateToQuickStart={onNavigateToQuickStart}
      onNavigateToAPIReference={onNavigateToAPIReference}
    />
  );
}
