import { Command } from '@sapphire/framework';

export class PingCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName('lover').setDescription('yeah')
    );
  }

  public async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    return interaction.reply("no sensei stop bein cunny");
  }
}