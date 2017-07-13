
import ListView from 'es6!./list-view';

module.exports = function TelemetryTablePlugin() {
    return function install(openmct) {



        openmct.objectViews.addProvider({
            name: 'my view',
            canView: function (d) {
                return d.type === 'folder' && 150;
            },
            view: function (domainObject) {

                var listView = new ListView({
                    domainObject: domainObject,
                    openmct: openmct
                });

                return {
                    show: function (container) {
                        container.appendChild(listView.element);
                    },
                    destroy: function (container) {
                        listView.destroy();
                    }
                };
            }
        });
    };
};


