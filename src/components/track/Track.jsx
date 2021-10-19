import { fromNow } from 'lib/date';
import { supabase } from 'lib/supabase';
import { Link } from 'react-router-dom';
import Icon from '../utils/Icon';

const Track = ({ id, genres, artists, title, created_at, listened, country, user_id }) => {

    const user = supabase.auth.user();

    const deleteTrack = async () => {

        // comprueba si el usuario realmente quiere eliminar
        const deleteConfirm = window.confirm('¿Está seguro de eliminar esta pista?');

        if (deleteConfirm) {
            // const { data, error } =
            await supabase
                .from('tracks')
                .delete()
                .match({ id: id });
        }

    }

    return (
        <div className={`track ${listened && 'is-listened'}`}>
            <Link className='track-icon' to={`/track/${id}`}>
                <Icon icon='headset' />
            </Link>
            <div className='track-data'>
                <div>
                    <Link to={`/track/${id}`}>
                        <div className='track-genres'>
                            {genres.slice(0, 2).map((genre) => `#${genre} `)} &nbsp;

                            <img alt="country" src={country === 'NONE' ? '/world.svg' : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`} width='16' />
                        </div>
                        <h3 className='track-title'>{title}</h3>
                        <p className='track-artist'>
                            {artists} ● {fromNow(created_at)}
                        </p>
                    </Link>
                    {user_id === user.id && (
                        <div className='track-actionbuttons'>
                            <button className='button is-danger is-small is-outlined' onClick={deleteTrack}>Eliminar</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Track;