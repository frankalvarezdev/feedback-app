// import Icon from "components/utils/Icon";
import { useParams } from "react-router-dom";
import Loading from 'components/utils/Loading';
import { supabase } from "lib/supabase";
import { useEffect, useState } from 'react';
import { getIframeUrl } from "lib/iframe";
import { fromNow } from "lib/date";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { addListenedTrack, checkListenedTracks } from "lib/clientDb";
import { useDispatch } from "react-redux";
import { setTracksAction } from "redux/actionCreators";
import { store } from "redux/store";

const TrackPage = () => {

    const dispatch = useDispatch();

    let { id } = useParams();

    const [track, setTrack] = useState();

    useEffect(() => {
        // obtiene datos del track
        const getData = async () => {
            try {
                let { data, error, status } = await supabase.from('tracks').select().match({ id: id }).single();

                if (error && status !== 406) throw error;

                // genera la url del iframe
                data['iframe'] = await getIframeUrl(data.url);

                setTrack(data);

                // agrega a tracks escuchados y recarga el store
                const change = await addListenedTrack(data.id);

                if (change) {
                    let tracksData = await checkListenedTracks(store.getState().tracks);
                    dispatch(setTracksAction(tracksData));
                }


            } catch (error) {
                alert(error.message)
            }
        }

        getData();
    }, [id, dispatch])

    return (
        <div className="container padding-top">
            {track ? (
                <>
                    <div className="track-iframe">
                        <iframe scrolling="no" frameBorder="0" src={track.iframe.url} title={`${track.iframe.service} embed player`}></iframe>
                    </div>
                    <div>
                        {track.genres.map((genre) => `#${genre} `)}
                    </div>
                    <h3>
                        {track.title}
                    </h3>
                    <p>
                        {track.artists}
                    </p>
                    <div>
                        ● {fromNow(track.created_at)}
                    </div>
                    <Markdown className='track-description' children={track.description} remarkPlugins={[remarkGfm]} />
                </>
            ) : <Loading />}
        </div>
    )
}

export default TrackPage;