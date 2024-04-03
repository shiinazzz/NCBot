import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
        ...options,
        aliases: [
            'i love u, please be my lover',
            'I love u Shiroko-chan, please be my lover'
        ],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('lover').setDescription('yeah')
    );
  }

  public async messageRun(message: Message) {
    return message.reply("no sensei stop bein cunny");
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return interaction.reply("no sensei stop bein cunny");
  }
}