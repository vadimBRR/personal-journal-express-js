import { prisma } from '@/db/prisma'
import { JournalEntry, Prisma, PrismaClient } from '@/generated/prisma'

export class EntryService {
	prisma = prisma

	async createEntry(
		data: Prisma.JournalEntryCreateInput,
		userId: string
	): Promise<JournalEntry> {
		return await this.prisma.journalEntry.create({
			data: { ...data, user: { connect: { id: userId } } },
		})
	}

	async getAllEntries(
		page: number,
		limit: number,
		userId: string,
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
						{ title: { contains: search, mode: Prisma.QueryMode.insensitive } },
						{
							content: { contains: search, mode: Prisma.QueryMode.insensitive },
						},
					],
			  }
			: undefined

		const [data, totalEntries] = await Promise.all([
			this.prisma.journalEntry.findMany({
				where,
				skip,
				take,
			}),

			this.prisma.journalEntry.count({}),
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
