import Loading from 'components/utils/Loading';
import Track from 'components/track/Track';
import { useSelector } from 'react-redux';

const Tracks = () => {

    const tracks = useSelector(state => state.tracks);

    return (
        <>
            {tracks.data ? (

                tracks.data.length > 0 ? (
                    <div className="grid:2 padding-top gap">
                        {tracks.data.map((track, trackIndex) => (
                            <Track key={trackIndex} {...track} />
                        ))}
                    </div>
                ) : <div className='text-align:center padding-top text-opacity:1'>Aun no hay tracks</div>

            ) : <Loading />}
        </>
    )
}

export default Tracks;