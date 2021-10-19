import {
    Switch,
    Route
} from "react-router-dom";
import TrackWidget from 'pages/TrackPage'
import Account from 'pages/Account';
import Explore from 'pages/Explore';
import { setTracksAction } from 'redux/actionCreators';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import { getTracks } from 'lib/api';
import { supabase } from "lib/supabase";
import { checkListenedTracks } from "lib/clientDb";
import UserTracks from "pages/UserTracks";

const Routes = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        // obtiene los datos de los tracks
        const getData = async () => {
            let data = await getTracks();
            
            data = await checkListenedTracks(data);

            dispatch(setTracksAction(data));
        }

        getData();

        // realtime tracks
        supabase.from('tracks').on('*', () => getData()).subscribe();

    }, [dispatch])

    return (
        <Switch>
            <Route path="/track/:id">
                <TrackWidget />
            </Route>
            <Route path="/user/tracks">
                <UserTracks />
            </Route>
            <Route path="/user">
                <Account />
            </Route>
            <Route path="/">
                <Explore />
            </Route>
        </Switch>
    )
}

export default Routes;