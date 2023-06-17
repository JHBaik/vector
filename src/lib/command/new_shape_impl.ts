import { CanvasCtx, NewShape } from "@/lib/base";
import { AllShapes } from "@/lib/meta";
import { CommandImplBase } from "@/lib/command/command_impl.base";

export class NewShapeImpl extends CommandImplBase<NewShape<AllShapes>> {
  execute(ctx: CanvasCtx): void {
    ctx.canvas.shapes.push({
      ...this.cmd.shape,
      id: ctx.newItemId(),
    });
  }
}
