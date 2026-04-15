import { useState } from "react";
import { useDisplayListener } from "@/hooks";

export function useDisplayActionLogic(roomId: string) {
  const [isReady, setIsReady] = useState(false);
  const callingPatient = useDisplayListener(roomId, isReady);

  return { callingPatient, isReady, setIsReady };
}