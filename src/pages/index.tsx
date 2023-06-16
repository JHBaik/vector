import { getCanvasCtx } from "@/lib/canvas.impl";
import { useForm } from "react-hook-form";
import { Circle } from "@/lib/shapes/circle";
import { useEffect, useState } from "react";

function useCanvasCtx() {
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

interface circleCreationData {
  x: number;
  y: number;
  r: number;
}

function CircleCreation() {
  const { register, handleSubmit } = useForm<circleCreationData>();
  const ctx = useCanvasCtx();

  const onCreate = ({ x, y, r }: circleCreationData) => {
    ctx.handleCommand({
      name: "shape/new",
      shape: {
        type: "circle",
        lineColor: "#000",
        fillColor: "#000",
        center: { x, y },
        closed: true,
        lineWidth: 1,
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

export default function Index() {
  const ctx = useCanvasCtx();

  return (
    <>
      <pre>{JSON.stringify(ctx, null, 4)}</pre>
      <hr />
      <CircleCreation />
    </>
  );
}
