import { Injectable, Logger, OnApplicationShutdown } from '@nestjs/common';
import { Bot } from 'grammy';
import { run, RunnerHandle } from '@grammyjs/runner';
import { autoRetry } from '@grammyjs/auto-retry';

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
    this.bot.api.config.use(autoRetry());

    this.runnerHandle = run(this.bot);

    // bot commands
    this.bot.command('start', async (ctx) => ctx.reply('Hello!'));

    this.logger.log(`Bot has been initialized.`);
  }

  async onApplicationShutdown(): Promise<void> {
    if (this.runnerHandle) {
      this.logger.log(`Stopping the bot...`);

      await this.runnerHandle.stop();

      this.logger.log(`Stopped.`);
    }
  }
}
