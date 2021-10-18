import { fromNow } from 'lib/date';
import { Link } from 'react-router-dom';
import Icon from '../utils/Icon';

const Track = ({ id, genres, artists, title, created_at, listened, country }) => {
    return (
        <Link to={`/track/${id}`} className={`track ${listened && 'is-listened'}`}>
            <div className='track-icon'>
                <Icon icon='headset' />
            </div>
            <div>
                <div className='track-genres'>
                    {genres.slice(0, 2).map((genre) => `#${genre} `)} | &nbsp;
                    <img src={country === 'NONE' ? '/world.svg' : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`} width="16" />
                </div>
                <h3 className='track-title'>{title}</h3>
                <p className='track-artist'>
                    {artists} ● {fromNow(created_at)}
                </p>
            </div>
        </Link>
    )
}

export default Track;