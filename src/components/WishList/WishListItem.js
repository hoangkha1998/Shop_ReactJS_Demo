import React from 'react';
import {Link} from 'react-router-dom';
import { ProductImage } from '../../Config/Constants';
import { AppContext } from '../../ContextApi/AppContext';
class WishListItem extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);        
    }
    renderSaleNew = () => {
        const status = this.props.item.status;
        if (status == 1) {
            return <img src={window.location.origin + '/frontend/images/home/new.png'} className="new" alt="xxx" />
        }
        if (status == 2) {
            return <img src={window.location.origin + '/frontend/images/home/sale.png'} className="new" alt="xxx" />
        }
    }
    renderPrice = () => {
        const { item } = this.props;
        if (item.status == 2) {
            return (
                <React.Fragment>
                    <h4><s>${item.price}</s></h4>
                    <h2>${item.price - item.sale}</h2>
                </React.Fragment>
            )
        }
        return <h2>${item.price}</h2>

    }   
    handleAddCart= (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        const item = this.props.item;
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if (cart[id]) {
            cart[id].quantity = cart[id].quantity + 1;            
        } else {
            cart[id] = item;
            cart[id].quantity = 1;                               
        }
        localStorage.setItem('cart', JSON.stringify(cart));  
        this.context.numberCart(Object.keys(cart).length);  
        alert('Them thanh cong'); 
    }
   
    handleDeleteWishList = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        const wishList = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : {};
        if (Object.keys(wishList).length == 0) {
            localStorage.removeItem('wishList');
        }
        if (wishList[id]) {
            delete wishList[id];            
            localStorage.setItem('wishList', JSON.stringify(wishList));            
            this.context.numberWishList(Object.keys(wishList).length);
        }
    }
    render() {
        const { item } = this.props;
        return (
            <div className="col-sm-4">
                <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                            <img src={ProductImage + item.id_user + '/' + JSON.parse(item.image)[0]} alt="" />
                            {this.renderPrice()}
                            <p>{item.name}</p>
                            <Link to="" onClick={this.handleAddCart} data-id={item.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                        </div>
                        <div className="product-overlay">
                            <div className="overlay-content">
                                {this.renderPrice()}
                                <p>{item.name}</p>
                                <Link to="" onClick={this.handleAddCart} data-id={item.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                            </div>
                        </div>
                        {this.renderSaleNew()}
                    </div>
                    <div className="choose">
                        <ul className="nav nav-pills nav-justified">                           
                            <li><Link to="" onClick={this.handleDeleteWishList} data-id={item.id}><i className="fa fa-times"></i>Remove WishList</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default WishListItem