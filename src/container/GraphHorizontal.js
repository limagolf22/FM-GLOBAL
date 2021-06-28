
import { connect } from 'react-redux';

import HTrajContainer from './HTrajContainer';

const mapStateToProps = state => ({
    val_listX:state.flightData.record_longitude,
    val_listY:state.flightData.record_latitude,
    flag:state.flightData.flagpos,
    heading:state.flightData.heading
  });

const mapDispatchToProps = dispatch => ({
});
  
export default connect(mapStateToProps, mapDispatchToProps)(HTrajContainer)