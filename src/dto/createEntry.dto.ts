import { z } from 'zod'

export const createEntryDto = z.object({
	title: z.string().min(1, 'Title is required!').max(100),
	content: z.string().min(1, 'Content is required!').max(5000),
})
