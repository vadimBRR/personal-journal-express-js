import { prisma } from '@/db/prisma'
import { JournalEntry, Prisma, PrismaClient } from '@/generated/prisma'


export class EntryService {
  prisma = prisma;

  async createEntry(data:Prisma.JournalEntryCreateInput):Promise<JournalEntry> {
    return await this.prisma.journalEntry.create({data})
  }

}