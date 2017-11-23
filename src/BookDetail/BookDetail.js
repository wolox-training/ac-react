import React, {Component} from 'react';
import Suggestion from '../Suggestion/Suggestion'
import Comments from '../Comments/Comments'
import Spinner from '../Spinner/Spinner'
import axios from 'axios'

import './BookDetail.css'

class BookDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected:'',
            loading:true
        }
    }

    componentWillMount() {

        let token = localStorage.getItem('token');
        let self = this;
        axios.get(
            'https://wbooks-api-stage.herokuapp.com/api/v1/books/'+self.props.match.params.id, {
                headers: {
                    Authorization: token
                }

            }
        )
            .then(function (response) {
                debugger;
                self.setState({
                    selected:   response.data,
                    loading:false
                })
            })
            .catch(function (error) {
                self.setState({
                    loading: false
                })
            });
    }
    render() {
        debugger;
        let selected = this.state.selected;
        return (
            <div>
                <div className="breadcum">
                    <label>
                        <a href="/dashboard">&lt; Volver</a>
                    </label>
                </div>

                <Spinner display={this.state.loading}/>
                <div className='detailContainer'>

                    <div className="detail">
                        <div className="imgZone">

                            <img src={selected.image_url} className="imgZone image"
                                 alt={selected.title + " " + selected.author}/>
                        </div>
                        <div className="dataZone">
                            <h3 className="title">{selected.title}</h3>
                            <h5 className="subData">{selected.author}</h5>
                            <h5 className="subData">{selected.year}</h5>
                            <h5 className="subData tematica">Tematica</h5>
                            <h5 className="resume">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
                                quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                                consequat.</h5>
                            <button className='rent-button'>
                                <label>Alquilar</label>
                            </button>
                        </div>
                    </div>
                    <div className="separator"></div>
                    <Suggestion/>
                    <div className="separator"></div>
                    <Comments/>
                </div>

            </div>
        );
    }
}

BookDetail.propTypes = {};

export default BookDetail;
