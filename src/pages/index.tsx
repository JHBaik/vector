import { M1 } from "@/components/m1";
import styles from "@/css/layout.module.css";
import { useEffect, useRef } from "react";
import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { usePaperJs } from "@/lib/hooks/usePaperJs";
import { PaperJsAdopter } from "@/lib/paper/paperJsAdopter";
import { M2 } from "@/components/m2";

export default function Index() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctx = useCanvasCtx();
  const paperJs = usePaperJs();

  useEffect(() => {
    if (!canvasRef.current || !paperJs) {
      return;
    }

    const renderer = new PaperJsAdopter(
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
  }, [canvasRef, paperJs, ctx]);

  return (
    <div className={[styles.splitVertical, styles.root].join(" ")}>
      <div className={styles.splitHorizontal}>
        <M1 />
        <div className={styles.splitVertical}>
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%", backgroundColor: "green" }}
          />
        </div>
        <M2 />
      </div>
      <pre
        style={{
          overflow: "scroll",
          height: "150px",
          backgroundColor: "#ebebeb",
        }}
      >
        {ctx.debugLog}
      </pre>
    </div>
  );
}
