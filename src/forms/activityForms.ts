import { z } from 'zod'

export const activityFormSchema = z.object({
  name: z.string().min(1, 'イベント名は1文字以上で入力してください').max(100, 'イベント名は100文字以内で入力してください'),
  description: z.string().max(500, 'イベントの説明は500文字以内で入力してください'),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, '日付はYYYY-MM-DD形式で入力してください'),
  time: z.string().regex(/^\d{2}:\d{2}$/, '時刻はHH:mm形式で入力してください'),
  vcChannel: z.string().regex(/^\d{18}$/, 'ボイスチャンネルIDは18桁の数字で入力してください')
}).brand('ActivityForm')
