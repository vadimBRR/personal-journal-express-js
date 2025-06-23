import { prisma } from '@/db/prisma'
import { JournalEntry, Prisma, PrismaClient } from '@/generated/prisma'

export class EntryService {
	prisma = prisma

	async createEntry(
		data: Prisma.JournalEntryCreateInput
	): Promise<JournalEntry> {
		return await this.prisma.journalEntry.create({ data })
	}

	// async getAllEntries(
	// 	page: number,
	// 	limit: number,
	// 	search?: string
	// ): Promise<{
	// 	data: JournalEntry[]
	// 	totalOnThisPage: number
	// 	totalEntries: number
	// }> {
	// 	console.log(search)
	// 	const skip = (page - 1) * limit
	// 	const take = limit

	// 	console.log(take)
	// 	if (search) {
	// 		const [data, totalOnThisPage] = await Promise.all([
	// 			this.prisma.journalEntry.findMany({
	// 				where: {
	// 					OR: [
	// 						{ title: { contains: search, mode: 'insensitive' } },
	// 						{ content: { contains: search, mode: 'insensitive' } },
	// 					],
	// 				},
	// 				skip,
	// 				take,
	// 			}),

	// 			this.prisma.journalEntry.count({ skip, take }),
	// 		])

	// 		return { data, totalOnThisPage, totalEntries: data.length }
	// 	}

	// 	const [data, totalOnThisPage] = await Promise.all([
	// 		this.prisma.journalEntry.findMany({ skip, take }),
	// 		this.prisma.journalEntry.count({ skip, take }),
	// 	])

	// 	return { data, totalOnThisPage, totalEntries: data.length }
	// }

	async getAllEntries(
		page: number,
		limit: number,
		search?: string
	): Promise<{
		data: JournalEntry[]
		totalOnThisPage: number
		totalEntries: number
	}> {
		const skip = (page - 1) * limit
		const take = limit
		const where = search
			? {
					OR: [
						{ title: { contains: search, mode: Prisma.QueryMode.insensitive  } },
						{ content: { contains: search, mode: Prisma.QueryMode.insensitive} },
					],
			  }
			: undefined

		const [data, totalEntries] = await Promise.all([
			this.prisma.journalEntry.findMany({
				where,
				skip,
				take,
			}),

      this.prisma.journalEntry.count({})
		])

		return { data, totalEntries, totalOnThisPage: data.length }
	}

	async getEntryById(id: string): Promise<JournalEntry | null> {
		return await this.prisma.journalEntry.findUnique({ where: { id } })
	}

	async deleteById(id: string): Promise<void> {
		await this.prisma.journalEntry.delete({ where: { id } })
	}

	async updateById(
		id: string,
		data: Prisma.JournalEntryUpdateInput
	): Promise<JournalEntry> {
		return await this.prisma.journalEntry.update({ where: { id }, data })
	}
}
