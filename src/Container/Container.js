import React, {Component} from 'react';
import data from '../data.json';
import Book from '../Book/Book';
import Filter from '../Filter/Filter';
import Search from '../Search/Search';


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {booksMain: {}, criterio: '', status: false}
    }

    filter(e) {
        this.setState({filter: e.target.value})
    }

    changeFilter(e) {
        this.setState({criterio: e.target.value})
        if (e.target.value) {
            this.setState({status: true})
        } else {
            this.setState({status: false})
        }
    }

    render() {
        let booksMain = data;
        let inputStatus = this.state.status;
        console.log(this.state.criterio)
        if (this.state.filter) {
            booksMain = booksMain.filter(book =>
                this.state.criterio == 'byTitle' ?
                    book.title.toLowerCase().includes(this.state.filter.toLowerCase()) :
                    book.author.toLowerCase().includes(this.state.filter.toLowerCase())
            )
        }
        return (
            <div className='container'>
                <div className="bookHeader">
                    <Filter accion={this.changeFilter.bind(this)}/>
                    <Search filtro={this.filter.bind(this)} status={inputStatus}/>
                </div>
                <div className='bookBody'>
                    {booksMain.length > 0 ? <Book books={booksMain}/> : <h3 className='noResults'>Sin resultados</h3>}

                </div>
            </div>
        );
    }
}

Container.propTypes = {};

export default Container;
