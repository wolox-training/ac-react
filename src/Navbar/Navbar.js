import React, {Component} from 'react';
import './Navbar.css'

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {showMenu:false};

    }

    logout() {
        localStorage.clear();
        window.location.href = "/login"
    }


    render() {
        let options = this.state.showMenu ? (<div className="menus">
            <div className="arrow-up"></div>
            <div className="menuItem">Perfil</div>
            <div className="menuItem" onClick={this.logout}>Cerrar sesiòn</div>
        </div>) : '';
        let logoutButton = localStorage.getItem('datos') ?
            (<div>

                    <div className='optionArea'>

                        <img src={require('../Assets/notifications.png')}
                             className='button  icon '
                             alt=""/>
                        <img src={require('../Assets/add_book.svg')}
                             className='button  icon '
                             alt=""/>
                        <img src={require('../Assets/avatar-medium.png')}
                             className='exitButton  icon shadow'
                             onClick={() => this.setState({showMenu: !this.state.showMenu})}
                             alt=""/>
                        <br/>
                        {options}
                    </div>
                </div>

            ) : ''
        return (
            <div className="header">
                <img className="image" onClick={e => {
                    e.preventDefault();
                    window.location.href = '/login'
                }}
                     src={require('../Assets/logo.png')} alt=""/>
                <div className="logo" onClick={e => {
                    e.preventDefault();
                    window.location.href = '/login'
                }}>
                    <span className="black">WB</span>
                    <span className="light-blue">o</span>
                    <span className="light-green">o</span>
                    <span className="black">ks</span>
                </div>
                {logoutButton}
            </div>
        );
    }
}

export default Navbar;
