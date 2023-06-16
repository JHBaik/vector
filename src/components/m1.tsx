import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";
import { CircleForm, CircleCreationData } from "@/components/circleForm";
import {
  RectangleForm,
  RectangleCreationData,
} from "@/components/rectangleForm";
import { Rectangle } from "@/lib/shapes/rectangle";
import { Circle } from "@/lib/shapes/circle";

export function M1() {
  const ctx = useCanvasCtx();
  const { baseShapeForm: baseShapeForm, baseProps } = useShapeBaseForm();

  const onCreateCircle = ({ pivot: { x, y }, radius }: CircleCreationData) => {
    ctx.handleCommand({
      name: "shape/new",
      shape: {
        ...baseProps,
        type: "circle",
        pivot: { x: +x, y: +y },
        closed: true,
        radius: radius,
      } as Circle,
    });
  };
  const onCreateRect = ({
    pivot: { x, y },
    width,
    height,
  }: RectangleCreationData) => {
    ctx.handleCommand({
      name: "shape/new",
      shape: {
        ...baseProps,
        type: "rectangle",
        closed: true,
        pivot: { x: +x, y: +y },
        width: +width,
        height: +height,
      } as Rectangle,
    });
  };

  return (
    <div style={{ maxWidth: 180 }}>
      <pre style={{ height: 350, overflow: "scroll", fontSize: 9 }}>
        {JSON.stringify(ctx, null, 4)}
      </pre>
      <hr />
      {baseShapeForm}
      <hr />
      <CircleForm onSubmit={onCreateCircle} submitText={"Create"} />
      <hr />
      <RectangleForm onSubmit={onCreateRect} submitText={"Create"} />
    </div>
  );
}
