import { CanvasCtx, UpdateShape } from "@/lib/domain";
import { AllShapes } from "@/lib/meta";
import { CommandImplBase } from "@/lib/cmd.base";

export class UpdateShapeImpl extends CommandImplBase<UpdateShape<AllShapes>> {
  execute(ctx: CanvasCtx): void {
    const item = ctx.canvas.shapes.find((it) => it.id === this.cmd.shape.id);
    if (!item) return;
    Object.assign(item, this.cmd.shape);
  }
}
