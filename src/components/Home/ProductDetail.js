import React, { Component } from 'react';
import API from '../../Config/Api';
import { ProductImage } from '../../Config/Constants';
import { AppContext } from '../../ContextApi/AppContext';

class ProductDetail extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            product: {},
            quantity: 1
        }
    }
    componentDidMount() {
        API.get('product/detail/' + this.props.match.params.id)
            .then(res => {
                if (res.data.response == 'success') {
                    this.setState({
                        product: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    renderPrice = () => {
        const { product } = this.state;
        if (product.status == 2) {
            return (
                <React.Fragment>
                    <span><s>${product.price}</s></span>
                    <span>${product.price - product.sale}</span>
                </React.Fragment>
            )
        }
        return <span>${product.price}</span>
    }
    handleChangeInput = (e) => {
        const name = e.target.name;
        const value = e.target.value > 0 ? e.target.value : 1;
        this.setState({
            [name]: value
        })
    }
    handleAddCart = (e) => {
        const id = this.props.match.params.id;
        const product = this.state.product;
        const cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        if (cart[id]) {
            cart[id].quantity = cart[id].quantity + Number(this.state.quantity);
        } else {
            cart[id] = product;
            cart[id].quantity = this.state.quantity;
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        this.context.numberCart(Object.keys(cart).length);
        alert('Them thanh cong');
    }
    renderDetail = () => {
        const { product } = this.state;
        if (Object.keys(product).length > 0) {
            const Images = JSON.parse(product.image);
            return (
                <React.Fragment>
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img src={ProductImage + product.id_user + '/' + JSON.parse(product.image)[0]} alt="" />
                            <a href="images/product-details/1.jpg" rel="prettyPhoto"><h3>ZOOM</h3></a>
                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            <div className="carousel-inner">                            {
                                Images.map((value, index) => {
                                    return (
                                        <div className={index == 1 ? "item active" : "item"} key={index}>
                                            <a href="" ><img src={ProductImage + product.id_user + '/' + value} alt="" width="80px" /></a>
                                            <a href="" ><img src={ProductImage + product.id_user + '/' + value} alt="" width="80px" /></a>
                                            <a href="" ><img src={ProductImage + product.id_user + '/' + value} alt="" width="80px" /></a>
                                        </div>
                                    )
                                })
                            }

                            </div>


                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left"></i>
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right"></i>
                            </a>

                        </div>

                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                            {
                                product.status == 1 ? <img src={window.location.origin + '/frontend/images/product-details/new.jpg'} className="newarrival" alt="" /> : ''
                            }

                            <h2>{product.name}</h2>
                            <p>Web ID: 1089772</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                {this.renderPrice()}
                                <label>Quantity:</label>
                                <input type="text" value={this.state.quantity} onChange={this.handleChangeInput} name="quantity" />
                                <button type="button" className="btn btn-fefault cart" onClick={this.handleAddCart}>
                                    <i className="fa fa-shopping-cart"></i>
                                Add to cart
                            </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> New</p>
                            <p><b>Brand:</b> E-SHOPPER</p>
                            <a href=""><img src={window.location.origin + '/frontend/images/product-details/share.png'} className="share img-responsive" alt="" /></a>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
    }

    render() {
        const { product } = this.state;
        return (
            <div className="col-sm-9 padding-right">
                <div className="product-details">
                    {this.renderDetail()}
                </div>




            </div>
        );
    }
}

export default ProductDetail;