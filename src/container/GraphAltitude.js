
import { connect } from 'react-redux';

import GraphContainer from './GraphContainer';

const mapStateToProps = state => ({
    val_list:state.flightData.record_altitude,
    val_list2:state.flightData.record_ground,
    flag:state.flightData.flagrpos
  });

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer)