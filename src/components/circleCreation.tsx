import { useForm } from "react-hook-form";
import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { Circle } from "@/lib/shapes/circle";
import { BaseProps, useShapeBaseForm } from "@/components/useShapeBaseForm";

interface circleCreationData {
  x: number;
  y: number;
  r: number;
}

export function CircleCreation({ baseProps }: { baseProps: BaseProps }) {
  const { register, handleSubmit } = useForm<circleCreationData>();
  const ctx = useCanvasCtx();

  const onCreate = ({ x, y, r }: circleCreationData) => {
    ctx.handleCommand({
      name: "shape/new",
      shape: {
        ...baseProps,
        type: "circle",
        center: { x: +x, y: +y },
        closed: true,
        radius: r,
      } as Circle,
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
      r=
      <input type="number" {...register("r")} />
      <br />
      <input type="submit" value="Create" />
    </form>
  );
}
