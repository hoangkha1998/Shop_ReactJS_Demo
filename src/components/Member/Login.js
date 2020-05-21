import React, { Component } from 'react';
import FormError from '../FormError';
import API from '../../Config/Api';
import Register from './Register';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            formError: {},
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
        // this.rederError = this.rederError.bind(this); 

    }
    handleInput(event) {
        const nameInput = event.target.name;
        const value = event.target.value;
        this.setState({
            [nameInput]: value
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        
        let email = this.state.email;
        let password = this.state.password;
        let formError = this.state.formError = {};

        if (!email) {
            formError.email = "nhap mail";
        }

        if (!password) {
            formError.password = "nhap Password";
        }

        this.setState({
            formError: formError
        })
        if (password && email) {
            let data = {
                email: email,
                password: password
            };
            API.post('/login', data)
                .then(res => {
                    if (res.data.response === 'success') {
                        let userLogin = {};
                        let islogin = true;
                        userLogin.token = res.data.success.token;
                        userLogin.Auth = res.data.Auth;
                        userLogin.islogin = islogin;
                        localStorage.setItem('userLogin', JSON.stringify(userLogin));
                        this.props.history.push('/');
                    } else {

                        this.setState({
                            formError: res.data.errors
                        })
                    }
                })
                .catch(err => {
                    console.log(err);
                })

        }
        
    }



    render() {

        return (<div id="form">
            <div className="container">
                <div className="row">
                    <div className="col-sm-4 col-sm-offset-1">
                        <div className="alert-danger">
                            <FormError formError={this.state.formError} />
                        </div>
                        <div className="login-form">
                            <h2>Login to your account</h2>
                            <form onSubmit={this.handleSubmit}>
                                <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleInput} />
                                <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInput} />

                                <span>
                                    <input type="checkbox" className="checkbox" />
                                    Keep me signed in
                    </span>
                                <button type="submit" className="btn btn-default">Login</button>
                            </form>
                        </div>
                    </div>
                    <div className="col-sm-1">
                        <h2 className="or">OR</h2>
                    </div>
                    <div className="col-sm-4">
                        <Register />
                    </div>
                </div>
            </div>
        </div>);

    }
}
export default withRouter(Login)