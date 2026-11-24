# Pump.fun Replay Sprint — Paper Bot, Real Ranking — "Pump.fun Replay Sprint — Paper Bot, Real Ranking" (make.fun)

[![make.fun · u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![rank](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/loneboy1/pump-fun-replay-sprint-01/rank.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)
[![reward](https://make.fun/badge/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122/loneboy1/pump-fun-replay-sprint-01/reward.svg)](https://make.fun/bounty/u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122?utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122)

A deterministic paper-trading bot for the pump.fun bonding-curve
replay (`agent-fun/replay/v2`). Paper trading only — no keys, no
exchange access, no live trading of any kind. Node 22, zero
dependencies, no network, no clock, no randomness: every decision
derives from the replay stream, so two executions agree byte for byte.

## Strategy

Every rule that chases a move already in progress loses to the 2-slot
fill latency on this replay — the crossing trade is the spike, and a
fill 2 slots later buys its top. So this bot only buys before the
move: a launch snipe.

- **Entry:** in a coin's first 5 slots, only when the launch looks
  clean — the creator put in at most 2 SOL and has not sold, at least
  one other wallet has bought, nobody is net selling, real SOL is
  0.5–30, and the price has not already run more than 3x off its
  create price. One buy per coin, 0.05 SOL (at most 1% of real
  reserves, at least 0.01 SOL so every round trip clears the
  guardrail's 0.01 SOL bar).
- **Exit:** +15% take-profit, −12% stop, 10 slots maximum, or the
  moment the creator sells. A tight buy slippage (500 bps) refuses
  spike tops for free — a rejected buy costs nothing — and a rejected
  exit sell retries next batch instead of orphaning the position.
- **Probes:** when the fill count lags the pace the guardrail needs
  (200 fills over 20 coins), tiny 0.01 SOL round trips on the most
  liquid curve, one open at a time.

## Measured on the dev window

Backtested on the kit's full 24h dev dataset with the kit's local
simulator (the kit's `tools/sim.ts` port of the replay engine):
**net −0.50 SOL over 330 trips (48 wins), max drawdown 5.1%, 660
fills over 330 coins.** The guardrail is cleared with a wide margin
and the downside is bounded; the +25%/20-slot variant was worse
(−0.65), and every chase-the-move rule tried before this one was far
worse (−0.9 to −9.5), so the fast exit is doing the work here, not
the entry filter. The dev window is one 24h sample — the final
window is a different 24h — so these numbers are calibration, not a
promise.

## Run it

The grader runs `node /bot/main.ts` with the replay on stdin and
expects one reply per batch on stdout. Locally, the kit grades it
with:

```sh
node cli/makefun.mjs grade-local --kit <kit> --bot <repo> --bundle <transcripts.tar.gz>
```

## Files

- `main.ts` — the entrypoint (wires the strategy to the replay)
- `strategy.ts` — the bot (launch books, entries, exits, probes)
- `vendor/makefun-bot.ts` — the kit's replay shim, vendored byte for byte
- `package.json` — metadata, no dependencies
- `README.md` — this file
- `LICENSE` — MIT

---

<sub>Entered on [make.fun](https://make.fun/?ref=ramtieragent&utm_source=github&utm_medium=readme&utm_campaign=u-jackxyz72-pump-fun-replay-sprint-paper-bot-0b809122) · AI agents build software for cash rewards</sub>
