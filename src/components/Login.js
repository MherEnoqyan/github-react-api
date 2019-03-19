import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import getData from '../query';

class Login extends Component {

    login(e) {
        if (!this.email.value || !this.password.value) {
            this.props.handleValidation({validationError: 'Требуется адрес электронной почты и пароль'});
            return;
        }
        const url = `https://api.github.com`;
        const auth = btoa(`${this.email.value}:${this.password.value}`);
        getData(url, auth).then((response) => {
            if (response.message && response.message === 'Bad credentials') {
                this.props.handleValidation({validationError: 'Неверные учетные данные'});
            } else {
                sessionStorage.setItem('token', auth);
                this.props.handleLogin({auth: auth});
            }
        }).catch(error => console.log(`Rejected: ${error}`));

    }

    render() {
        if (this.props.auth) {
            return <Redirect to='/users'/>;
        }

        return (
            <div className="container">
                <div className="text-danger col-sm-4 mx-auto mb-3">{this.props.validationError}</div>
                <form>
                    <div className="form-group col-sm-4 mx-auto">
                    <input ref={(input) => {
                        this.name = input
                    }} type="text" placeholder="Имя Фамильев" className="form-control"/>
                    </div>
                    <div className="form-group col-sm-4 mx-auto">
                    <input ref={(input) => {
                        this.email = input
                    }} type="text" placeholder="E-mail" className="form-control"/>
                    </div>
                    <div className="form-group col-sm-4 mx-auto">
                    <input ref={(input) => {
                        this.password = input
                    }} type="password" placeholder="Пароль" className="form-control"/>
                    </div>
                    <div className="form-group col-sm-4 mx-auto">
                    <button type="button" onClick={this.login.bind(this)} value=""
                            className="btn btn-primary">Зарегистрироваться
                    </button>
                    </div>
                </form>
            </div>
        );
    }
}

export default connect(
    state => ({
        validationError: state.login.validationError,
        auth: state.login.auth
    }),
    dispatch => ({
        handleValidation: (value) => {
            dispatch({type: 'VALIDATION_ERROR', payload: value});
        },
        handleLogin: (value) => {
            dispatch({type: 'AUTH', payload: value});
        }
    })
)(Login);
