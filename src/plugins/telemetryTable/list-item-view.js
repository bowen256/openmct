import etch from 'etch';

class ListItemView {
    constructor (props, children) {
        this.props = props;
        this.destroy = props
            .openmct
            .objects
            .observe(this.props.domainObject, '*', this.onMutation.bind(this));
        etch.initialize(this);
    }
    onMutation (domainObject) {
        this.props.domainObject = domainObject;
        etch.update(this);
    }
    render () {
        return etch.dom('li', null, `${this.props.domainObject.name}`);
    }
    update (props, children) {
        return etch.update(this)
    }
}

export default ListItemView
