
import LADTable from 'es6!./lad-table';

module.exports = function TelemetryTablePlugin() {
    return function install(openmct) {

        openmct.types.addType('view.latest-value-table', {
            name: 'Latest Value Table',
            key: 'view.latest-value-table',
            cssClass: '',
            creatable: true,
            initialize: function (obj) {
                obj.composition = [];
            }
        });

        openmct.objectViews.addProvider({
            name: 'my view',
            canView: function (d) {
                return d.type === 'view.latest-value-table' && 150;
            },
            view: function (domainObject) {

                var listView = new LADTable({
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


