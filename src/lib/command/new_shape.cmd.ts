import { CanvasCtx } from "@/lib/model/context";
import { CommandImplBase } from "@/lib/command/_cmd.base";
import { AllShapes } from "@/lib/model/shape";
import { NewShape } from "@/lib/model/command";

export class NewShapeImpl extends CommandImplBase<NewShape<AllShapes>> {
  execute(ctx: CanvasCtx): void {
    ctx.canvas.shapes.push({
      ...this.cmd.shape,
      id: ctx.newItemId(),
    });
  }
}
