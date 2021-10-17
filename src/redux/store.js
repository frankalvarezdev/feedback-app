import { createStore } from 'redux';
import { ADD_SESSION, SET_TRACKS } from './actions';

const initialStore = {
    tracks: { error: false, data: [] },
    session: null
}

const rootReducer = (state = initialStore, action) => {
    switch (action.type) {
        case SET_TRACKS:
            return {...state, tracks: action.data};
        case ADD_SESSION:
            return { ...state, session: action.data };
        default:
            return state;
    }
}

let store = createStore(rootReducer);

export { store };