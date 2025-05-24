import { ChatLayout } from '../../shared/ui/chat-layout'
import { useWebsocket } from './useWebsocket'

export function WebSock() {
	const {
		connected,
		username,
		setUsername,
		handleConnect,
		messages,
		sendMessage,
	} = useWebsocket()

	if (!connected) {
		return (
			<>
				<h1 className='text-3xl font-bold mb-4'>Login</h1>
				<form
					onSubmit={handleConnect}
					className='p-8 shadow-lg flex items-center gap-4'
				>
					<input
						value={username}
						onChange={e => setUsername(e.target.value)}
						type='text'
						placeholder='Enter your username'
						className='p-3 rounded border border-slate-300 outline-none'
					/>
					<button
						type='submit'
						className='px-4 py-3 max-w-[200px] rounded text-center bg-blue-600 hover:bg-blue-500 text-white font-bold'
					>
						Login
					</button>
				</form>
			</>
		)
	}

	return <ChatLayout handleSubmit={sendMessage} data={messages} />
}
