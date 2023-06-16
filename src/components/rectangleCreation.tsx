import { useForm } from "react-hook-form";
import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { Rectangle } from "@/lib/shapes/rectangle";
import { BaseProps, useShapeBaseForm } from "@/components/useShapeBaseForm";

interface RectangleCreationData {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function RectangleCreation({ baseProps }: { baseProps: BaseProps }) {
  const { register, handleSubmit } = useForm<RectangleCreationData>();
  const ctx = useCanvasCtx();
  const onCreate = ({ x, y, w, h }: RectangleCreationData) => {
    ctx.handleCommand({
      name: "shape/new",
      shape: {
        ...baseProps,
        type: "rectangle",
        closed: true,
        pivot: { x: +x, y: +y },
        width: +w,
        height: +h,
      } as Rectangle,
    });
  };
  return (
    <form onSubmit={handleSubmit(onCreate)}>
      x=
      <input type="number" {...register("x")} />
      <br />
      y=
      <input type="number" {...register("y")} />
      <br />
      w=
      <input type="number" {...register("w")} />
      <br />
      h=
      <input type="number" {...register("h")} />
      <br />
      <input type="submit" value="Create" />
    </form>
  );
}
