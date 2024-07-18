# Test App

## Installation

```sh
yarn
```

The bot runs in the `app.service.ts` file.

## Reproduction

1. `yarn start` - this starts the bot: https://t.me/fvxI9Mps_bot
2. Press `Cmd + C` or `Ctrl + C`

**Expected result**:
You see two console messages:
```
Shutting down the bot...
The bot has been shut down.
```

**Actual result**:
You see only the `Shutting down the bot...` message, and the bot keeps listening for updates.
If you run the `yarn start` command again, you'll get an exception saying that another instance of GrammY is listening
for updates:

```
[grammY runner] Error while fetching updates:
[grammY runner] GrammyError: Call to 'getUpdates' failed! (409: Conflict: terminated by other getUpdates request; make sure that only one bot instance is running)
```

You need to close the terminal window to stop it.
