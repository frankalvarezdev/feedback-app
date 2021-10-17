// import Icon from "components/utils/Icon";
import { useParams } from "react-router-dom";
import Loading from 'components/utils/Loading';
import { supabase } from "lib/supabase";
import { useEffect, useState } from 'react';

const TrackPage = () => {

    let { id } = useParams();

    const [track, setTrack] = useState();

    useEffect(() => {
        // obtiene datos del track
        const getData = async () => {
            try {
                let { data, error, status } = await supabase.from('tracks').select().match({ id: id }).single();

                if (error && status !== 406) throw error;

                setTrack(data);
            } catch (error) {
                alert(error.message)
            }
        }

        getData();
    }, [id])

    return (
        <div className="container padding-top">
            {track ? (
                <>
                    <h3>
                        {track.title}
                    </h3>
                </>
            ) : <Loading />}
        </div>
    )
}

export default TrackPage;