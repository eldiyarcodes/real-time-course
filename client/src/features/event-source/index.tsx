import { useEffect } from 'react'
import { ChatLayout } from '../../shared/ui/chat-layout'
import { useEventSourcing } from './use-event-source'

export function EventSourcing() {
	const { messages, handleSubmit, subscribe } = useEventSourcing()

	useEffect(() => {
		subscribe()
	}, [])

	return <ChatLayout data={messages} handleSubmit={handleSubmit} />
}
