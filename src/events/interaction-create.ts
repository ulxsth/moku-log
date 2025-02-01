import { CommandInteraction, Events, ModalSubmitFields, ModalSubmitInteraction, type Interaction } from "discord.js";
import { commands } from "..";
import { PrismaClient } from "@prisma/client";

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

async function saveActivity(fields: ModalSubmitFields) {
  const prisma = new PrismaClient();

  const name = fields.getTextInputValue('name');
  const description = fields.getTextInputValue('description') || null;
  const date = fields.getTextInputValue('date');
  const time = fields.getTextInputValue('time');
  const vcChannel = fields.getTextInputValue('vc_channel');

  const activity = await prisma.activity.create({
    data: {
      name,
      description,
      date,
      time,
      vcChannel,
    }
  });

  await prisma.$disconnect();
  return activity;
}
