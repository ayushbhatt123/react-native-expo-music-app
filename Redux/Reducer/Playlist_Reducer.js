import { CREATE_PLAYLIST, FETCH_PLAYLIST, DELETE_PLAYLIST } from "../Types/Types";

const PlaylistReducer = (state = [], action) => {
    switch(action.type) {

        case FETCH_PLAYLIST:
            return action.payload[0].data;
            
        case CREATE_PLAYLIST :
            var lastItem, data;
            if(state.length !== 0) {
                lastItem = state.slice(-1)[0];
                data = {...action.payload, idx:lastItem.idx+1, _id: lastItem.idx+1, oldIdx: action.payload.idx}
            } else 
                data = {...action.payload, idx:999, _id: 999, oldIdx: action.payload.idx}

            return [...state, data];

        case DELETE_PLAYLIST : 
            return state.filter(arr => arr.oldIdx !== action.payload.oldIdx);

        default: return state;
    }
};

export default PlaylistReducer;