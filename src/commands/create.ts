import { ActionRowBuilder, ModalBuilder, SlashCommandBuilder, TextInputBuilder } from '@discordjs/builders';
import { CommandInteraction, TextInputStyle } from 'discord.js';

const CMD_NAME = 'create';
const CMD_DESCRIPTION = '新しいイベントを作成します（実行後に登録フォームが表示されます）';

export const data = new SlashCommandBuilder()
  .setName(CMD_NAME)
  .setDescription(CMD_DESCRIPTION);

export const execute = async (interaction: CommandInteraction) => {
  const modal = modalBuilder();
  await interaction.showModal(modal);

  // モーダル送信後の処理は interactionCreate イベントハンドラで行う
}


const modalBuilder = (): ModalBuilder => {
  const actionRows: ActionRowBuilder<TextInputBuilder>[] = [];

  const nameInput = new TextInputBuilder()
  .setStyle(TextInputStyle.Short)
    .setCustomId('name')
    .setLabel('イベント名')
    .setPlaceholder('例：もくもく会');
  actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput));

  const descriptionInput = new TextInputBuilder()
    .setStyle(TextInputStyle.Paragraph)
    .setCustomId('description')
    .setLabel('イベントの説明')
    .setPlaceholder('例：1時間くらいもくもくしましょう')
    .setRequired(false);
  actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput));

  const dateInput = new TextInputBuilder()
    .setStyle(TextInputStyle.Short)
    .setCustomId('date')
    .setLabel('開催日(YYYY-MM-DD)')
    .setPlaceholder('例：2000-10-30');
  actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(dateInput));

  const timeInput = new TextInputBuilder()
  .setStyle(TextInputStyle.Short)
  .setCustomId('time')
  .setLabel('開始時刻(HHmm)')
  .setPlaceholder('例：19:30');
  actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(timeInput));

  const vcChannelInput = new TextInputBuilder()
  .setStyle(TextInputStyle.Short)
  .setCustomId('vc_channel')
  .setLabel('ボイスチャンネルID')
  .setPlaceholder('例：123456789012345678');
  actionRows.push(new ActionRowBuilder<TextInputBuilder>().addComponents(vcChannelInput));

  const modal = new ModalBuilder()
    .setCustomId('create_activity')
    .setTitle('イベントの登録')
    .addComponents(...actionRows);

  return modal;
}
