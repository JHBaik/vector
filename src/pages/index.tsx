import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { CircleCreation } from "@/components/circleCreation";
import { RectangleCreation } from "@/components/rectangleCreation";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";

export default function Index() {
  const ctx = useCanvasCtx();
  const { baseShapeForm: baseShapeForm, baseProps } = useShapeBaseForm();
  return (
    <>
      <pre>{JSON.stringify(ctx, null, 4)}</pre>
      <hr />
      {baseShapeForm}
      <hr />
      <CircleCreation baseProps={baseProps} />
      <hr />
      <RectangleCreation baseProps={baseProps} />
    </>
  );
}
