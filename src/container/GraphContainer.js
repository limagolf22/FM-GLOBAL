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

export default class GraphContainer extends React.Component {
    constructor(props){
      super(props);
      this.VMax=props._max;
      this.VMin=props._min;
    }

    render(){
      let p=this.props.flag;
      
      let n=this.props.val_list.length;
      let min;
      let max;
    
      if (this.props.autosize){
        if (n%10==0 && n>20 && n!=0){
          let pr_max=Math.max(...this.props.val_list.map(val=>(val.value)));        
          let pr_min=Math.min(...this.props.val_list.map(val=>(val.value)));
          this.VMax=pr_max+(pr_max-pr_min)+this.props.resolution*this.props.Hsubdiv;
          this.VMin=pr_min-(pr_max-pr_min)-this.props.resolution*this.props.Hsubdiv;
          
        }
        min = this.VMin;
        max = this.VMax;
      }
      else {
        min = this.props._min;
        max = this.props._max
      }
      let delta = max-min;
      let ratio = delta/this.props.height;
      return (
          <View style={{borderWidth:2,height:this.props.height+5,width:this.props.width}}>
          {[ ...Array(this.props.Hsubdiv).keys() ].map((j) => <HLine width={this.props.width} posY={j*this.props.height/this.props.Hsubdiv} max={max} min={min} height={this.props.height} key={j.toString()} />)}
  
          <PlaneDraw posX={n>0?(this.props.val_list)[n-1].key*this.props.width/this.props.Vsubdiv:0} posY={n>0?this.props.height+min/ratio-clamp((this.props.val_list)[n-1].value,min,max)/ratio:0}/>
          {this.props.val_list.map(val=>(<Point posX={val.key*this.props.width/this.props.Vsubdiv} posY={this.props.height+min/ratio-clamp(val.value,min,max)/ratio} key={val.key.toString()} />))}
          </View>

      )
    }
}
const Lmin=[2500];
const Lmax=[5000];


