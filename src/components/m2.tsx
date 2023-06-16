import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";
import { CircleForm } from "@/components/circleForm";
import { RectangleForm } from "@/components/rectangleForm";

export function M2() {
  const ctx = useCanvasCtx();
  const { baseShapeForm: baseShapeForm, baseProps } = useShapeBaseForm();

  return (
    <div style={{ maxWidth: 180 }}>
      <span>Selected : </span>
      {baseShapeForm}
      <hr />
      {/*<CircleCreation baseProps={baseProps} />*/}
      <hr />
      {/*<RectangleCreation baseProps={baseProps} />*/}
    </div>
  );
}
