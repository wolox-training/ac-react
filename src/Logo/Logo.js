import React, {Component} from 'react';
import './Logo.css'

class Logo extends Component {
    render() {
        return (
            <div className="logoContainer" style={{display: 'inline-block'}}>
                <span className="black">WB</span>
                <span className="light-blue">o</span>
                <span className="light-green">o</span>
                <span className="black">ks</span>
            </div>
        );
    }
}

Logo.propTypes = {};

export default Logo;
