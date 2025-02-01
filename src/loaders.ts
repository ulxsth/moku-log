import { client, commands } from ".";

import fs from "fs";
import path from "path";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

/**
 * events フォルダ内に定義されたイベントリスナーを読み込んで登録する。
 */
export async function loadEventListeners() {
  const eventsDir = path.resolve("./src/events");
  const eventFiles = fs.readdirSync(eventsDir).filter(file => file.endsWith(".ts"));
  for (const file of eventFiles) {
    const filePath = path.join(eventsDir, file);
    const event = await import(filePath);
    if (event.once) {
      client.once(event.name, (...args) => event.execute(...args));
    } else {
      client.on(event.name, (...args) => event.execute(...args));
    }
  }

  console.log(`${eventFiles.length} 個のイベントリスナーを読み込みました`);
}

/**
 * commands フォルダ内に定義されたコマンドを読み込んで登録する。
 */
export async function loadCommands() {
  const commandsDir = path.resolve("./src/commands");
  const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith(".ts"));

  const commandsJSON: any[] = []
  Promise.all(
    commandFiles.map(async (file) => {
      const filePath = path.join(commandsDir, file);
      const command = await import(filePath);

      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
        commandsJSON.push(command.data.toJSON());
      } else {
        console.log(`[WARN] ${file} には data または execute が実装されていないため、読み込みをスキップします`);
      }
    })
  ).then(async () => {
    const token = process.env.DISCORD_TOKEN;
    const appId = process.env.DISCORD_APP_ID;
    const guildId = process.env.DISCORD_GUILD_ID;
    if (!token || !appId || !guildId) {
      console.error('環境変数 "DISCORD_TOKEN", "DISCORD_APP_ID", "DISCORD_GUILD_ID" のいずれかが設定されていません。設定ファイルを確認してください');
      process.exit(1);
    }

    const rest = new REST().setToken(token);
    const data = await rest.put(Routes.applicationGuildCommands(appId, guildId), { body: commandsJSON }) as any;

    console.log(`${data.length} コマンドの更新が完了しました。`);
  });
}
