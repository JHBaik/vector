import { CanvasCtx, NewShape } from "@/lib/domain";
import { AllShapes } from "@/lib/meta";
import { CommandImplBase } from "@/lib/cmd.base";

export class NewShapeImpl extends CommandImplBase<NewShape<AllShapes>> {
  execute(ctx: CanvasCtx): void {
    ctx.canvas.shapes.push({
      ...this.cmd.shape,
      id: ctx.newItemId(),
    });
  }
}
