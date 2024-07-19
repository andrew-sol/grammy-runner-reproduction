# Test App

## Installation

```sh
yarn
```

The bot runs in the `app.service.ts` file.

## Reproduction

1. `yarn start` - this starts the bot: https://t.me/fvxI9Mps_bot
2. Press `Ctrl + C`

**Expected result**:
You see two console messages:
```
Stopping the bot......
Stopped.
```

**Actual result**:
You see only the `Stopping the bot...` message. If you change any line of code instead of pressing `Ctrl + C`, the app will never recompile.
