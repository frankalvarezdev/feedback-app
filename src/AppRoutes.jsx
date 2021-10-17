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

const Routes = () => {

    const dispatch = useDispatch();

    
    useEffect(() => {
        const getData = async () => {
            const data = await getTracks();
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
            <Route path="/account">
                <Account />
            </Route>
            <Route path="/">
                <Explore />
            </Route>
        </Switch>
    )
}

export default Routes;