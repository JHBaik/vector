import { SupportedCommands } from "@/app/lib/meta";

export interface Command<NAME extends SupportedCommands> {
  target_id: number;
  name: NAME;
}
