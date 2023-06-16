import type * as paper from "paper";
import { useEffect, useState } from "react";

export function usePaperJs() {
  const [pScope, setPScope] = useState<paper.PaperScope>();

  useEffect(() => {
    (async () => {
      if (pScope) return;
      const paper = await import("paper");
      setPScope(new paper.PaperScope());
    })();

    return () => {
      pScope?.project?.remove();
    };
  }, [pScope]);

  return pScope;
}
