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
import { setDataConnection } from '../actions/actions';

class FormAdressContainer extends React.Component {

  constructor(props){
    super(props);
    this.navigation = props.navigation;
    this.sendForm = props.sendForm;
    this.IP_address = "localhost";
    this.num_port = "9002";
  }
    
  render() {
    return(
    <View style={styles.rootContainer}>
      <Text style={styles.briefDescription}>Give the IP adress and the numport of the targeted machine :</Text> 
      <TextInput style={styles.textInput2} placeholder="IP adress" defaultValue="localhost" onChangeText={(text)=>this.IP_address=text}/>
      <TextInput style={styles.textInput} placeholder="port number" defaultValue="9002" onChangeText={(text)=>this.num_port=text}/>

      <Button title="Validate" style={styles.rootContainer} onPress={()=>{this.sendForm(this.IP_address,this.num_port)}}/>
    </View>
    )}
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
  sendForm: (IP_ad, nump )=> dispatch(setDataConnection(IP_ad,nump))
});

export default connect(mapStateToProps, mapDispatchToProps)(FormAdressContainer);
