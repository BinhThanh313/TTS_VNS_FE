import { useState } from "react";
import { LichSuList } from "./LichSuList";
import { LichSuDetail } from "./LichSuDetail";

export const LichSuKCBView = () => {
  const [selectedRecordId, setSelectedRecordId] = useState<string | null>(null);

  if (selectedRecordId) {
    return <LichSuDetail recordId={selectedRecordId} onBack={() => setSelectedRecordId(null)} />;
  }

  return <LichSuList onSelectRecord={(id) => setSelectedRecordId(id)} />;
};