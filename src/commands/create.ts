import { SlashCommandBuilder } from '@discordjs/builders';
import { CommandInteraction } from 'discord.js';

const CMD_NAME = 'create';
const CMD_DESCRIPTION = '新しいイベントを作成します（実行後に登録フォームが表示されます）';

export const data = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription(CMD_DESCRIPTION);

export const execute = async (interaction: CommandInteraction) => {
  await interaction.reply('test');
}