import React from 'react';
import API from '../../Config/Api';
import FormError from '../FormError';


class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',            
            formError: {},
            phone: '',
            address: '',
            country: '',
            name: '',
            avatar:'',
            file:''
        };       
        this.handleRegister = this.handleRegister.bind(this);
        this.handleInputFile = this.handleInputFile.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    handleInput(event) {
        const nameInput = event.target.name;
        const value = event.target.value;
        this.setState({
            [nameInput]: value
        })
    }
    handleInputFile(event) {
        let fileReader = new FileReader();
        let file = event.target.files[0];
        fileReader.onloadend = () => {
            this.setState({
                avatar: fileReader.result,
                file: file
            })
        }
        fileReader.readAsDataURL(file);
        event.preventDefault();
    }
    handleRegister(event) {
        let { name, email, address, phone, country, password, formError, avatar } = this.state;
        let flag = true;
        formError = {};
        if (!name) {
            formError.name = "Nhap name";
            flag = false;
        }
        if (!email) {
            formError.email = "Nhap email";
            flag = false;
        }
        if (!address) {
            formError.address = "Nhap address";
            flag = false;
        }
        if (!phone) {
            formError.phone = "Nhap phone";
            flag = false;
        }
        if (!country) {
            formError.country = "Nhap country";
            flag = false;
        }
        if (!password) {
            formError.password = "Nhap password";
            flag = false;
        }
        this.setState({
            formError: formError
        })
        let data = {
            name: name,
            email: email,
            address: address,
            phone: phone,
            country: country,
            password: password,
            avatar: avatar,
            level:0
        }
        if (flag) {
            API.post('/register', data)
                .then(res => {
                    if (res.data.message === 'success') {
                        formError.success ="dang ki thanh cong";
                        this.setState({
                            formError:formError
                        })
                    } else {               
                        
                        this.setState({
                            formError:res.data.errors
                        })
                    }
                })
                .catch(err => {
                    console.log(err);

                })
        }
        event.preventDefault();
    }
    render() {        
        return (       
            <div className="signup-form">
                 <div className="alert-danger">
                    <FormError formError={this.state.formError} />
                </div>
                <h2>New User Signup!</h2>
                <form encType="mutipart/form-data" onSubmit={this.handleRegister}>
                    <input type="text" placeholder="Name" name="name" value={this.state.name} onChange={this.handleInput} />
                    <input type="email" placeholder="Email Address" name="email" value={this.state.email} onChange={this.handleInput} />
                    <input type="password" placeholder="Password" name="password" value={this.state.password} onChange={this.handleInput} />
                    <input type="Number" placeholder="Phone" name="phone" value={this.state.phone} onChange={this.handleInput} />
                    <input type="text" placeholder="Address" name="address" value={this.state.address} onChange={this.handleInput} />
                    <input type="text" placeholder="Country" name="country" value={this.state.country} onChange={this.handleInput} />
                    <input type="file" placeholder="Avater" name="avatar" onChange={this.handleInputFile} />
                    <button type="submit" className="btn btn-default">Signup</button>
                </form>
            </div>
        )
    }
}
export default Register