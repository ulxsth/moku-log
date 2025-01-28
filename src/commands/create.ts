import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder } from '@discordjs/builders';
import { CommandInteraction, TextInputStyle } from 'discord.js';

const CMD_NAME = 'create';
const CMD_DESCRIPTION = '新しいイベントを作成します（実行後に登録フォームが表示されます）';

export const data = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription(CMD_DESCRIPTION);

export const execute = async (interaction: CommandInteraction) => {
  const modal = createModal();
  await interaction.showModal(modal);

  // 入力送信後の処理は ModalSubmitInteraction リスナで行う
}

const createModal = (): ModalBuilder => {
  const actionRows: ActionRowBuilder<TextInputBuilder>[] = [];

  const title = new TextInputBuilder()
    .setCustomId('activityTitle')
    .setLabel('イベント名')
    .setStyle(TextInputStyle.Short);
    actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(title));

  const description = new TextInputBuilder()
    .setCustomId('activityDescription')
    .setLabel('イベントの説明')
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false);
    actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(description));

  const date = new TextInputBuilder()
    .setCustomId('activityDate')
    .setLabel('日時')
    .setPlaceholder('YYYY/MM/DD HH:MM')
    .setStyle(TextInputStyle.Short);
    actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(date));

  const channeiId = new TextInputBuilder()
    .setCustomId('activityChannelId')
    .setLabel('イベントチャンネル（ID）')
    .setStyle(TextInputStyle.Short);
    actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(channeiId));

  const modal = new ModalBuilder()
    .setCustomId('createActivity')
    .setTitle('イベントの作成');
  modal.addComponents(...actionRows);

  return modal;
}