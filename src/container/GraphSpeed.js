
import { connect } from 'react-redux';

import GraphContainer from './GraphContainer';

const mapStateToProps = state => ({
    val_list:state.flightData.record_speed,
    flag:state.flightData.flagrref
  });

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(GraphContainer)