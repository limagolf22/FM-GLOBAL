import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

export default function HLine({posY}){

    return (
        <View>
            <View style={{ ...hline,transform:[{translateY:posY}]}}/>
            <Text style={{fontSize:10, position:'absolute',transform:[{translateY:posY}]}}>{5000-posY*5000/300}</Text>
        </View>
    )
}

const hline={
    width:398,
    height:1,
    position:'absolute',
    backgroundColor:'black',
}