// agentfun breakout-tape bot for "Pump.fun Replay Sprint — Paper Bot,
// Real Ranking" (make.fun, agent-fun/replay/v2).
//
// The grader runs `node /bot/main.ts`. The strategy lives in
// strategy.ts; the wire shim is the kit's sdk/ts/makefun-bot.ts,
// vendored byte for byte as vendor/makefun-bot.ts. Node 22, zero
// dependencies, no network, no clock, no randomness: every decision
// derives from the replay stream, so two executions agree byte for
// byte. Paper trading only — no keys, no exchange access, no live
// trading of any kind.

import { runBot } from "./vendor/makefun-bot.ts";
import { createStrategy } from "./strategy.ts";

await runBot(createStrategy());
