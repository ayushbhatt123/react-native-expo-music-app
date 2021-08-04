import { PLAY } from "../Types/Types";

const PlayReducer = (state=[], action) => {
    switch(action.type) {

        case PLAY:
            return action.payload;

        default: return state;
    }
};

export default PlayReducer;