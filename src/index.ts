import { Client, Collection, GatewayIntentBits, REST, Routes } from "discord.js";
import type DiscordCommand from "./interfaces/discordCommand";
import path from "path";
import fs from "fs";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const commands = new Collection<string, DiscordCommand>()
const commandsJSON: any[] = []

client.once('ready', () => {
  console.log(`${client.user?.tag} としてログインしました`);

  const commandsDir = path.resolve("./src/commands");   // package.json からの相対パス
  const commandFiles = fs.readdirSync(commandsDir).filter(file => file.endsWith(".ts"));

  Promise.all(
    commandFiles.map(async (file) => {
      const filePath = path.join(commandsDir, file);
      const command = await import(filePath)
      if ('data' in command && 'execute' in command) {
        commands.set(command.data.name, command);
      } else {
        console.log(`[WARN] ${file} には data または execute が実装されていないため、読み込みをスキップします`);
      }
    })
  )
    .then(async () => {
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
    })
});

// 起動処理
const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('環境変数 "DISCORD_TOKEN" が設定されていません');
  process.exit(1);
}
client.login(token);
