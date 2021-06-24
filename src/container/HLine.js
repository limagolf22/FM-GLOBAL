import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

export default function HLine({posY, min, max, width, height}){

    return (
        <View>
            <View style={{ ...hline,width:width-2,transform:[{translateY:posY}]}}/>
            <Text style={{fontSize:10, position:'absolute',transform:[{translateY:posY}]}}>{(max-posY*(max-min)/height).toFixed(1)}</Text>
        </View>
    )
}

const hline={
    height:1,
    position:'absolute',
    backgroundColor:'black',
}