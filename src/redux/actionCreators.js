import { ADD_SESSION, SET_GLOBAL_IFRAME, SET_IFRAME_POSITION, SET_TRACKS } from "./actions";

const setTracksAction = (data) => ({ type: SET_TRACKS, data });
const setGlobalIframeAction = (data) => ({ type: SET_GLOBAL_IFRAME, data });
const setIframePositionAction = (position) => ({ type: SET_IFRAME_POSITION, position });
const addSessionAction = (data) => ({ type: ADD_SESSION, data });

export { setTracksAction, addSessionAction, setGlobalIframeAction, setIframePositionAction }