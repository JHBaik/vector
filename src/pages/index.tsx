import { M1 } from "@/components/m1";
import styles from "@/css/layout.module.css";
import { useEffect, useRef } from "react";
import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { usePaperJs } from "@/lib/hooks/usePaperJs";
import { PaperJsRenderer } from "@/lib/paper/renderer";

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvasCtx();
  const paperJs = usePaperJs();

  useEffect(() => {
    if (!canvasRef.current || !paperJs) {
      return;
    }

    const renderer = new PaperJsRenderer(
      canvasRef.current,
      new paperJs.PaperScope()
    );
    const cb = () => {
      renderer.render(ctx.canvas.shapes);
    };

    ctx.registerListener(cb);
    cb();
    return () => {
      ctx.unregisterListener(cb);
    };
  }, [canvasRef, paperJs]);

  return (
    <div className={[styles.splitHorizontal, styles.root].join(" ")}>
      <M1 />
      <div className={styles.splitVertical}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "100%", backgroundColor: "green" }}
        />
      </div>
    </div>
  );
}
