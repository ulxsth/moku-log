import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const BOT_TAG = client.user?.tag;

client.once('ready', () => {
  console.log(`${BOT_TAG} としてログインしました`);
});

// 起動処理
const token = process.env.DISCORD_TOKEN;
if(!token) {
  console.error('環境変数 "DISCORD_TOKEN" が設定されていません');
  process.exit(1);
}
client.login(token);
