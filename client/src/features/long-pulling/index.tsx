import { useEffect } from 'react'
import { ChatLayout } from '../../shared/ui/chat-layout'
import { useLongPulling } from './use-long-pulling'

export function LongPulling() {
	const { messages, handleSubmit, subscribe } = useLongPulling()

	useEffect(() => {
		subscribe()
	}, [])

	return <ChatLayout data={messages} handleSubmit={handleSubmit} />
}
