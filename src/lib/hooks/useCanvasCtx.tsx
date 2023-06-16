import { useEffect, useState } from "react";
import { getCanvasCtx } from "@/lib/canvas.impl";

export function useCanvasCtx() {
  const [id, setId] = useState(0);
  const ctx = getCanvasCtx();
  useEffect(() => {
    const cb = () => {
      setId(id + 1);
    };

    ctx.registerListener(cb);

    return () => {
      ctx.unregisterListener(cb);
    };
  });

  return ctx;
}
