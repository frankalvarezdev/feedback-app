import Icon from "components/utils/Icon";
import { useSelector, useDispatch } from "react-redux";
import { setGlobalIframeAction } from "redux/actionCreators";
// import { useEffect } from "react";
import { Link } from "react-router-dom";

const TrackIframe = () => {

    // datos del store
    const iframe = useSelector(store => store.iframe);
    const position = useSelector(store => store.iframePosition);

    const dispatch = useDispatch();

    // elima la url del iframe para cerrar el widget
    const closeGlobalIframe = () => dispatch(setGlobalIframeAction({url: null}));

    return (
        <>
            {iframe.url && (
                <div className={'global-iframe ' + (position === 1 ? 'global-iframe-top' : 'global-iframe-bottom')}>
                    <div className='close-button' onClick={closeGlobalIframe}>
                        <Icon icon='cancel' /> Cerrar
                    </div>
                    <Link className='itemclass' to={`/track/${iframe.id}`}/>
                    <iframe scrolling="no" frameBorder="0" src={iframe.url} title='Embed player'></iframe>
                </div>
            )}
        </>
    )

}

export default TrackIframe;