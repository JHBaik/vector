import { useForm } from "react-hook-form";
import { Rectangle } from "@/lib/shapes/rectangle";

export type RectangleCreationData = Pick<
  Rectangle,
  "pivot" | "width" | "height"
>;

export function RectangleForm({
  onSubmit,
  submitText,
}: {
  onSubmit: (v: RectangleCreationData) => void;
  submitText: string;
}) {
  const { register, handleSubmit } = useForm<RectangleCreationData>({
    defaultValues: {
      pivot: {
        x: 10,
        y: 10,
      },
      width: 90,
      height: 90,
    },
  });

  return (
    <form
      onSubmit={handleSubmit((d) =>
        onSubmit({
          pivot: {
            x: +d.pivot.x,
            y: +d.pivot.y,
          },
          width: +d.width,
          height: +d.height,
        })
      )}
    >
      x=
      <input type="number" {...register("pivot.x")} />
      <br />
      y=
      <input type="number" {...register("pivot.y")} />
      <br />
      w=
      <input type="number" {...register("width")} />
      <br />
      h=
      <input type="number" {...register("height")} />
      <br />
      <input type="submit" value={submitText} />
    </form>
  );
}
