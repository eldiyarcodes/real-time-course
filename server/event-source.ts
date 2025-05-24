import express, { Request, Response } from 'express'
const cors = require('cors')
const events = require('events')

const PORT = 5000
const emitter = new events.EventEmitter()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/connect', (req: Request, res: Response) => {
	res.writeHead(200, {
		Connection: 'keep-alive',
		'Content-Type': 'text/event-stream',
		'Cache-Control': 'no-cache',
	})

	emitter.on(
		'newMessage',
		({ id, message }: { id: string; message: string }) => {
			res.write(`data: ${JSON.stringify({ id, message })} \n\n`)
		}
	)
})

app.post('/new-message', (req: Request, res: Response) => {
	const reqData = req.body

	if (!reqData) {
		res.status(400).json({ status: 'error', info: 'Incorrect data' })
	}

	emitter.emit('newMessage', reqData)

	res.status(200).json({ status: 'ok', reqData })
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
