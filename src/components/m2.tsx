import { useCanvasCtx } from "@/lib/hooks/useCanvasCtx";
import { useShapeBaseForm } from "@/components/useShapeBaseForm";
import { CircleCreationData, CircleForm } from "@/components/circleForm";
import {
  RectangleCreationData,
  RectangleForm,
} from "@/components/rectangleForm";
import { Circle } from "@/lib/model/shapes/circle";
import { Rectangle } from "@/lib/model/shapes/rectangle";
import copy from "fast-copy";
import { AllShapes } from "@/lib/model/shape";

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

  const updateZIdx = (type: "+" | "-") => {
    ctx.handleCommand({
      name: "shape/z_index",
      item_id: selectedItem?.id,
      type: type,
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
      {editType !== "none" && (
        <>
          <button onClick={() => updateZIdx("+")}>Z Index +</button>
          <button onClick={() => updateZIdx("-")}>Z Index -</button>
        </>
      )}
    </div>
  );
}
