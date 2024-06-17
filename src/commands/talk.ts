import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
import * as characterAI from "../characterai";

export class TalkCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, {
        ...options
    });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('talk').setDescription('communicate w her')
        .addStringOption(option =>
            option.setName('message')
                .setDescription('ur message')
                .setRequired(true)
        )
    );
  }

  public async messageRun(message: Message) {
    return message.reply(await characterAI.communicate(characterAI.promptForDiscord(message.author.tag, message.content)));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    let message = interaction.options.getString("message");
    if (!message) {
        return interaction.reply("Invalid message provided.");
    }

    await interaction.deferReply();
    return interaction.editReply(await characterAI.communicate(characterAI.promptForDiscord(interaction.user.tag, message)));
  }
}