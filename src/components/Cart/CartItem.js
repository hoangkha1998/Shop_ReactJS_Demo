import React from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../../Config/Constants';
import {AppContext} from '../../ContextApi/AppContext';
class CartItem extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);  
        this.state={
            quantity:this.props.cart.quantity
        }     
    }
    renderPrice = () => {
        const { cart } = this.props;
        if (cart.status == 2) {
            return (
                <p>${cart.price - cart.sale}</p>
            )
        }
        return (
            <p>${cart.price}</p>
        )
    }
    renderTotal = () => {
        const { cart } = this.props;
        if (cart.status == 2) {
            return (
                <p>${(cart.price - cart.sale) * cart.quantity}</p>
            )
        }
        return (
            <p>${cart.price * cart.quantity}</p>
        )
    }
    handleAddQuantity = (e) => {
        e.preventDefault();
        const { cart } = this.props;        
        cart.quantity =Number(cart.quantity) +1;
        const cartStr = JSON.parse(localStorage.getItem('cart'));
        cartStr[cart.id] = cart;
        localStorage.setItem('cart',JSON.stringify(cartStr));      
        this.context.numberCart(Object.keys(cartStr).length); 
        this.setState({
            quantity:cart.quantity
        })   
    }
    handleSubQuantity = (e) => {
        e.preventDefault();
        const { cart } = this.props; 
        if(cart.quantity>1){
            cart.quantity = Number(cart.quantity) -1;
            const cartStr = JSON.parse(localStorage.getItem('cart'));
            cartStr[cart.id] = cart;
            localStorage.setItem('cart',JSON.stringify(cartStr));     
            this.context.numberCart(Object.keys(cartStr).length);
            this.setState({
                quantity:cart.quantity
            })   
        }      
    }
    handleDeleCartItem =()=>{
       var confirm = window.confirm("Ban muon xoa no?");
       if(confirm){
        const cartStr = JSON.parse(localStorage.getItem('cart'));
        const { cart } = this.props;
        delete cartStr[cart.id];
        localStorage.setItem('cart',JSON.stringify(cartStr));
        this.context.numberCart(Object.keys(JSON.parse(localStorage.getItem('cart'))).length);
       }
        
    }
    handleUpdateQuantity=(e)=>{
        const { cart } = this.props; 
        const name = e.target.name;
        const value = e.target.value>0 ?e.target.value:1;
        this.setState({
            [name]:value
        })              
        cart.quantity = value;
        const cartStr = JSON.parse(localStorage.getItem('cart'));
        cartStr[cart.id] = cart;
        localStorage.setItem('cart',JSON.stringify(cartStr));      
        this.context.numberCart(Object.keys(cartStr).length); 
    }
   
    render() {
        const { cart } = this.props;
        return (
            <tr className="text-center">
                <td className="text-center">
                    <Link to="/"><img src={ProductImage + cart.id_user + '/' + JSON.parse(cart.image)[0]} alt="" width="100px" /></Link>
                </td>
                <td className="cart_description">
                    <h4><Link to="#">{cart.name}</Link></h4>
                </td>
                <td className="text-center">{this.renderPrice()}</td>
                <td className="text-center">
                    <div className="cart_quantity_button">
                        <Link className="cart_quantity_up" to="/" onClick={this.handleAddQuantity}> + </Link>
                        <input className="cart_quantity_input" type="number" name="quantity" value={this.state.quantity} onChange={this.handleUpdateQuantity} size="2"/>
                        <Link className="cart_quantity_down" to="/" onClick={this.handleSubQuantity}> - </Link>
                    </div>
                </td>
                <td className="text-center">{this.renderTotal()}</td>
                <td className="text-center">
                    <button className="cart_quantity_delete bg-primary" onClick={this.handleDeleCartItem}><i className="fa fa-times"></i></button>
                </td>
            </tr>
        )
    }
}
export default CartItem 