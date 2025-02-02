import { Client, Collection, GatewayIntentBits } from "discord.js";
import type DiscordCommand from "./interfaces/discordCommand";
import { loadEventListeners, loadCommands } from "./loaders";

/**
 * メインプロセス。
 * コマンドとイベントリスナーを読み込んで Bot を起動する。
*/
const main = async () => {
  const client = new Client({ intents: [GatewayIntentBits.Guilds] });
  const commands = new Collection<string, DiscordCommand>()

  loadCommands(commands);
  await loadEventListeners(client);
  fire(client);
}
main();


/**
 * Discord Bot を起動する。
 */
function fire(client: Client) {
  const token = process.env.DISCORD_TOKEN;
  if (!token) {
    console.error('環境変数 "DISCORD_TOKEN" が設定されていません');
    process.exit(1);
  }
  client.login(token);
}
