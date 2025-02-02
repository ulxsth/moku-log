import { Collection, CommandInteraction, Events, ModalSubmitInteraction, type Interaction } from "discord.js";
import { handleCreateActivityModalSubmit } from "./modal-submit/handleCreateActivityModalSubmit";
import DiscordCommand from "@/interfaces/discordCommand";

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction, commands: Collection<string, DiscordCommand>) => {
  if (interaction.isCommand()) {
    await handleCommandExecution(interaction, commands);
  } else if (interaction.isModalSubmit()) {
    await handleModalSubmit(interaction);
  }
}

async function handleCommandExecution(interaction: CommandInteraction, commands: Collection<string, DiscordCommand>) {
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

function handleModalSubmit(interaction: ModalSubmitInteraction) {
  switch (interaction.customId) {
    case 'create_activity':
      handleCreateActivityModalSubmit(interaction);
      break;
  }
}

