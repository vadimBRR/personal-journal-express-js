import express, { json } from 'express'
import { entryRouter } from './routes/entry.routes'
import { Request, Response } from 'express'
import dotenv from 'dotenv'
import { prisma } from './db/prisma'

dotenv.config()
const app = express()

async function main() {
	app.use(json())

	// router
	app.use('/api', entryRouter)

	// 404 fallback
	app.all(/(.*)/, (req, res) => {
		res.status(404).json({ message: 'Not found!' })
	})

	// error handler
	app.use((err: Error, req: Request, res: Response, next: Function) => {
		console.error(err)
		res.status(500).json({ message: 'Something went wrong!' })
	})

	// start server
	const PORT = process.env.PORT || 4200
	app.listen(PORT, () => {
		console.log(`Server is running on ${PORT}`)
	})
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
