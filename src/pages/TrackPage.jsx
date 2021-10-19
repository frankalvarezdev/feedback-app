import Icon from "components/utils/Icon";
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
import Share from "components/utils/Share";

const TrackPage = () => {

    const dispatch = useDispatch();

    let { id } = useParams();

    const [shareIsOpen, setShareIsOpen] = useState(false);

    const closeShareModal = () => setShareIsOpen(false);
    const openShareModal = () => setShareIsOpen(true);

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

    const back = () => {
        window.history.back();
    }

    return (
        <>
            <Share isOpen={shareIsOpen} onRequestClose={closeShareModal} url={window.location.href} />

            <div className="container padding-top">
                {track ? (
                    <div className="trackpage">
                        <div className="trackpage-topbuttons">
                            <div>
                                <button className="trackpage-back button is-info" onClick={back}>
                                    <Icon icon='arrow_back' /> Volver
                                </button>
                            </div>
                            <div className='text-align:center'>
                                <button className="trackpage-back button is-info" onClick={openShareModal}>
                                    <Icon icon='share' /> Compartir
                                </button>
                            </div>
                            <div className='button-rigth'>
                                <a className='button is-info' target='_blank' rel='noreferrer' href={track.url}>
                                    {track.iframe.service} <Icon icon='open_in_new' />
                                </a>
                            </div>
                        </div>
                        <div className="trackpage-iframe">
                            <iframe scrolling="no" frameBorder="0" src={track.iframe.url} title={`${track.iframe.service} embed player`}></iframe>
                        </div>
                        <br />
                        <div className="box">
                            <div className='trackpage-genres'>
                                {track.genres.map((genre) => `#${genre} `)}
                            </div>
                            <h3 className='trackpage-title'>
                                {track.title}
                            </h3>
                            <p className='trackpage-artist'>
                                {track.artists}
                            </p>
                            <hr />
                            <div className='trackpage-date'>
                                <Icon icon='schedule' /> {fromNow(track.created_at)} ● <img alt="country" src={track.country === 'NONE' ? '/world.svg' : `https://purecatamphetamine.github.io/country-flag-icons/3x2/${track.country}.svg`} width="16" />
                            </div>
                            <Markdown className='trackpage-description' children={track.description} remarkPlugins={[remarkGfm]} />
                        </div>
                    </div>
                ) : <Loading />}
            </div>
        </>
    )
}

export default TrackPage;