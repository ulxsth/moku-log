import path from 'node:path'
import fs from 'node:fs'
import { REST } from 'discord.js'

const folderPath = path.join(__dirname, 'commands')

export const deployCommands = async () => {
  const commands = []
  const commandFolders = fs.readdirSync(folderPath)

  for (const folder of commandFolders) {
    const commandsPath = path.join(folderPath, folder)
    const commandFiles = fs.readdirSync(commandsPath)
      .filter(file => file.endsWith('.ts'))
    for (const file of commandFiles) {
      const command = require(path.join(commandsPath, file))
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON())
      } else {
        console.log(`[WARN] ${file} には data または execute が実装されていないため、読み込みをスキップします`);
      }
    }
  }

  const token = process.env.DISCORD_TOKEN
  if (!token) {
    console.error('環境変数 "DISCORD_TOKEN" が設定されていません')
    process.exit(1)
  }
  const rest = new REST().setToken(token)

  try {
    console.log('コマンドの更新中...')

    await rest.put(
      '/applications/8675309/commands',
      { body: commands },
    )

    console.log('コマンドの更新が完了しました。')
  } catch (error) {
    console.error(error)
  }
}