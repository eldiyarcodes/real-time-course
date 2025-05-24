import { nanoid } from 'nanoid'
import { useState } from 'react'
import { CONFIG } from '../../shared/config'
import { requester } from '../../shared/instance'

type Message = {
	id: string
	message: string
}

export function useEventSourcing() {
	const [messages, setMessages] = useState<Message[]>([])

	const subscribe = async () => {
		const eventSource = new EventSource(`${CONFIG.BASE_URL}connect`)

		eventSource.onmessage = event => {
			const message = JSON.parse(event.data)
			setMessages(prev => [message, ...prev])
		}
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const form = e.currentTarget

		const formData = new FormData(form)
		const message = String(formData.get('message') ?? '')

		try {
			await requester.post('new-message', {
				id: nanoid(),
				message,
			})

			form.reset()
		} catch (err) {
			return Promise.reject(err)
		}
	}

	return {
		messages,
		handleSubmit,
		subscribe,
	}
}
