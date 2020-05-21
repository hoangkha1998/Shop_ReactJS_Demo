import React from 'react';
import { Link } from 'react-router-dom';
import { ProductImage } from '../../Config/Constants';
import { AppContext } from '../../ContextApi/AppContext';
class ProductItem extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            wishList: localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : 0
        }
    }
    renderSaleNew = () => {
        const status = this.props.product.status;
        if (status == 1) {
            return <img src={window.location.origin + '/frontend/images/home/new.png'} className="new" alt="xxx" />
        }
        if (status == 2) {
            return <img src={window.location.origin + '/frontend/images/home/sale.png'} className="new" alt="xxx" />
        }
    }
    renderPrice = () => {
        const { product } = this.props;
        if (product.status == 2) {
            return (
                <React.Fragment>
                    <h4><s>${product.price}</s></h4>
                    <h2>${product.price - product.sale}</h2>
                </React.Fragment>
            )
        }
        return <h2>${product.price}</h2>

    }
    handleAddWishList = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        const product = this.props.product;
        const wishList = localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : {};
        if (wishList[id]) {
            return false;
        } else {
            wishList[id] = product;
            localStorage.setItem('wishList', JSON.stringify(wishList));
            this.context.numberWishList(Object.keys(wishList).length)
            // this.context.wishList.method(Object.keys(wishList).length);         
        }
    }
    handleAddCart = (e) => {
        e.preventDefault();
        const id = e.target.getAttribute('data-id');
        const product = this.props.product;
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if (cart[id]) {
            cart[id].quantity = cart[id].quantity + 1;
        } else {
            cart[id] = product;
            cart[id].quantity = 1;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.context.numberCart(Object.keys(cart).length);
        alert('Them thanh cong');
    }
    
    render() {
        const { product } = this.props;
        
        return (
            <div className="col-sm-4">
                <div className="product-image-wrapper">
                    <div className="single-products">
                        <div className="productinfo text-center">
                            <img src={ProductImage + product.id_user + '/' + JSON.parse(product.image)[0]} alt="" />
                            {this.renderPrice()}
                            <p>{product.name}</p>
                            <Link to="" onClick={this.handleAddCart} data-id={product.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                        </div>
                        <div className="product-overlay">
                            <div className="overlay-content">
                                {this.renderPrice()}
                                <p>{product.name}</p>
                                <Link to="" onClick={this.handleAddCart} data-id={product.id} className="btn btn-default add-to-cart"><i className="fa fa-shopping-cart"></i>Add to cart</Link>
                            </div>
                        </div>
                        {this.renderSaleNew()}
                    </div>
                    <div className="choose">
                        <ul className="nav nav-pills nav-justified">
                            <li><Link to="" onClick={this.handleAddWishList} data-id={product.id}><i className="fa fa-plus-square" ></i>Add to wishlist</Link></li>
                            {/* <li><Link to="" onClick={this.handleDeleteWishList} data-id={product.id}><i className="fa fa-plus-square"></i>Add to compare</Link></li> */}
                            <li><Link to={'/product/detail/'+product.id} ><i className="fa fa-plus-square"></i>Detail</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
export default ProductItem