import etch from 'etch';

module.exports = function TelemetryTablePlugin() {
    return function install(openmct) {
        console.log('installed!');
        console.log(etch);
    };
};


