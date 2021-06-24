import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { connect } from 'react-redux';

import Point from './Point';
import HLine from './HLine';
import PlaneDraw from './PlaneDraw';

function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

export default function GraphAltitude({val_list,flag,height=300,width=400,Vsubdiv=100, Hsubdiv=10,_min=2500,_max=5000,autosize=true}){
    let p=flag;
    
    let n=val_list.length;
    let min;
    let max;
  
    if (autosize){
      if (n%10==0 && n!=0){
        let pr_max=Math.max(...val_list.map(val=>(val.value)))*1.1;        
        let pr_min=Math.min(...val_list.map(val=>(val.value)))*0.9;
        Lmax[0]=pr_max+(pr_max-pr_min)/4
        Lmin[0]= pr_min-(pr_max-pr_min)/4
        
      }
      min = Lmin[0];
      max = Lmax[0];
    }
    else {
      min = _min;
      max = _max
    }
    let delta = max-min;
    let ratio = delta/height;

    return (
        <View style={{borderWidth:2,height:height+5,width:width}}>
        {[ ...Array(Hsubdiv).keys() ].map((j) => <HLine width={width} posY={j*height/Hsubdiv} max={max} min={min} height={height} key={j.toString()} />)}
 
        <PlaneDraw posX={n>0?val_list[n-1].key*width/Vsubdiv:0} posY={n>0?height+min/ratio-clamp(val_list[n-1].value,min,max)/ratio:0}/>
        {val_list.map(val=>(<Point posX={val.key*width/Vsubdiv} posY={height+min/ratio-clamp(val.value,min,max)/ratio} key={val.key.toString()} />))}
        </View>

    )

}
const Lmin=[2500];
const Lmax=[5000];


