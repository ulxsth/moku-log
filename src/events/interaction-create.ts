import { CommandInteraction, Events, ModalSubmitInteraction, type Interaction } from "discord.js";
import { commands } from "..";

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
      saveActivity(fields)
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

async function saveActivity(fields: any) {
  // イベント情報をデータベースに保存する処理 
}