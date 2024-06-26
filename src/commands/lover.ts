import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import * as characterAI from "../characterai";

export class LoverCommand extends Command {
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
    return message.reply(await characterAI.communicate(characterAI.promptForDiscord(message.author.tag, "i really love you please be my wife")));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();
    return interaction.editReply(await characterAI.communicate(characterAI.promptForDiscord(interaction.user.tag, "i really love you please be my wife")));
  }
}