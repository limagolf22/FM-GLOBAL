import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

function clamp(val, min, max) {
    return val > max ? max : val < min ? min : val;
  }

export default function VLine({posX, min, max, width, height, val}){

    return (
        <View>
            <View style={{ ...vline,height:height+2,transform:[{translateX:clamp(posX,0,width)}]}}/>
            <Text style={{fontSize:10, position:'absolute',transform:[{translateX:clamp(posX+1,0,width+1)}]}}>{clamp(val,min,max).toFixed(3)}</Text>
        </View>
    )
}

const vline={
    width:1,
    position:'absolute',
    backgroundColor:'black',
}