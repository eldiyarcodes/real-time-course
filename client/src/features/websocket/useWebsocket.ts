import { nanoid } from 'nanoid'
import { useRef, useState } from 'react'

type Message = {
	id: string
	message: string
	username: string
	event: 'connection' | 'message'
}

export function useWebsocket() {
	const [messages, setMessages] = useState<Message[]>([])
	const [connected, setConnected] = useState(false)
	const [username, setUsername] = useState('')

	const socket = useRef<WebSocket | null>(null)

	function connect() {
		socket.current = new WebSocket('ws://localhost:5000')

		socket.current.onopen = () => {
			setConnected(true)

			const dataSent = {
				event: 'connection',
				username,
				id: nanoid(),
			}

			socket.current?.send(JSON.stringify(dataSent))
		}

		socket.current.onmessage = (event: MessageEvent) => {
			const msg = JSON.parse(event.data)
			setMessages(prev => [msg, ...prev])
		}

		socket.current.onclose = () => console.log('Socket closed')

		socket.current.onerror = () => console.log('Socket err')
	}

	async function sendMessage(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		const form = e.currentTarget

		const formData = new FormData(form)
		const message = String(formData.get('message') ?? '')

		socket.current?.send(
			JSON.stringify({
				id: nanoid(),
				message,
				username,
				event: 'message',
			})
		)

		form.reset()
	}

	function handleConnect(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()

		connect()
	}

	return {
		messages,
		connected,
		setUsername,
		username,
		handleConnect,
		sendMessage,
	}
}
