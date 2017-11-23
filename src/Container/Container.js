import React, {Component} from 'react';
import Navbar from '../Navbar/Navbar'
import Main from '../Main/Main'


class Container extends Component {
   render() {
        return (
            <div className="containerMaster">
                <Navbar />
                <Main />
            </div>
        );
    }
}

Container.propTypes = {};

export default Container;
