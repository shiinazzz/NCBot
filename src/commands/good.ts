import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import * as characterAI from "../characterai";

export class GoodCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
        ...options,
        aliases: [
            'did i do good'
        ],
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('dididogood').setDescription('ask her if you did good')
    );
  }

  public async messageRun(message: Message) {
    return message.reply(await characterAI.communicate(characterAI.promptForDiscord(message.author.tag, "shiroko, did i do great?")));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();
    return interaction.editReply(await characterAI.communicate(characterAI.promptForDiscord(interaction.user.tag, "shiroko, did i do great?")));
  }
}