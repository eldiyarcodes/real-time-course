import { WebSock } from '../features/websocket'

export function App() {
	return (
		<div className='max-w-[1000px] mx-auto pt-[150px] px-10'>
			{/* <LongPulling /> */}
			{/* <EventSourcing /> */}
			<WebSock />
		</div>
	)
}
