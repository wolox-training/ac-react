import React, {Component} from 'react';
import './Alert.css'

class Alert extends Component {

    render() {
        let alert = this.props.display ?
            (
                <div className="alertOverlay animated bounceInDown ">
                    <div className="alertContainer ">
                        <div className="alertBody">
                            <i className={ 'fa ' + this.props.icon + ' alertIcon'}
                            style={{color : this.props.color}}></i>
                            <h3 className='alertTitle'>{this.props.titulo}</h3>
                            <span className="alertSpan">{this.props.texto}</span>
                        </div>
                        <div className="alertButtons" onClick={this.props.toClose} style={{backgroundColor : this.props.color}}>
                            <h3>Aceptar</h3>
                        </div>
                    </div>
                </div>
            ) : ''

        return alert
    }
}

Alert.propTypes = {};

export default Alert;
