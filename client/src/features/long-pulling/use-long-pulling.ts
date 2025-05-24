import { nanoid } from 'nanoid'
import { useState } from 'react'
import { requester } from '../../shared/instance'

type Message = {
	id: string
	message: string
}

export function useLongPulling() {
	const [messages, setMessages] = useState<Message[]>([])

	const subscribe = async () => {
		try {
			const { data } = await requester.get('get-message')
			setMessages(prev => [data, ...prev])

			await subscribe()
		} catch (err) {
			setTimeout(() => {
				subscribe()
			}, 500)
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
