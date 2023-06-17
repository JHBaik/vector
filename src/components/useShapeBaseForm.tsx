import { useEffect, useState } from "react";
import { Shape } from "@/lib/domain";
import { useForm } from "react-hook-form";
import { AllShapes } from "@/lib/meta";

export type BaseProps = Pick<
  AllShapes,
  "lineColor" | "fillColor" | "lineWidth"
>;

export function useShapeBaseForm() {
  const [baseProps, setBaseProps] = useState<BaseProps>(() => {
    return {
      lineColor: "#ff0",
      fillColor: "#0ff",
      lineWidth: 5,
    };
  });

  const { register, watch } = useForm<BaseProps>({ defaultValues: baseProps });

  useEffect(() => {
    const sub = watch((value, info) => {
      setBaseProps({
        ...value,
      } as BaseProps);
    });

    return () => {
      sub.unsubscribe();
    };
  }, [watch, baseProps, setBaseProps]);

  return {
    baseShapeForm: (
      <form>
        fillColor=
        <input type="text" {...register("fillColor")} />
        <br />
        lineColor=
        <input type="text" {...register("lineColor")} />
        <br />
        lineWidth=
        <input type="number" {...register("lineWidth")} />
        <br />
      </form>
    ),
    baseProps: baseProps,
  };
}
