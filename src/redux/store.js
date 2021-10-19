import { createStore } from 'redux';
import { ADD_SESSION, SET_GLOBAL_IFRAME, SET_IFRAME_POSITION, SET_TRACKS } from './actions';

const initialStore = {
    tracks: { error: false, data: false },
    session: null,
    iframe: { url: null },
    iframePosition: 1
}

const rootReducer = (state = initialStore, action) => {
    switch (action.type) {
        case SET_TRACKS:
            return { ...state, tracks: action.data };
        case ADD_SESSION:
            return { ...state, session: action.data };
        case SET_GLOBAL_IFRAME:
            return { ...state, iframe: action.data };
        case SET_IFRAME_POSITION:
            return { ...state, iframePosition: action.position };
        default:
            return state;
    }
}

let store = createStore(rootReducer);

export { store };