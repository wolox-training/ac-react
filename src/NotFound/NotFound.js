import React, {Component} from 'react';
import './NotFound.css';

class NotFound extends Component {

    render() {
        return (
            <div className="notFound">
                <div className="breadcum">
                    <label>
                        <a href="/dashboard">&lt; Volver</a>
                    </label>
                </div>
                <img className="image shadow" src={require('../Assets/404.png')} alt=""/>
            </div>
        );
    }
}

NotFound.propTypes = {};

export default NotFound;
