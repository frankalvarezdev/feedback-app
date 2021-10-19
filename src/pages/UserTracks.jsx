import Loading from "components/utils/Loading";
import Track from 'components/track/Track';
import { supabase } from "lib/supabase";
import { useEffect, useState } from "react";
import { checkListenedTracks } from "lib/clientDb";

const UserTracks = () => {

    const [userTracks, setUserTracks] = useState();

    useEffect(() => {
        const getData = async () => {
            const user = supabase.auth.user();

            const { data } = await supabase
                .from('tracks')
                .select()
                .match({ user_id: user.id })

            // marca listened a los tracks que ya fueron escuchados
            const tracks = await checkListenedTracks({ data });

            setUserTracks(tracks.data)
        }
        getData();
    }, [])
    return (
        <div className="container padding-top">
            {userTracks ? userTracks.length > 0 ? (
                <div className="grid:2 gap">
                    {userTracks.map((track, trackIndex) => (
                        <Track key={trackIndex} {...track} />
                    ))}
                </div>
            ) : <div className='text-opacity:1 text-align:center'>Aun no has enviado nada</div> : <Loading />}
        </div>
    )
}

export default UserTracks;