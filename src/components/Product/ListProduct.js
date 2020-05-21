import React from 'react';
import { Link,withRouter } from 'react-router-dom';
import API from '../../Config/Api';
import CheckLogin from '../../Config/CheckLogin';
import {ProductImage} from '../../Config/Constants';
class ListProduct extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listProducts: [],
            userLogin: new CheckLogin()
        }
    }
    componentDidMount() {
        const {userLogin } = this.state;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userLogin.getToken(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        API.get('/user/my-product',config)
            .then(res => {
               if(res.data.response === 'success'){
                   this.setState({
                    listProducts:res.data.data
                   })
               }
                
            })
            .catch(err => {

            })
    }
    handleDelete =(e)=>{
        const id = e.target.getAttribute('data-id');
        const {userLogin } = this.state;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userLogin.getToken(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        API.get('/user/delete-product/'+id,config)
            .then(res => {
               if(res.data.response === 'success'){
                   this.setState({
                    listProducts:res.data.data
                   })
               }
                
            })
            .catch(err => {

            })
        
    }
    render() {
       const {listProducts,userLogin}= this.state;        
        return (
            <div className="table-responsive ">
                <table className="table table-bordered">
                    <thead>
                        <tr className="cart_menu">
                            <td className="image text-center">Id</td>
                            <td className="description text-center">Name</td>
                            <td className="price text-center">Image</td>
                            <td className="quantity text-center">Price</td>
                            <td colSpan="2" className="text-center">Action</td>
                        </tr>
                    </thead>
                    <tbody >
                        {
                           Object.keys(listProducts).map((value, key)=>{  
                                                    
                                return(
                                    <tr key= {key}>
                                        <td className="text-center">{listProducts[value].id}</td>
                                        <td className="text-center">{listProducts[value].name}</td>
                                        <td className="text-center"><img  src={ProductImage+userLogin.getProfile().id+"/"+JSON.parse(listProducts[value].image)[0]} width="50px" height="50px"/></td>
                                        <td className="text-center">${listProducts[value].price}</td>
                                        <td className="text-center"><Link to={'/account/product/edit/'+listProducts[value].id}><i className="fa fa-edit"></i> Edit</Link></td>
                                        <td className="text-center"><Link  to="#" onClick={this.handleDelete} data-id={listProducts[value].id}><i className="fa fa-times"></i> Delete</Link></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="6" className="text-right">
                                <Link to="/account/product/add" className="btn btn-primary " >Add new</Link>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

        )
    }
}
export default withRouter(ListProduct)