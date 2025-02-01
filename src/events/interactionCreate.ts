import { CommandInteraction, Events, ModalSubmitInteraction, type Interaction } from "discord.js";
import { commands } from "..";
import { handleCreateActivityModalSubmit } from "./modal-submit/handleCreateActivityModalSubmit";

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    await handleCommandExecution(interaction);
  } else if (interaction.isModalSubmit()) {
    await handleModalSubmit(interaction);
  }
}


async function handleCommandExecution(interaction: CommandInteraction) {
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

