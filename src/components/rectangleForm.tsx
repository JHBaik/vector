import { useForm } from "react-hook-form";
import { Rectangle } from "@/lib/shapes/rectangle";
import { useEffect } from "react";

export type RectangleCreationData = Pick<
  Rectangle,
  "pivot" | "width" | "height"
>;

export function RectangleForm({
  onSubmit,
  submitText,
  initialValue,
}: {
  onSubmit: (v: RectangleCreationData) => void;
  submitText: string;
  initialValue?: RectangleCreationData;
}) {
  const { register, handleSubmit, setValue } = useForm<{
    d: RectangleCreationData;
  }>({});
  useEffect(() => {
    setValue(
      "d",
      initialValue || {
        pivot: {
          x: 10,
          y: 10,
        },
        width: 90,
        height: 90,
      }
    );
  }, [setValue, initialValue]);

  return (
    <form
      onSubmit={handleSubmit(({ d }) =>
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
      <input type="number" {...register("d.pivot.x")} />
      <br />
      y=
      <input type="number" {...register("d.pivot.y")} />
      <br />
      w=
      <input type="number" {...register("d.width")} />
      <br />
      h=
      <input type="number" {...register("d.height")} />
      <br />
      <input type="submit" value={submitText} />
    </form>
  );
}
