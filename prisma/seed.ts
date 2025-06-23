import { faker } from '@faker-js/faker'
import { prisma } from '../src/db/prisma'




async function main() {
  for (let i=0; i<12; i++){
    await prisma.journalEntry.create({
      data: {
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(2)
      }
    })
  }


}

main().then(()=> {
  console.log("seed completed");
  return prisma.$disconnect()
}).catch((e)=> {
  console.error(e);
  return prisma.$disconnect().finally(() => process.exit(1))
})