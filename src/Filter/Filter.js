import React, {Component} from 'react';
import './Filter.css';

class Filter extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <select className='filter' onChange={this.props.accion}>
                <option value="">Seleccionar filtro</option>
                <option value="byAuthor">Por Autor</option>
                <option value="byTitle">Por Titulo</option>
            </select>
        );
    }
}

Filter.propTypes = {};
export default Filter;
