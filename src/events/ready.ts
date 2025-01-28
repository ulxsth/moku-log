import { Client, Events } from "discord.js";

export const name = Events.ClientReady;

export const execute = (client: Client) => {
  console.log(`${client.user?.tag} としてログインしました`);
}