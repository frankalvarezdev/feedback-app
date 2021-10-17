import { Link } from 'react-router-dom';
import Icon from '../utils/Icon';

const Track = ({ id, genres, artists, title }) => {
    return (
        <Link to={`/track/${id}`} className="track">
            <div className='track-icon'>
                <Icon icon='headset' />
            </div>
            <div>
                <div className='track-genres'>
                    {genres.map((genre) => `#${genre} `)}
                </div>
                <h3 className='track-title'>{title}</h3>
                <p className='track-artist'>
                    {artists} ● hace un minuto
                </p>
            </div>
        </Link>
    )
}

export default Track;