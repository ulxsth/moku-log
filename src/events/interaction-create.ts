import { Events, type Interaction, CommandInteraction } from "discord.js";
import { client, commands } from "..";

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction) => {
  if (!interaction.isCommand()) return;

  const command = commands.get(interaction.commandName);
  if (command) {
    try {
      await command.execute(interaction as CommandInteraction);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'コマンドの実行中にエラーが発生しました', ephemeral: true });
    }
  }
}
