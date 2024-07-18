import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { Bot, Context, GrammyError, HttpError } from 'grammy';
import { run, RunnerHandle, sequentialize } from '@grammyjs/runner';

@Injectable()
export class AppService implements OnApplicationShutdown {
  protected logger = new Logger(AppService.name);

  protected bot: Bot;
  protected runnerHandle: RunnerHandle;

  constructor() {
    this.bot = new Bot('7453075405:AAEfubHmLuuSJMqHfi2aLE2ahRpkdpcvgQs', {
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
  }

  async run(): Promise<void> {
    // ignore messages from public chats
    this.bot.use(async (ctx, next) => {
      if (ctx.chat.id > 0) {
        await next();
      }
    });

    this.bot.use(
      sequentialize((ctx) => {
        const chat = ctx.chat?.id.toString();
        const user = ctx.from?.id.toString();

        return [chat, user].filter((con) => con !== undefined);
      }),
    );

    // bot commands
    this.bot.command('start', async (ctx) => ctx.reply('Hello!'));

    // catch errors
    this.bot.catch((err) => {
      const ctx = err.ctx;

      this.logger.error(
        `Error while handling bot update ${ctx.update.update_id}:`,
      );

      const e = err.error;

      if (e instanceof GrammyError) {
        this.logger.error('Error in request:', e.description);
      } else if (e instanceof HttpError) {
        this.logger.error('Could not contact Telegram:', e);
      } else {
        this.logger.error('Unknown error:', e);
      }
    });

    this.runnerHandle = run(this.bot);

    this.logger.log(`Bot has been initialized.`);
  }

  async onApplicationShutdown(): Promise<void> {
    if (this.runnerHandle) {
      this.logger.log(`Shutting down the bot...`);

      await this.runnerHandle.task();

      this.logger.log(`The bot has been shut down.`);
    }
  }
}
