import { supabase } from 'lib/supabase'
import { useState } from 'react'

export default function Auth() {
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')

	const handleLogin = async (email) => {
		try {
			setLoading(true)
			const { error } = await supabase.auth.signIn({ email })
			if (error) throw error
			alert('¡Revise su correo para ver el enlace de inicio de sesión!')
		} catch (error) {
			alert(error.error_description || error.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="container full-screen login">
			<div className="box login-widget">
				<h3 className="header field">Inicie sesión a través de un enlace mágico con su correo</h3>
				<input
					className="input is-text"
					type="email"
					placeholder="Tu correo electrónico"
					value={email}
					name='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					onClick={(e) => {
						e.preventDefault()
						handleLogin(email)
					}}
					className='button is-primary margin-top:lg'
					disabled={loading}
				>
					{loading ? <span>Enviando...</span> : <span>Enviar enlace mágico</span>}
				</button>
			</div>
		</div>
	)
}