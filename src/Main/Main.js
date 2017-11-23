import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom'
import Dashboard from '../Dashboard/Dashboard'
import Landing from '../Landing/Landing'
import BookDetail from '../BookDetail/BookDetail'
import NotFound from '../NotFound/NotFound'
import Login from '../Login/Login'
import userRegistration from '../userRegistration/userRegistration'
import '../Assets/animate.css'


class Main extends Component {
    state = {
        fields: {},
        logged: false
    }

    componentWillMount() {
        let locPath = window.location.pathname;
        if (localStorage.getItem('datos')) {
            this.setState({
                logged: true
            })

            if (locPath === '/login/' || locPath === '/login') {
                window.location.href = '/dashboard/'
            }
        } else {
            if (locPath !== '/login/' && locPath !== '/login' && locPath !== '/userregistration' && locPath !== '/userregistration/' ) {
                window.location.href = '/login/'
            }

        }
    }

    isLogged(logged) {
        if (logged) {
            localStorage.setItem('datos', 'Logged')

            window.location.href = "/dashboard"
        }

    }

    validate(estado) {
        var thiss = estado
        let error = false;
        let regex = /\b[A-Z0-9._%+-]+@(?:[A-Z0-9-]+\.)+[A-Z]{2,20}\b/gi;
        if (regex.test(thiss.state.email)) {
            error = false;
            thiss.setState({
                emailError: false,
                emailErrorText: ''
            })
        } else {
            error = true;
            thiss.setState({
                emailError: true,
                emailErrorText: 'Invalid Email addres, `please check and retry'
            })
        }
        if (thiss.state.pass.length < 7 || thiss.state.pass.length > 52) {
            error = true;
            thiss.setState({
                passError: true,
                passErrorText: 'Password must have at from 8 to 52 character, and at least a letter and a number'
            })
        } else {
            console.log('Este es la pass')
            console.log(thiss.state.pass)

            error = false;
            thiss.setState({
                passError: false,
                passErrorText: ''
            })

        }
        thiss.setState({
            error: error
        })
        return error
    }

    render() {
        this.isLogged();
        return (
            <div>
                    <main>
                        <Switch>
                            <Route exact path='/' component={Landing}/>
                            <Route path='/dashboard' component={Dashboard}/>
                            <Route path='/userregistration' component={userRegistration}/>
                            <Route exact path='/bookDetail/:id' component={BookDetail}/>
                            <Route path='/login'
                                   children={() => <Login onValidate={this.validate} isLogged={this.isLogged}/>}
                            />
                            <Route component={NotFound}/>

                        </Switch>
                    </main>
            </div>
        )
    }

    onSubmit = fields => {
        this.setState({
            fields
        })
    };
}

export default Main;
