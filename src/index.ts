import { Client, Collection, GatewayIntentBits } from "discord.js";
import type DiscordCommand from "./interfaces/discordCommand";
import { loadEventListeners, loadCommands } from "./loaders";

export const client = new Client({ intents: [GatewayIntentBits.Guilds] });
export const commands = new Collection<string, DiscordCommand>()

/**
 * メインプロセス。
 * コマンドとイベントリスナーを読み込んで Bot を起動する。
 */
const main = async () => {
  loadCommands();
  await loadEventListeners();
  fire();
}
await main();


/**
 * Discord Bot を起動する。
 */
function fire() {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error('環境変数 "DISCORD_TOKEN" が設定されていません');
    process.exit(1);
  }
  client.login(token);
}
