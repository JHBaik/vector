import { AllCommands } from "@/lib/model/command";
import { AllShapes } from "@/lib/model/shape";
import KeyEvent = paper.KeyEvent;
import { Canvas } from "@/lib/model/canvas";

export interface CanvasCtx {
  mode: mode;
  canvas: Canvas;
  debugLog: string;

  // registerShapeProvider: (provider: ShapeProvider<any>) => {};
  registerListener: (cb: () => void) => void;
  unregisterListener: (cb: () => void) => void;
  handleCommand: (command: AllCommands) => void;
  log: (str: string | object) => void;
  selected: Set<AllShapes>;

  newItemId(): number;
}

export type mode = "idle" | "select" | "move";

export const mode_map = {
  idle_alt: "select",
  idle_shift: "move",
  select_alt: "idle",
  select_shift: "move",
  move_alt: "move",
  move_shift: "idle",
} as const;

const mode_map_assert: Record<`${mode}_${KeyEvent["key"]}`, mode> = mode_map;
