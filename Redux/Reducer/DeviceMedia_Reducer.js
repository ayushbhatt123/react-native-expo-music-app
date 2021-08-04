import { DEVICE_MEDIA } from "../Types/Types";

const DeviceMediaReducer = (state = [], action) => {
    switch(action.type) {

        case DEVICE_MEDIA:
            return action.payload;

        default: return state;
    }
};

export default DeviceMediaReducer;