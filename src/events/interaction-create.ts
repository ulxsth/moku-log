import { CommandInteraction, Events, type Interaction } from "discord.js";
import { commands } from "..";

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    await handleCommandExecution(interaction as CommandInteraction);
  } else if(interaction.isModalSubmit()) {
    await handleModalSubmit(interaction as Interaction);
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

async function handleModalSubmit(interaction: Interaction) {
  console.log('Modal submitted');
}