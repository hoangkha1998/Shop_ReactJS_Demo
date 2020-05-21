import React from 'react';
import {  withRouter } from 'react-router-dom';
import CheckLogin from '../../Config/CheckLogin';
import API from '../../Config/Api';

class CommentRelay extends React.Component {
    constructor(props) {
        super(props);
        this.state=({
            comment:'',
            formError:{},
            userLogin : new CheckLogin()
        });
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmitForm= this.handleSubmitForm.bind(this);
    }
    handleInput(e){
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]:value
        })
    }
    handleSubmitForm(e){      
        const userLogin = this.state.userLogin;
        var flag= true;        
        let config ={
            headers:{               
                'Authorization': 'Bearer '+  userLogin.getToken(),	
                'Content-Type': 'application/x-www-form-urlencoded',	
                'Accept': 'application/json'	
               
            }
        };       
        let {comment,formError} = this.state;
        if(comment ===''){
            formError.comment = "Nhập comment";
            flag= false;
        }
        if(userLogin.getIsLogin()){
            if(flag){
                let formData = new FormData();
                formData.append('id_blog',this.props.id_blog);
                formData.append('id_user',userLogin.getProfile().id);
                formData.append('id_comment',this.props.id_comment);
                formData.append('comment',this.state.comment);
                formData.append('image_user',userLogin.getProfile().avatar);
                formData.append('name_user',userLogin.getProfile().name);
                API.post('/blog/comment/'+this.props.id_blog,formData,config)
                .then(res=>{
                   if(res.data.status === 200){
                      this.props.updateListComment(res.data.data);
                      this.setState({
                          comment:''
                      })
                   }                    
                })
                .catch(err=>{
                    console.log(err);
                    
                })
            }        
            
        }else{    
          
            this.props.history.push("/login")
        }
        e.preventDefault();
    }
    render() {      
       
        return (
            <div className="replay-box">
						<div className="row">
                        <form onSubmit={this.handleSubmitForm}>
							{/* <div className="col-sm-4">
								<h2>Leave a replay</h2>
								
									<div className="blank-arrow">
										<label>Your Name</label>
									</div>
									<span>*</span>
									<input type="text" placeholder="write your name..."/>
									<div className="blank-arrow">
										<label>Email Address</label>
									</div>
									<span>*</span>
									<input type="email" placeholder="your email address..."/>
									<div className="blank-arrow">
										<label>Web Site</label>
									</div>
									<input type="email" placeholder="current city..."/>
								
							</div> */}
							<div className="col-sm-12">
								<div className="text-area">
									<div className="blank-arrow">
										<label>Your Name</label>
									</div>
									<span>*</span>
									<textarea name="message" rows="11" name="comment" onChange={this.handleInput}></textarea>
									<button className="btn btn-primary" type="submit" >post comment</button>
								</div>
							</div>
                            </form>
						</div>
					</div>
        )
    }
}
export default withRouter(CommentRelay)