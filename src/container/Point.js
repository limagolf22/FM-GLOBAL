import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Point({posX,posY,color='red'}){
    return(<View style={{width:4,
        height:4,
        position:'absolute',
        borderRadius:2,
        backgroundColor:color,
        transform:[{translateX:posX},{translateY:posY}]}}/>
    )
}