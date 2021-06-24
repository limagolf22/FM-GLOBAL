
import { connect } from 'react-redux';

import GraphContainer from './GraphContainer';

const mapStateToProps = state => ({
    val_list:state.flightData.record_altitude,
    flag:state.flightData.flagrpos
  });

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer)