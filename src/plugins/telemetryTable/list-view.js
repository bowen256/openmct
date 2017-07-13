import etch from 'etch';

import ListItemView from 'es6!./list-item-view';

class ListView {
    constructor (properties, children) {
        this.props = properties;
        this.props.children = this.props.children || [];
        this.composition = this.props
            .openmct
            .composition
            .get(this.props.domainObject);
        this.composition.on('add', this.addChild, this);
        this.composition.on('remove', this.removeChild, this);
        etch.initialize(this);
        this.composition.load();
    }
    render () {
        return etch.dom('div', {},
            etch.dom('h1', null, `Viewing: ${this.props.domainObject.name}`),
            etch.dom('ul', null,
                this.props.children.map((c) => etch.dom(ListItemView, {
                    domainObject: c,
                    key: c.identifier,
                    openmct: this.props.openmct
                }))
            )
        );
    }
    destroy () {
        this.composition.off('add', this.addChild, this);
        this.composition.off('remove', this.removeChild, this);
        delete this.composition;
        etch.destroy(this);
    }
    addChild (child) {
        this.props.children.push(child);
        etch.update(this);
    }
    removeChild (cid) {
        this.props.children = this.props.children.filter(function (c) {
            return !(c.identifier.key === cid.key && c.identifier.namespace === cid.namespace)
        });
        etch.update(this);
    }
    update (props, children) {
        this.domainObject = properties.domainObject;
        this.children = properties.children || [];
        return etch.update(this)
    }
}

export default ListView
