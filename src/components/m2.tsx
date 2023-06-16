import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";
import { CircleCreation } from "@/components/circleCreation";
import { RectangleCreation } from "@/components/rectangleCreation";

export function M2() {
  const ctx = useCanvasCtx();
  const { baseShapeForm: baseShapeForm, baseProps } = useShapeBaseForm();

  return (
    <div style={{ maxWidth: 180 }}>
      <span>Selected : </span>
      {baseShapeForm}
      <hr />
      <CircleCreation baseProps={baseProps} />
      <hr />
      <RectangleCreation baseProps={baseProps} />
    </div>
  );
}
