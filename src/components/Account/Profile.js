import React, { Component } from 'react';
import CheckLogin from '../../Config/CheckLogin';
import FormError from '../FormError';
import API from '../../Config/Api';
import{AvatarImage} from '../../Config/Constants';


class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userLogin: new CheckLogin(),
      username: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      country: '',
      avatar: '',
      formError: {},
      file: ''
    }
  }
  handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    })
  }
  componentDidMount() {
    if (this.state.userLogin) {
      const user = this.state.userLogin.getProfile();
      this.setState({
        username: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        country: user.country,
        avatar: user.avatar
      })

    }
  }
  handleInputFile = (event) => {
    event.preventDefault();
    let fileReader = new FileReader();
    let file = event.target.files[0];
    fileReader.onloadend = () => {
      this.setState({
        avatar: fileReader.result,
        file: file
      })
      let dom = document.getElementById('xxx');
      dom.src=fileReader.result;
    }
    fileReader.readAsDataURL(file);
    
    
    
    
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let flag = true;
    var { username, email, password, phone, address, country, file, formError, userLogin, avatar } = this.state;
    formError = {};

    if (username == '') {
      formError.name = "Nhap name";
      flag = false;
    }
    if (email == '') {
      formError.email = "Nhap mail";
      flag = false;
    }
    if (phone == '') {
      formError.phone = "Nhap phone";
      flag = false;
    }
    if (address == '') {
      formError.address = "Nhap address";
      flag = false;
    }
    if (country == '') {
      formError.country = "Nhap country";
      flag = false;
    }
    if (file!= '') {
      if (!this.handleCheckExtensionFile(file.name)) {
        formError.File = "File not accept";
        flag = false;
      }
    }
    this.setState({
      formError: formError
    })
    if (flag) {
      let config = {
        headers: {
          'Authorization': 'Bearer ' + userLogin.getToken(),
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json'

        }
      };
      let idUser = userLogin.getProfile().id;
      let formData = new FormData();
      formData.append('name', username);
      formData.append('phone', phone);
      formData.append('email', email);
      formData.append('address', address);
      formData.append('country', country);
      formData.append('avatar', avatar);
      if (password != '') {
        formData.append('password', password);
      }
      API.post('/user/update/' + idUser, formData, config)
        .then(res => {         
          if (res.data.response == 'success') {
             userLogin = {};
            let islogin = true;
            userLogin.token = res.data.success.token;
            userLogin.Auth = res.data.Auth;
            userLogin.islogin = islogin;
            localStorage.setItem('userLogin', JSON.stringify(userLogin));
            this.props.history.push('/account');
          }
          else{
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
  handleCheckExtensionFile = (nameFile) => {
    let arrExtension = ['jpg', 'png', 'gif'];
    let file = nameFile.split('.');
    if (arrExtension.indexOf(file[1]) != -1) {
      return true;
    }
    return false;
  }
  render() {
    var { username, email, password, phone, address, country, file, formError ,avatar} = this.state;


    return (
      <form encType="multipart/form-data" onSubmit={this.handleSubmit}>
        <div className="form-group alert-danger">
          <FormError formError={formError} />
        </div>
        <div className="form-group">
          <label >User name</label>
          <input type="text" className="form-control" placeholder="Enter username" name="username" value={username} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label >Email</label>
          <input type="email" className="form-control disiabled" placeholder="Email" name="email" value={email} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label >Password</label>
          <input type="text" className="form-control" placeholder="Password" name="password" value={password} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label >Phone</label>
          <input type="text" className="form-control" placeholder="Phone" name="phone" value={phone} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label >Address</label>
          <input type="text" className="form-control" placeholder="Address" name="address" value={address} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label >Country</label>
          <input type="text" className="form-control" placeholder="Country" name="country" value={country} onChange={this.handleInput} />
        </div>
        <div className="form-group">
          <label >Avatar</label>
          <input type="file" className="form-control" placeholder="Password" name="avatar" onChange={this.handleInputFile} />
          <img src={AvatarImage + avatar} alt="image" width="300px" height="auto" id="xxx"/>
        </div>
        <div className="form-group">
          <button type="submit" className="btn btn-primary mb-30">Update</button>
        </div>

      </form>
    );
  }

}

export default Profile;