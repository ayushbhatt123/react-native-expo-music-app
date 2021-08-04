import { FETCH_ALL } from "../Types/Types";

const MusicsReducer = (state = [], action) => {
    switch(action.type) {

        case FETCH_ALL:
            return action.payload;
        
        default: return state;
    }
};

export default MusicsReducer;