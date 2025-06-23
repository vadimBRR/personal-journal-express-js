import { prisma } from '@/db/prisma'
import { JournalEntry, Prisma, PrismaClient } from '@/generated/prisma'

export class EntryService {
	prisma = prisma

	async createEntry(
		data: Prisma.JournalEntryCreateInput
	): Promise<JournalEntry> {
		return await this.prisma.journalEntry.create({ data })
	}

	async getAllEntries(search?:string): Promise<JournalEntry[]> {
    console.log(search);
    if(search){
     return await this.prisma.journalEntry.findMany({
      where: {
        OR: [
          {title: {contains: search, mode: 'insensitive'}},
          {content: {contains:search, mode: 'insensitive'}}
        ]
      }
     })
    }
		return await this.prisma.journalEntry.findMany()
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
