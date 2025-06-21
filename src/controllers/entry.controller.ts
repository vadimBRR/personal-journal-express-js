import { NextFunction, Request, Response } from 'express'
import { EntryService } from '@/services/entry.service'
import { createEntryDto } from '@/dto/createEntry.dto'

const entryService = new EntryService()

export async function createEntry(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const validData = createEntryDto.safeParse(req.body)
		if (!validData.success) {
			res.status(400).json({ message: validData.error.errors })
		} else {
			const response = await entryService.createEntry(validData.data)
			res.status(201).json(response)
		}
	} catch (error) {
		next(error)
	}
}
