import { Command } from '@sapphire/framework';
import type { Message } from 'discord.js';
// @ts-ignore
import CharacterAI from "node_characterai";

const AI_CLIENT = new CharacterAI();
const SHIROKO_ID = "VAw_2Ov_Dq511JYkwyhKHgboBpr0TxYRcy2UHg9Gt_Q";
let characterChat: any = undefined;

(async () => {
    await AI_CLIENT.authenticateWithToken(process.env["CHARACTERAI_SESSION_TOKEN"]);
    characterChat = await AI_CLIENT.createOrContinueChat(SHIROKO_ID);
})();

async function communicate(message: string): Promise<string> {
    if (characterChat == undefined) {
        return "Cannot connect to chat.";
    }

    const response = await characterChat.sendAndAwaitResponse(message, true);
    return response.text;
}

function prompt(author: string, message: string): string {
    return `(OOC: This message was sent by ${author}. Context: Multiple people are using you to chat in a chatroom, just reply like normally.)\n${message}`
}

export class PingCommand extends Command {
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
    return message.reply(await communicate(prompt(message.author.tag, message.content)));
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    let message = interaction.options.getString("message");
    if (!message) {
        return interaction.reply("Invalid message provided.");
    }

    await interaction.deferReply();
    return interaction.editReply(await communicate(prompt(interaction.user.tag, message)));
  }
}