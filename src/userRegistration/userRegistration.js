import React, {Component} from 'react';
import Logo from '../Logo/Logo'
import Spinner from '../Spinner/Spinner'
import Alert from '../Alert/Alert'
import axios from 'axios'

class userRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: 'aconejeros@gmai.com',
            pass: '123123123',
            repass: '123123123',
            name: 'Angelo',
            lastName: 'Conejeros',
            nameError: '',
            nameErrorText: '',
            lastNameError: '',
            lastNameErrorText: '',
            passError: '',
            passErrorText: '',
            repassError: '',
            repassErrorText: '',
            emailError: false,
            emailErrorText: '',
            submitButton: false,
            diffEmail: false,
            loading: false,
            popUp: false,
            alertTitle: '',
            alertMsg: '',
            alertIcon: '',
            alertColor: '',
            redirectOption:''
        }
    }

    changeHandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    closePopUp(opt) {
        this.setState({
            popUp: false

        })
        if(opt ==='redirectToLogin'){
            window.location.href='login'
        }
    }

    validateFields(e) {
        e.preventDefault();
        let passValue = document.forms[0].pass.value;
        let repassValue = document.forms[0].repass.value;
        let cont = 0;
        let self = this;
        this.validateSinglePass(document.forms[0].pass, true) ? cont++ : '';
        this.validateSinglePass(document.forms[0].repass, true) ? cont++ : '';
        this.validateTextInput(document.forms[0].name, true) ? cont++ : '';
        this.validateTextInput(document.forms[0].lastName, true) ? cont++ : '';
        this.checkEmail(document.forms[0].email, true) ? cont++ : '';

        if (passValue != repassValue) {
            self.setState({
                repassErrorText: "Las contraseñas no coinciden. Por favor inténtalo de nuevo.",
                repassErro: true
            })

        } else {
            cont++;
            self.setState({
                repassErrorText: "",
                repassErro: false
            })
        }
        if (cont == 6) {
            this.activateLoading(true)
            this.register();
        } else {
            this.setAlert(false, true, 'Ooops', 'Porfavor verifique sus datos y vuelva a intentalo',
                'fa-exclamation-triangle', '#ff4847');
        }
        console.log(cont)
    }

    register() {
        let self = this;
        self.activateLoading(true)
        axios.post(
            'https://wbooks-api-stage.herokuapp.com/api/v1/users', {
                user: {
                    email:this.state.email,
                    password:this.state.pass,
                    confirm_password:this.state.repass,
                    first_name:this.state.name,
                    last_name:this.state.lastName,
                    locale: 'en'
                },
                locale: 'en'
            }
        )
            .then(function (response) {

                console.log(response)
                self.setState({ redirectOption:'redirectToLogin'});
                self.activateLoading(false);
                self.setAlert(false, true, 'Excelente!', 'Tu usuario fue creado con exito',
                    'fa-check', '#009f70');
            })
            .catch(function (error) {

                console.log(error)
                self.setState({ redirectOption:''});
                self.activateLoading(false);
                self.setAlert(false, true, 'Correo ya registrado', 'El correo ingresado ya esta registrado, favor intente con uno diferente',
                    'fa-exclamation-triangle', '#ff4847');

            });
    }
    activateLoading(state) {
        this.setState({
            loading: state
        })
    }

    validateTextInput(e, opt) {
        let self = this;
        let val = !opt ? e.target.value : e.value;
        if (val.length == 0) {
            self.setState({
                [(!opt ? e.target.name : e.name) + 'Error']: true,
                [(!opt ? e.target.name : e.name) + 'ErrorText']: 'Campo Obligatorio!'
            })
            return false
        } else {
            self.setState({
                [(!opt ? e.target.name : e.name) + 'Error']: false,
                [(!opt ? e.target.name : e.name) + 'ErrorText']: ''
            })
            if (!/^[a-zA-Z\s]*$/g.test(val)) {
                self.setState({
                    [!opt ? e.target.name : e.name]: !opt ? e.target.value.substring(0, e.target.value.length - 1) : e.value.substring(0, e.value.length - 1)
                })
                return false;
            } else {
                return true;
            }
        }
    }

    validateSinglePass(e, opt) {
        console.log("Me meti a validar el PASS")
        let self = this;
        let error = false;
        let errorText = '';
        let lenght = !opt ? e.target.value.length : e.value.length;
        if (lenght < 8 || lenght > 52) {
            error = true;
            errorText = 'La Contraseña debe contener al menos 8 caracteres'
        }
        this.setState({
            [(!opt ? e.target.name : e.name) + 'Error']: error,
            [(!opt ? e.target.name : e.name) + 'ErrorText']: errorText
        });

        if (error) {
            return false;
        } else {
            return true;
        }
    }

    setAlert(loading, popUp, alertTitle, alertMsg, alertIcon, alertColor) {
        this.setState({
            loading: false,
            popUp: true,
            alertTitle: alertTitle,
            alertMsg: alertMsg,
            alertIcon: alertIcon,
            alertColor: alertColor,
        })
    }

    checkEmail(e, opt) {
        let self = this;
        let email = !opt ? e.target.value : e.value;
        let filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!filter.test(email)) {
            self.setState({
                emailError: true,
                emailErrorText: 'Ingrese un correo valido'
            })
            return false;
        } else {
            self.setState({
                emailError: false,
                emailErrorText: ''
            })
            return true;
        }
    }


    render() {
        let firstChild = this.state.submitButton ? 'firstChild' : 'firstChild btnDisabled';
        return (
            <div>
                <div>
                    <div className="overlay">&</div>
                    <form name="formulario" className="login registrationBoxMarginTop"
                          onSubmit={e => this.validateFields(e)}>
                        <div className="loginBox shadow registrationBox">
                            <Spinner display={this.state.loading}/>
                            <Alert display={this.state.popUp}
                                   titulo={this.state.alertTitle}
                                   texto={this.state.alertMsg}
                                   icon={this.state.alertIcon}
                                   color={this.state.alertColor}
                                   toClose={()=>this.closePopUp(this.state.redirectOption)}
                            />
                            <div className='loginWraper'>
                                <div className="loginHheader">
                                    <Logo/>
                                    <div className="title">
                                        <h3>Registrar nuevo usuario</h3>
                                    </div>
                                </div>
                                <div className="loginBody ">
                                    <div className="dobleInputGroup">
                                        <div className="input-group halfInput leftInput">
                                            <label>Nombre</label><br/>
                                            <input type="text"
                                                   className='halfInput'
                                                   name="name"
                                                   maxLength='35'
                                                   value={this.state.name}
                                                   pattern="[A-Za-z]+"
                                                   placeholder="Nombre"
                                                   required
                                                   onKeyUp={e => this.validateTextInput(e)}
                                                   onChange={e => this.changeHandler(e)}/>
                                            {this.state.nameError ?
                                                <span className="inputError">{this.state.nameErrorText}</span> : ''}
                                        </div>
                                        <div className="input-group halfInput rightInput">
                                            <label>Apellido</label><br/>
                                            <input type="text"
                                                   className='halfInput'
                                                   name="lastName"
                                                   maxLength='35'
                                                   value={this.state.lastName}
                                                   pattern="[A-Za-z]+"
                                                   placeholder="Apellido"
                                                   required
                                                   onKeyUp={e => this.validateTextInput(e)}
                                                   onChange={e => this.changeHandler(e)}/>
                                            {this.state.lastNameError ?
                                                <span className="inputError">{this.state.lastNameErrorText}</span> : ''}
                                        </div>
                                    </div>
                                    <div className="input-group">
                                        <label>Correo</label><br/>
                                        <input type="email"
                                               name="email"
                                               value={this.state.email}
                                               pattern="^(([-\w\d]+)(\.[-\w\d]+)*@([-\w\d]+)(\.[-\w\d]+)*(\.([a-zA-Z]{2,5}|[\d]{1,3})){1,2})$"
                                               placeholder="usuario@algo.cl"
                                               required
                                               onKeyUp={e => this.checkEmail(e)}
                                               onChange={e => this.changeHandler(e)}/>
                                        {this.state.emailError ?
                                            <span className="inputError">{this.state.emailErrorText}</span> : ''}
                                    </div>
                                    <div className="dobleInputGroup">
                                        <div className="input-group halfInput leftInput">
                                            <label>Password</label><br/>
                                            <input type="password"
                                                   className='halfInput'
                                                   name="pass"
                                                   value={this.state.pass}
                                                   placeholder="Ingrese su contraseña"
                                                   required
                                                   onChange={e => this.changeHandler(e)}
                                                   onKeyUp={e => this.validateSinglePass(e)}/>
                                            {this.state.passError ?
                                                <span className="inputError">{this.state.passErrorText}</span> : ''}
                                        </div>
                                        <div className="input-group halfInput rightInput">
                                            <label>Reingrese Password</label><br/>
                                            <input type="password"
                                                   className='halfInput'
                                                   name="repass"
                                                   value={this.state.repass}
                                                   placeholder="Re-ingrese su password"
                                                   required
                                                   onChange={e => this.changeHandler(e)}
                                                   onKeyUp={e => this.validateSinglePass(e)}/>
                                            {this.state.repassError ?
                                                <span className="inputError">{this.state.repassErrorText}</span> : ''}
                                        </div>
                                    </div>
                                    <div className="buttons-group">
                                        <button className={firstChild}
                                                disabled={this.state.error}
                                                onClick={e => this.validateFields(e)}>
                                            Registrar
                                        </button>
                                        <button onClick={e=>{e.preventDefault(); window.location.href='/login' }}> Volver </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        );
    }
}

userRegistration.propTypes = {};

export default userRegistration;
