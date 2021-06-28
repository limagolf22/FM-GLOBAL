import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Point from './Point';
import HLine from './HLine';
import PlaneDraw from './PlaneDraw';
import { connect } from 'react-redux';

function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

class GraphContainer extends React.Component {
    constructor(props){
      super(props);
      this.VMax=props._max;
      this.VMin=props._min;
      this.resolution=props.resolution;
      this.checkflag=-1,
      this.ownValList=[]
    }

    render(){
      let p=this.props.flag;
      let Vsubdiv = this.props.cycleDuration*this.props.WSfreq 
      let n=this.props.val_list.length;
      let n2 = this.props.val_list2.length;
     
        if (this.ownValList.length>=Vsubdiv){
          if(this.props.reinit){
            this.ownValList = [];
          }
          else if (this.checkflag!=p) {
            this.ownValList.shift();
          }
      }

      if (this.checkflag!=p){
        this.checkflag=p;
        this.ownValList.push(n>0?{key:this.ownValList.length,value:(this.props.val_list)[n-1]}:{key:0,value:0})
      }
      let n_own = this.ownValList.length;
      let min;
      let max;
      
    
      if (this.props.autosize){
        if (n_own%Math.max(Vsubdiv/20,1)==0 && n_own>Math.max(Vsubdiv/5,2) && n_own!=0){
          let pr_max=Math.max(...this.ownValList.map(val=>(val.value)));        
          let pr_min=Math.min(...this.ownValList.map(val=>(val.value)));
          this.VMax=pr_max+Math.max((pr_max-pr_min),this.props.resolution/2);
          this.VMin=pr_min-Math.max((pr_max-pr_min),this.props.resolution/2);
          
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
      if(Math.ceil(delta/this.resolution)<7){
        this.resolution/=2;
      }
      else if (Math.ceil(delta/this.resolution)>15){
        this.resolution*=2;
      }
      let offset = min%(this.resolution)
      return (
          <View style={{borderWidth:2,height:this.props.height+5,width:this.props.width}}>
          {/*[ ...Array(this.props.Hsubdiv).keys() ].map((j) => <HLine width={this.props.width} posY={j*this.props.height/this.props.Hsubdiv} max={max} min={min} height={this.props.height} key={j.toString()} />)*/}
          {[ ...Array(Math.ceil(delta/this.resolution)).keys() ].map((j) => <HLine width={this.props.width} posY={this.props.height+min/ratio-clamp(min+(j+1)*this.resolution-offset,min-offset+this.resolution,max-max%this.resolution)/ratio} max={max} min={min} height={this.props.height} key={j.toString()} />)}
          {this.props.Isplane?<PlaneDraw posX={n_own>0?(this.ownValList)[n_own-1].key*this.props.width/Vsubdiv:0} posY={n_own>0?this.props.height+min/ratio-clamp((this.ownValList)[n_own-1].value,min,max)/ratio:0}/>:null}
          {[...Array(n_own).keys() ].map((val)=>(<Point posX={val*this.props.width/Vsubdiv} posY={this.props.height+min/ratio-clamp(this.ownValList[val].value,min,max)/ratio} key={val.toString()} />))}
          {[...Array(n2).keys() ].map((val)=>(<Point posX={val*this.props.width/Vsubdiv} posY={this.props.height+min/ratio-clamp(this.props.val_list2[val],min,max)/ratio} key={val.toString()} color={'brown'} />))}

          </View>

      )
    }
}

GraphContainer.defaultProps = {
  width:400,
  height:300,
  autosize:true,
  _min:2500,
  _max:5000,
  Isplane:true,
  WSfreq: 2,
  cycleDuration:10,
  reinit: false,
  val_list2:[]
};

const mapStateToProps = state => ({
  WSfreq: state.dataProvider.configurations.frequency
});

const mapDispatchToProps = dispatch => ({
 
});

export default connect(mapStateToProps,mapDispatchToProps)(GraphContainer);