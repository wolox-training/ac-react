import React, {Component} from 'react';
import Logo from '../Logo/Logo'
import Spinner from '../Spinner/Spinner'
import Alert from '../Alert/Alert'
import axios from 'axios'
import './Login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            pass: '',
            emailError: false,
            emailErrorText: '',
            passError: false,
            passErrorText: '',
            error: true,
            loading: false,
            popUp: false,
            alertMsg: '',
            alertTitle: '',
            alertIcon: '',
            alertColor: '',
            redirect: false
        }
    }

    activateLoading(state) {
        this.setState({
            loading: state
        })
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
        console.log(this.props.onValidate(this))


    }

    closePopUp() {

        if (this.state.redirect) {
            this.props.isLogged(true)
        } else {
            this.setState({
                popUp: false
            })
        }
    }

    onSubmit = e => {
        e.preventDefault();
        let self = this
        self.activateLoading(true);
        console.log('Esta es la respuesta a la autenticacion')
        let hasLetter = 0;
        let hasNumber = 0;
        let validPass = false;
        this.state.pass.split('').forEach(function (el) {
            if (el.match(/[a-z]/i)) {
                hasLetter = 1
            }
            if (!isNaN(parseFloat(el)) && isFinite(el)) {
                hasNumber = 1
            }
        })

        if (hasLetter === 0 && hasNumber === 1) {
            if (!this.state.error) {

                axios.post(
                    'https://wbooks-api-stage.herokuapp.com/api/v1/users/sessions', {
                        email: this.state.email, password: this.state.pass
                    }
                )
                    .then(function (response) {
                        if (response.data) {
                            localStorage.setItem('token', response.data.access_token)
                            self.setState({
                                popUp: true,
                                alertTitle: 'Bienvenido!',
                                alertMsg: 'Bienvenido a wBook, tu libreria online',
                                alertIcon: 'fa-check',
                                alertColor: '#009f70',
                                redirect: true
                            })
                        }
                        self.activateLoading(false);
                        /*self.props.isLogged(true)
 */
                    })
                    .catch(function (error) {

                        self.activateLoading(false);
                        if (error) {
                            if (error.response.status === 401) {
                                self.setState({
                                    popUp: true,
                                    alertTitle: 'Error',
                                    alertMsg: 'Nombre de Usuario o contraseña invalida',
                                    alertIcon: 'fa-exclamation-triangle',
                                    alertColor: '#ff4847',
                                    redirect: false
                                })
                                console.log("Acceso Denegado")
                            }
                            console.log(error);
                        }

                    });
            }
            else {
                alert("Datos Incorrectos")
                self.activateLoading(false);
            }
        } else {
            alert("pass incorrecta")
            self.activateLoading(false);
        }
    };

    render() {
        let self = this
        let buttonClass = this.state.error ? 'firstChild' : 'firstChild green';
        let classNames = '';
        if (this.state.loading) {
            classNames = 'loginWraper '
        } else {
            classNames = 'loginWraper'
        }
        return (

            <div>
                <div className="overlay"></div>

                <form className="login">

                    <div className="loginBox shadow">


                        <Spinner display={this.state.loading}/>
                        <Alert display={this.state.popUp}
                               titulo={this.state.alertTitle}
                               texto={this.state.alertMsg}
                               icon={this.state.alertIcon}
                               color={this.state.alertColor}
                               toClose={this.closePopUp.bind(this)}
                        />
                        <div className={classNames}>

                            <div className="loginHheader">
                                <Logo/>
                                <div className="title">
                                    <h3>Ingrese sus Credenciales</h3>
                                </div>
                            </div>
                            <div className="loginBody">
                                <div className="input-group">
                                    <label>Correo</label><br/>
                                    <input type="email"
                                           name="email"
                                           value={this.state.email}
                                           pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$"
                                           placeholder="usuario@algo.cl"
                                           required
                                           onChange={e => this.changeHandler(e)}/>
                                    {this.state.emailError ?
                                        <span className="inputError">{this.state.emailErrorText}</span> : ''}
                                </div>
                                <div className="input-group">
                                    <label>Password</label><br/>
                                    <input type="password"
                                           name="pass"
                                           value={this.state.pass}
                                           required
                                           placeholder="Ingrese su Contraseña"
                                           onChange={e => this.changeHandler(e)}/>
                                    {this.state.passError ?
                                        <span className="inputError">{this.state.passErrorText}</span> : ''}

                                </div>

                                <div className="buttons-group">
                                    <button className={buttonClass}
                                            disabled={this.state.error}
                                            onClick={(e => this.onSubmit(e))}>
                                        Ingresar
                                    </button>
                                    <button onClick={e=>{e.preventDefault(); window.location.href='/userregistration' }}> Registrar Usuario </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </div>
        );
    }
}

Login.propTypes = {};

export default Login;
