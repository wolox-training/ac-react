import React, {Component} from 'react';
import './Search.css'

class Search extends Component {
    render() {
        return (
            <div className='search'>
                <input className='searchInput'
                       disabled={!this.props.status}
                       onChange={this.props.filtro}
                       value={this.props.filterValue}
                       placeholder='Buscar...' type="text"/>
                <button className='searchButton'>
                    <i className="fa fa-search"></i>
                </button>
            </div>
        );
    }
}

Search.propTypes = {};

export default Search;
