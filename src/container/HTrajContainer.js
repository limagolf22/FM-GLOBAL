import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import Point from './Point';
import HLine from './HLine';
import VLine from './VLine';
import { connect } from 'react-redux';
import PlaneDrawH from './PlaneDrawH';
import { color } from 'react-native-reanimated';

function clamp(val, min, max) {
  return val > max ? max : val < min ? min : val;
}

export default class HTrajContainer extends React.Component {
    constructor(props){
      super(props);
      this.XMax=props.x_max;
      this.XMin=props.x_min;
      this.YMax=props.y_max;
      this.YMin=props.y_min;
      this.resolutionX=props.resolutionX;
      this.resolutionY=props.resolutionY;
      this.checkflag=-1;
      this.ownValList=[]
      this.PosInit={lat:props.val_listY[0],lon:props.val_listX[0]};
    }

    render(){
      let p=this.props.flag;
      let n=this.props.val_listX.length;
    
      if (this.ownValList.length>=this.props.Pmax){
        if(this.props.reinit){
          this.ownValList = [];
        }
        else if (this.checkflag!=p) {
          this.ownValList.shift();
        }
      }

      if (this.checkflag!=p){
        this.checkflag=p;
        this.ownValList.push(n>0?{key:this.ownValList.length,valueX:((this.props.val_listX)[n-1]-this.PosInit.lon)*60*Math.cos((this.props.val_listY)[n-1]*Math.PI/180),valueY:((this.props.val_listY)[n-1]-this.PosInit.lat)*60}:{key:0,valueX:0,ValueY:0})
      }
      let n_own = this.ownValList.length;
      let minX;
      let maxX;
      let minY;
      let maxY;
      
    
      if (this.props.autosize){
        if (n_own%Math.max(this.props.Pmax/20,1)==0 && n_own>Math.max(this.props.Pmax/5,2) && n_own!=0){
          let pr_maxX=Math.max(...this.ownValList.map(val=>(val.valueX)));        
          let pr_minX=Math.min(...this.ownValList.map(val=>(val.valueX)));
          let pr_maxY=Math.max(...this.ownValList.map(val=>(val.valueY)));        
          let pr_minY=Math.min(...this.ownValList.map(val=>(val.valueY)));
          this.XMax=pr_maxX+Math.max((pr_maxX-pr_minX),this.props.resolutionX/2);
          this.XMin=pr_minX-Math.max((pr_maxX-pr_minX),this.props.resolutionX/2);
          this.YMax=pr_maxY+Math.max((pr_maxY-pr_minY),this.props.resolutionY/2);
          this.YMin=pr_minY-Math.max((pr_maxY-pr_minY),this.props.resolutionY/2);
          
        }
        minX = this.XMin;
        maxX = this.XMax;
        minY = this.YMin;
        maxY = this.YMax;
      }
      else {
        minX = this.props.x_min;
        maxX = this.props.x_max;
        minY = this.props.y_min;
        maxY = this.props.y_max;        
      }
      let deltaX = maxX-minX;
      let deltaY = maxY-minY;
      let ratioX = deltaX/this.props.width;
      let ratioY = deltaY/this.props.height;
      if(Math.ceil(deltaX/this.resolutionX)<7){
        this.resolutionX/=2;
      }
      else if (Math.ceil(deltaX/this.resolutionX)>15){
        this.resolutionX*=2;
      }
      if(Math.ceil(deltaY/this.resolutionY)<7){
        this.resolutionY/=2;
      }
      else if (Math.ceil(deltaY/this.resolutionY)>15){
        this.resolutionY*=2;
      }
      let offsetX = (minX)%(this.resolutionX);
      let offsetY =(minY)%(this.resolutionY);
      return (
          <View style={{borderWidth:2,height:this.props.height+5,width:this.props.width+4}}>
          {/*[ ...Array(this.props.Hsubdiv).keys() ].map((j) => <HLine width={this.props.width} posY={j*this.props.height/this.props.Hsubdiv} max={max} min={min} height={this.props.height} key={j.toString()} />)*/}
          {[ ...Array(Math.ceil(deltaY/this.resolutionY)).keys() ].map((j) => <HLine width={this.props.width} posY={this.props.height+minY/ratioY-(minY-offsetY+(j)*this.resolutionY)/ratioY} max={maxY} min={minY} height={this.props.height} val={minY-offsetY+(j)*this.resolutionY} key={j.toString()} />)}
          {[ ...Array(Math.ceil(deltaX/this.resolutionX)).keys() ].map((j) => <VLine width={this.props.width} posX={-minX/ratioX+(minX-offsetX+(j)*this.resolutionX)/ratioX} max={maxX} min={minX} height={this.props.height} val={minX-offsetX+(j)*this.resolutionX} key={j.toString()} />)}
          {this.props.Isplane?<PlaneDrawH posX={n_own>0?-minX/ratioX+clamp(this.ownValList[n_own-1].valueX,minX,maxX)/ratioX:0} posY={n_own>0?this.props.height+minY/ratioY-clamp((this.ownValList)[n_own-1].valueY,minY,maxY)/ratioY:0} heading={this.props.heading}/>:null}
          {[...Array(n_own).keys() ].map((val)=>(<Point posX={-minX/ratioX+clamp(this.ownValList[val].valueX,minX,maxX)/ratioX} posY={this.props.height+minY/ratioY-clamp(this.ownValList[val].valueY,minY,maxY)/ratioY} key={val.toString()} />))}
          {[...Array(10).keys() ].map((k)=>(<Point posX={n_own>10?-minX/ratioX+clamp(this.ownValList[n_own-1].valueX+k*10/8*(this.ownValList[n_own-1].valueX-this.ownValList[n_own-8].valueX),minX,maxX)/ratioX:0} posY={n_own>10?this.props.height+minY/ratioY-clamp(this.ownValList[n_own-1].valueY+k*10/8*(this.ownValList[n_own-1].valueY-this.ownValList[n_own-8].valueY),minY,maxY)/ratioY:0} key={k.toString()} color={'green'} />))}

          </View>
      )
    }
}

HTrajContainer.defaultProps = {
  width:400,
  height:400,
  autosize:true,
  x_min:-10,
  x_max:10,
  y_min:-10,
  y_max:10,
  Isplane:true,
  Pmax:200,
  reinit: false,
  resolutionX:1,
  resolutionY:1,
  heading:0.0
};
