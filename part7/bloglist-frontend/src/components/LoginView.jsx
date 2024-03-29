import { useNotification } from '../hooks/useNotification'

export const LoginView = ({
	credentials,
	onCredentialsChange,
	onLoginSubmit,
}) => {
	const { notification } = useNotification()

	return (
		<>
			<h1>log in to see the blogs</h1>
			{notification.type === 'error' && (
				<div
					style={{
						backgroundColor: '#eeeeee',
						border: '2px red solid',
						borderRadius: '10px',
						color: 'red',
						padding: '0.5rem',
					}}
				>
					<h1>{notification.message}</h1>
				</div>
			)}
			<form onSubmit={onLoginSubmit}>
				<div>
					username
					<input
						type='text'
						name='username'
						value={credentials.username}
						onChange={onCredentialsChange}
					/>
				</div>
				<div>
					password
					<input
						type='password'
						name='password'
						value={credentials.password}
						onChange={onCredentialsChange}
					/>
				</div>
				<button type='submit'>login</button>
			</form>
		</>
	)
}
