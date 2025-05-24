import express, { Request, Response } from 'express'
const cors = require('cors')
const events = require('events')

const PORT = 5000
const emitter = new events.EventEmitter()
const app = express()

app.use(cors())
app.use(express.json())

app.get('/get-message', (req: Request, res: Response) => {
	emitter.once(
		'newMessage',
		({ id, message }: { message: string; id: string }) => {
			res.json({ id, message })
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
