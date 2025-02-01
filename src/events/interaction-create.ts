import { CommandInteraction, Events, ModalSubmitFields, ModalSubmitInteraction, type Interaction } from "discord.js";
import { commands } from "..";
import { saveActivity } from "../db/activity";

export const name = Events.InteractionCreate;
export const execute = async (interaction: Interaction) => {
  if (interaction.isCommand()) {
    await handleCommandExecution(interaction);
  } else if(interaction.isModalSubmit()) {
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

async function handleModalSubmit(interaction: ModalSubmitInteraction) {
  const fields = interaction.fields;

  switch (interaction.customId) {
    case 'create_activity':
      // TODO: fields のバリデーション
      const name = fields.getTextInputValue('name');
      const description = fields.getTextInputValue('description');
      const date = fields.getTextInputValue('date');
      const time = fields.getTextInputValue('time');
      const dateTime = new Date(`${date}T${time}:00`);
      const vcChannel = fields.getTextInputValue('vc_channel');

      const data = { name, description, dateTime, vcChannel };

      saveActivity(data)
        .then(() => {
          const summary = [
            `> イベント名: ${fields.getTextInputValue('name')}`,
            `> 説明: ${fields.getTextInputValue('description') ?? 'なし'}`,
            `> 開催日: ${fields.getTextInputValue('date')}`,
            `> 開始時刻: ${fields.getTextInputValue('time')}`,
            `> ボイスチャンネルID: ${fields.getTextInputValue('vc_channel')}`
          ].join('\n');
          interaction.reply({ content: `イベントを登録しました:\n${summary}` });
        }).catch((error) => {
          console.error(error);
          interaction.reply({ content: 'イベントの登録中にエラーが発生しました' });
        });
      break;
    default:
  }
}
