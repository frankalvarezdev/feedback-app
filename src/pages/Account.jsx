import { useState, useEffect } from 'react'
import { supabase } from 'lib/supabase'
import { connect } from 'react-redux'

const Account = ({ session }) => {
    const [loading, setLoading] = useState(true)
    const [username, setUsername] = useState(null)
    const [website, setWebsite] = useState(null)
    const [avatar_url, setAvatarUrl] = useState(null)

    useEffect(() => {
        getProfile()
    }, [session])

    async function getProfile() {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            let { data, error, status } = await supabase
                .from('profiles')
                .select(`username, website, avatar_url`)
                .eq('id', user.id)
                .single()

            if (error && status !== 406) {
                throw error
            }

            if (data) {
                setUsername(data.username)
                setWebsite(data.website)
                setAvatarUrl(data.avatar_url)
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    async function updateProfile({ username, website, avatar_url }) {
        try {
            setLoading(true)
            const user = supabase.auth.user()

            const updates = {
                id: user.id,
                username,
                website,
                avatar_url,
                updated_at: new Date(),
            }

            let { error } = await supabase.from('profiles').upsert(updates, {
                returning: 'minimal', // Don't return the value after inserting
            })

            if (error) {
                throw error
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="update-profile-box container">
            <div className='field'>
                <label htmlFor="email">Correo electrónico</label>
                <input id="email" type="text" className='input' value={session.user.email} disabled />
            </div>
            <div className='field'>
                <label htmlFor="username">Nombre</label>
                <input
                    id="username"
                    type="text"
                    value={username || ''}
                    className='input'
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className='field'>
                <label htmlFor="website">Website</label>
                <input
                    id="website"
                    type="website"
                    className='input is-text'
                    value={website || ''}
                    onChange={(e) => setWebsite(e.target.value)}
                />
            </div>

            <div className="grid:2 gap">
                <button
                    className="button is-success"
                    onClick={() => updateProfile({ username, website, avatar_url })}
                    disabled={loading}
                >
                    {loading ? 'Cargando...' : 'Actualizar'}
                </button>
                <button className="button is-danger" onClick={() => supabase.auth.signOut()}>
                    Cerrar la sesión
                </button>
            </div>
        </div>
    )
}

export default connect((state) => ({ session: state.session }), {})(Account);