import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";
import { CircleCreationData, CircleForm } from "@/components/circleForm";
import {
  RectangleCreationData,
  RectangleForm,
} from "@/components/rectangleForm";
import { AllShapes } from "@/lib/meta";
import { Circle } from "@/lib/shapes/circle";
import { Rectangle } from "@/lib/shapes/rectangle";
import copy from "fast-copy";

export function M2() {
  const ctx = useCanvasCtx();
  const { baseShapeForm: baseShapeForm, baseProps } = useShapeBaseForm();

  const editEnabled = ctx.selected.size === 1;
  const selectedItem: AllShapes | undefined = copy(
    editEnabled && ctx.selected.values().next()?.value
  );

  console.log(JSON.stringify(selectedItem?.pivot));

  const editType = editEnabled && selectedItem ? selectedItem.type : "none";

  const onUpdateCircle = ({ pivot, radius }: CircleCreationData) => {
    ctx.handleCommand({
      name: "shape/update",
      shape: {
        ...baseProps,
        type: "circle",
        pivot: pivot,
        closed: true,
        radius: radius,
        id: selectedItem?.id,
      } as Circle,
    });
  };
  const onUpdateRect = ({ pivot, width, height }: RectangleCreationData) => {
    ctx.handleCommand({
      name: "shape/update",
      shape: {
        ...baseProps,
        type: "rectangle",
        closed: true,
        pivot: pivot,
        width: +width,
        height: +height,
        id: selectedItem?.id,
      } as Rectangle,
    });
  };

  return (
    <div style={{ maxWidth: 180 }}>
      <span>Selected : {selectedItem?.id ?? "NONE"}</span>
      {baseShapeForm}
      <hr />
      {editType === "circle" && (
        <CircleForm
          submitText={"Update"}
          onSubmit={onUpdateCircle}
          initialValue={selectedItem as Circle}
        />
      )}
      <hr />
      {editType === "rectangle" && (
        <RectangleForm
          submitText={"Update"}
          onSubmit={onUpdateRect}
          initialValue={selectedItem as Rectangle}
        />
      )}
    </div>
  );
}
