import { CanvasCtx, UpdateShape } from "@/lib/base";
import { AllShapes } from "@/lib/meta";
import { CommandImplBase } from "@/lib/command/command_impl.base";

export class UpdateShapeImpl extends CommandImplBase<UpdateShape<AllShapes>> {
  execute(ctx: CanvasCtx): void {
    const item = ctx.canvas.shapes.find((it) => it.id === this.cmd.shape.id);
    if (!item) return;
    Object.assign(item, this.cmd.shape);
  }
}
