import { autoRetry } from '@grammyjs/auto-retry';
import { Bot, GrammyError, HttpError } from 'grammy';
import { run, sequentialize } from '@grammyjs/runner';

let bot;
let runnerHandle;

async function main() {
  bot = new Bot('7453075405:AAEfubHmLuuSJMqHfi2aLE2ahRpkdpcvgQs', {
    botInfo: {
      id: 7453075405,
      is_bot: true,
      first_name: 'Temp Test Bot',
      username: 'fvxI9Mps_bot',
      can_join_groups: true,
      can_read_all_group_messages: false,
      supports_inline_queries: false,
    },
  });

  bot.api.config.use(autoRetry());

  // bot commands
  bot.command('start', async (ctx) => ctx.reply('Hello!'));

  runnerHandle = run(bot);

  console.log(`Bot started.`);
}

process.on('SIGINT', () => {
  console.log('Stopping the bot...');

  runnerHandle.stop();

  console.log('Stopped.');
});

main();
