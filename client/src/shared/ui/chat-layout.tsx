export function ChatLayout<
	T extends {
		id: string
		message: string
		event?: 'connection' | 'message'
		username?: string
	}
>({
	handleSubmit,
	data,
}: {
	handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
	data: T[]
}) {
	return (
		<div className='flex flex-col gap-6'>
			<form
				onSubmit={handleSubmit}
				className='flex flex-col gap-4 p-10 shadow-lg rounded-xl'
			>
				<input
					required
					type='text'
					name='message'
					placeholder='Type your message...'
					className='p-3 rounded border border-slate-300 outline-none'
				/>
				<button
					type='submit'
					className='px-4 py-3 max-w-[200px] rounded text-center bg-blue-600 hover:bg-blue-500 text-white font-bold'
				>
					Submit
				</button>
			</form>

			<div className='flex flex-col gap-4'>
				{data.map(msg => (
					<div key={msg.id} className='p-4 border border-slate-400 rounded'>
						{msg.event === 'connection' ? (
							<div>
								<span className='text-teal-500 text-xl'>{msg.username}</span>{' '}
								connected
							</div>
						) : (
							<div>
								<span className='text-teal-500 text-xl'>{msg.username}</span>: {msg.message}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
