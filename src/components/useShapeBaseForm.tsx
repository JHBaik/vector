import { useEffect, useState } from "react";
import { Shape } from "@/lib/base";
import { useForm } from "react-hook-form";

export type BaseProps = Pick<
  Shape<any>,
  "lineColor" | "fillColor" | "lineWidth"
>;

export function useShapeBaseForm() {
  const [baseProps, setBaseProps] = useState<BaseProps>(() => {
    console.warn("SETTING DEF");
    return {
      lineColor: "#000",
      fillColor: "#000",
      lineWidth: 1,
    };
  });

  const { register, watch } = useForm<BaseProps>({ defaultValues: baseProps });

  useEffect(() => {
    const sub = watch((value, info) => {
      console.table({ value });
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
        <input type="checkbox" {...register("lineWidth")} />
        <br />
      </form>
    ),
    baseProps: baseProps,
  };
}
