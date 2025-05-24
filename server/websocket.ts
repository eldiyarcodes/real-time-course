import WebSocket from 'ws'

type MessagePayload = {
	event: 'connection' | 'message'
	id: string
	message?: string
}

const wss = new WebSocket.Server({ port: 5000 }, () =>
	console.log('Server started on 5000')
)

wss.on('connection', function connection(ws: WebSocket) {
	ws.on('message', (data: WebSocket.RawData) => {
		const message = JSON.parse(data.toString()) as MessagePayload

		switch (message.event) {
			case 'message':
			case 'connection':
				broadcastMessage(message)
				break
		}
	})
})

function broadcastMessage(message: MessagePayload) {
	wss.clients.forEach(client => {
		if (client.readyState === WebSocket.OPEN) {
			client.send(JSON.stringify(message))
		}
	})
}
