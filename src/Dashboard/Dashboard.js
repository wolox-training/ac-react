import React, {Component} from 'react';
import Filter from '../Filter/Filter'
import Search from '../Search/Search'
import Spinner from '../Spinner/Spinner'
import Book from '../Book/Book'
/*import data from '../data.json';*/
import axios from 'axios'

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {booksMain: {}, criterio: '', status: false, loading: true}
    }

    componentWillMount() {
        let token = localStorage.getItem('token');
        let self = this;
        axios.get(
            'https://wbooks-api-stage.herokuapp.com/api/v1/books', {
                headers: {
                    Authorization: token
                }

            }
        )
            .then(function (response) {
                self.setState({
                    booksMain: response.data,
                    loading: false
                })
            })
            .catch(function (error) {
                self.setState({
                    loading: false
                })
            });
    }

    redirect(url) {
        window.location.href = "/bookDetail/" + url
    }

    filter(e) {
        this.setState({filter: e.target.value})
    }

    changeFilter(e) {
        this.setState({criterio: e.target.value});
        e.target.value
            ? this.setState({status: true})
            : this.setState({status: false})
    }

    render() {
        let booksMain = this.state.booksMain;
        let inputStatus = this.state.status;
        debugger;
        if (this.state.filter) {
            booksMain = booksMain.filter(book =>
                this.state.criterio === 'byTitle' ?
                    book.title.toLowerCase().includes(this.state.filter.toLowerCase()) :
                    book.author.toLowerCase().includes(this.state.filter.toLowerCase())
            )
        }
        return (
            <div className='con'>
                <Spinner display={this.state.loading}/>
                <div className='container'>

                    <div className="bookHeader">
                        <Filter accion={this.changeFilter.bind(this)}/>
                        <Search filtro={this.filter.bind(this)} status={inputStatus}/>
                    </div>
                    <div className='bookBody'>
                        {
                            booksMain.length > 0
                                ? <Book books={booksMain} accion={this.redirect}/>
                                : <h3 className='noResults'>Sin resultados</h3>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {};

export default Dashboard;
