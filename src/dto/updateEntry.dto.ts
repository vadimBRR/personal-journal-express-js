import { z } from 'zod'

export const updateEntry = z.object({
  title: z.string().min(1).max(500).optional(),
  description: z.string().min(1).max(5000).optional()
})