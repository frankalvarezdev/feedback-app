import { ADD_SESSION, SET_TRACKS } from "./actions";

const setTracksAction = (data) => ({ type: SET_TRACKS, data });
const addSessionAction = (data) => ({ type: ADD_SESSION, data });

export { setTracksAction, addSessionAction }