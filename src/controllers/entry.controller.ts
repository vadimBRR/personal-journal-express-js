import { NextFunction, Request, Response } from 'express'
import { EntryService } from '@/services/entry.service'
import { createEntryDto } from '@/dto/createEntry.dto'
import { updateEntryDto } from '@/dto/updateEntry.dto'

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
      // @ts-ignore
      const userId = req.userId;
			const response = await entryService.createEntry(validData.data, userId)
			res.status(201).json(response)
		}
	} catch (error) {
		next(error)
	}
}

export async function getAllEntries(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const search = req.query.search as string | undefined
		const page = parseInt(req.query.page as string) || 1
		const limit = parseInt(req.query.limit as string) || 10

    // @ts-ignore
    const userId = req.userId;

		const { data, totalEntries, totalOnThisPage } =
			await entryService.getAllEntries(page, limit, userId, search)

		console.log(totalEntries)

		const totalPages = parseInt((totalEntries / limit).toFixed(0))
		res.status(200).json({
			data,
			meta: {
				totalOnThisPage,
				totalEntries,
				totalPages,
				currentPage: page,
				limit,
			},
		})
	} catch (error) {
		next(error)
	}
}

export async function getEntryById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = req.params?.id
		if (id) {
			const entry = await entryService.getEntryById(id)
			if (!entry) {
				res.status(404).json({ message: 'Entry with id:' + id + ' not found!' })
			} else {
				res.status(200).json(entry)
			}
		} else {
			res.status(400).json({ message: 'Provide the id!' })
		}
	} catch (error) {
		next(error)
	}
}

export async function deleteEntryById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = req.params.id

		const existing = await entryService.getEntryById(id)
		console.log('existing?')
		console.log(existing)
		if (!existing) {
			res.status(404).json({ message: `Entry with id: ${id} not found!` })
		} else {
			await entryService.deleteById(id)
			res.status(204).send()
		}
	} catch (error) {
		next(error)
	}
}

export async function updateById(
	req: Request,
	res: Response,
	next: NextFunction
) {
	try {
		const id = req.params.id
		const validData = updateEntryDto.safeParse(req.body)

		if (!validData.success) {
			res.status(400).json({ message: validData.error.errors })
		} else {
			const existing = await entryService.getEntryById(id)

			if (!existing) {
				res.status(404).json({ message: `Entry with id ${id} not found!` })
			} else {
				const updateEntry = await entryService.updateById(id, validData.data)
				res.status(200).json(updateEntry)
			}
		}
	} catch (error) {
		next(error)
	}
}
