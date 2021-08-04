import { LIKES } from "../Types/Types";

const LikeReducer = (state = [], action) => {
    switch(action.type) {

        case LIKES:
            return [...state, action.payload];
        
        default: return state;
    }
};

export default LikeReducer;