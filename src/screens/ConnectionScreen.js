import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button
} from 'react-native';
import ScreenBrief from '../components/ScreenBrief';

import {connect} from 'react-redux';
import { setUserData } from '../actions/actions';

class ConnectionScreen extends React.Component {

  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.sendForm = props.sendForm;
    this.username = "";
  }
    
  render() {
    return(
    <View style={styles.rootContainer}>
      <ScreenBrief
        briefTitle="Connection"
        briefDescription="Welcome to the FlightManeuvers App !"
        callToAction="First of all, insert your username :"
      />
      <TextInput style={styles.textInput} placeholder="username" onChangeText={(text)=>this.username=text}/>
      <Button title="Validate" style={styles.rootContainer} onPress={()=>{this.sendForm(this.username);this.navigateToBriefingRoom();}}/>
    </View>

    )}
  
    navigateToBriefingRoom() {
      this.navigation.navigate('BriefingRoom');
    }

}



const styles = StyleSheet.create({
    rootContainer: {
      padding: 20,
      borderRadius:7
    },
    textInput: {
      height:40,
      margin: 12,
      padding:5,
      borderWidth: 2,
      borderRadius:7
    },
    textInput2: {
      height:40,
      marginHorizontal: 12,
      marginTop: 12,
      marginBottom:1,
      padding:5,
      borderWidth: 2,
      borderRadius:7
    },
    maneuverListContainer: {
      paddingTop: 20,
    },
  });

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  sendForm: (username)=> dispatch(setUserData(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionScreen);
