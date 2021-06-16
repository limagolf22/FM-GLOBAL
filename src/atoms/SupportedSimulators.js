/**
 * The complete list of supported flight simulators.
 */

import dataProviders from "./DataProviders";

const supportedSimulators = {
    FS2020: dataProviders.FS,
    XPLANE: dataProviders.XPLANE
};

export default supportedSimulators;