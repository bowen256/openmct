import etch from 'etch';

const d = etch.dom;

module.exports = function TelemetryTablePlugin() {
    return function install(openmct) {

        class ListItemView {
            constructor (props, children) {
                this.props = props;
                this.destroy = openmct.objects.observe(this.props.domainObject, '*', this.onMutation.bind(this));
                etch.initialize(this);
            }
            onMutation (domainObject) {
                this.props.domainObject = domainObject;
                etch.update(this);
            }
            render () {
                return d('li', null, `${this.props.domainObject.name}`);
            }
            update (props, children) {
                return etch.update(this)
            }
        }

        class ListView {
            constructor (properties, children) {
                this.props = properties;
                this.props.children = this.props.children || [];
                this.composition = openmct.composition.get(this.props.domainObject);
                this.composition.on('add', this.addChild, this);
                this.composition.on('remove', this.removeChild, this);
                etch.initialize(this);
                this.composition.load();
            }
            render () {
                return etch.dom('div', {},
                    d('h1', null, `Viewing: ${this.props.domainObject.name}`),
                    d('ul', null,
                        this.props.children.map((c) => d(ListItemView, {domainObject: c}))
                    )
                );
            }
            destroy () {
                this.composition.off('add', this.addChild, this);
                this.composition.off('remove', this.removeChild, this);
                delete this.composition;
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

        openmct.objectViews.addProvider({
            name: 'my view',
            canView: function (d) {
                return d.type === 'folder' && 150;
            },
            view: function (domainObject) {

                var listView = new ListView({domainObject: domainObject});

                return {
                    show: function (container) {
                        container.appendChild(listView.element);
                    },
                    destroy: function (container) {
                        etch.destroy(listView);
                    }
                };
            }
        });
    };
};


