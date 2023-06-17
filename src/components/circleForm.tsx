import { useForm } from "react-hook-form";
import { Circle } from "@/lib/model/shapes/circle";
import { useEffect } from "react";

export type CircleCreationData = Pick<Circle, "pivot" | "radius">;

export function CircleForm({
  onSubmit,
  submitText,
  initialValue,
}: {
  onSubmit: (v: CircleCreationData) => void;
  submitText: string;
  initialValue?: CircleCreationData;
}) {
  const { register, handleSubmit, setValue } = useForm<{
    d: CircleCreationData;
  }>({});
  useEffect(() => {
    setValue(
      "d",
      initialValue || {
        pivot: {
          x: 170,
          y: 170,
        },
        radius: 170,
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
          radius: +d.radius,
        })
      )}
    >
      x=
      <input type="number" {...register("d.pivot.x")} />
      <br />
      y=
      <input type="number" {...register("d.pivot.y")} />
      <br />
      r=
      <input type="number" {...register("d.radius")} />
      <br />
      <input type="submit" value={submitText} />
    </form>
  );
}
