import { useForm } from "react-hook-form";
import { Circle } from "@/lib/shapes/circle";

export type CircleCreationData = Pick<Circle, "pivot" | "radius">;

export function CircleForm({
  onSubmit,
  submitText,
}: {
  onSubmit: (v: CircleCreationData) => void;
  submitText: string;
}) {
  const { register, handleSubmit } = useForm<CircleCreationData>({
    defaultValues: {
      pivot: {
        x: 170,
        y: 170,
      },
      radius: 170,
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
          radius: +d.radius,
        })
      )}
    >
      x=
      <input type="number" {...register("pivot.x")} />
      <br />
      y=
      <input type="number" {...register("pivot.y")} />
      <br />
      r=
      <input type="number" {...register("radius")} />
      <br />
      <input type="submit" value={submitText} />
    </form>
  );
}
