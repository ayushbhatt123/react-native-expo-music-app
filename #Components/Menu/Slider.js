import React, { useRef } from "react";

import { Slider } from "./Menu_Style";
import { Image } from 'react-native-elements';
import { ActivityIndicator } from "react-native"; 
import { Width, Height } from "../../Global_Values/Global_Variables";

import { MenuData } from "./MenuData";
import { PLAY } from "../../Redux/Types/Types";

import { useDispatch } from 'react-redux';
import Carousel from 'react-native-snap-carousel';

const Sliders = () => {
    
    const refs = useRef(null);

    const dispatch = useDispatch();

    const handelPress = (val) => {
        dispatch({
            type: PLAY,
            payload: {...val, type: "SERVER"}
        });
    };

    const renderItem = ({item}) => {
        return (
            <Image 
                source={{ uri: item.artwork }}
                PlaceholderContent={<ActivityIndicator />}
                style={{ width: Width*0.75, height: Height*0.25, borderRadius: 15 }}
                onPress={() => handelPress(item)}
                blurRadius={0}
            />
        );
    };
    
    return (
        <Slider>
            <Carousel
                layout={"default"}
                ref={refs}
                data={MenuData}
                sliderWidth={Width}
                itemWidth={Width*0.75}
                renderItem={renderItem}
                autoplay={true}
                enableMomentum={false}
                lockScrollWhileSnapping={true}
                loop={true}
                enableSnap ={true}
            />
        </Slider>
    );
};

export default Sliders;