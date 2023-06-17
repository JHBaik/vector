import { CanvasCtx } from "@/lib/model/context";
import { CommandImplBase } from "@/lib/command/_cmd.base";
import { UpdateShape } from "@/lib/model/command";
import { AllShapes } from "@/lib/model/shape";

export class UpdateShapeImpl extends CommandImplBase<UpdateShape<AllShapes>> {
  execute(ctx: CanvasCtx): void {
    const item = ctx.canvas.shapes.find((it) => it.id === this.cmd.shape.id);
    if (!item) return;
    Object.assign(item, this.cmd.shape);
  }
}
