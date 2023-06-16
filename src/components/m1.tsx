import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";
import { CircleCreation } from "@/components/circleCreation";
import { RectangleCreation } from "@/components/rectangleCreation";

export function M1() {
  const ctx = useCanvasCtx();
  const { baseShapeForm: baseShapeForm, baseProps } = useShapeBaseForm();
  return (
    <div style={{ maxWidth: 180 }}>
      <pre style={{ height: 350, overflow: "scroll" }}>
        {JSON.stringify(ctx, null, 4)}
      </pre>
      <hr />
      {baseShapeForm}
      <hr />
      <CircleCreation baseProps={baseProps} />
      <hr />
      <RectangleCreation baseProps={baseProps} />
    </div>
  );
}
