import type { ModalSubmitInteraction } from "discord.js";
import { saveActivity } from "../../db/activity";
import { validateActivityForm } from "../../validators/activityForm";

export const handleCreateActivityModalSubmit = async (interaction: ModalSubmitInteraction) => {
  const fields = interaction.fields;

  const name = fields.getTextInputValue('name');
  const description = fields.getTextInputValue('description');
  const date = fields.getTextInputValue('date');
  const time = fields.getTextInputValue('time');
  const dateTime = new Date(`${date}T${time}:00`);
  const vcChannel = fields.getTextInputValue('vc_channel');

  const activityData = { name, description, date, time, vcChannel };
  const validationResult = validateActivityForm(activityData);
  if (!validationResult.success) {
    const errorMessage = validationResult.error.errors.map(err => err.message).join('\n');
    interaction.reply({ content: `ERROR: \n${errorMessage}` });
    return;
  }

  const data = { name, description, dateTime, vcChannel };
  const newActivity = await saveActivity(data)
    .catch((error) => {
      console.error(error);
      interaction.reply({ content: 'イベントの登録中に予期せぬエラーが発生しました' });
    });

  if (newActivity) {
    const summary = [
      `> イベント名: ${name}`,
      `> 説明: ${description ?? 'なし'}`,
      `> 開催日: ${date}`,
      `> 開始時刻: ${time}`,
      `> ボイスチャンネルID: ${vcChannel}`
    ].join('\n');
    interaction.reply({ content: `イベントを登録しました:\n${summary}` });
  }
};
