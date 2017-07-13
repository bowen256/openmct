import etch from 'etch';

class MyListView {
    constructor (domainObject) {
        this.domainObject = domainObject;
        etch.initialize(this);
    }
    render () {
        return etch.dom('div', {}, `Viewing: ${this.domainObject.name}`);
    }
    show (container) {
        etch.update(this);
        container.appendChild(this.element)
    }
    destroy(container) {
        container.removeChild(this.element);
        etch.destroy(this);
    }
}

module.exports = function TelemetryTablePlugin() {
    return function install(openmct) {
        console.log('installed!');
        console.log(etch);

        openmct.objectViews.addProvider({
            name: 'my view',
            canView: function (d) {
                return d.type === 'folder' && 150;
            },
            view: function (domainObject) {
                return new MyListView(domainObject);
            }
        });
    };
};


