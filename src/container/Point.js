import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

export default function Point({posX,posY}){
    return(<View style={{width:4,
        height:4,
        position:'absolute',
        borderRadius:2,
        backgroundColor:'red',
        transform:[{translateX:posX},{translateY:(5000-posY)*300/5000-2}]}}/>
    )
}