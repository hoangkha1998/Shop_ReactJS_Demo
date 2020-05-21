import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import CheckLogin from './../Config/CheckLogin';
import { AppContext } from '../ContextApi/AppContext';
import HeaderTop from './HeaderTop';
import HeaderBottom from './HeaderBottom';
import HeaderLogo from './HeaderLogo';
class Header extends Component {
	static contextType = AppContext;
	constructor(props) {
		super(props);
		this.renderLogin = this.renderLogin.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
		this.renderWishList = this.renderWishList.bind(this)
		this.state = {
			userLogin: new CheckLogin()
		}
	}

	handleLogout() {
		if (this.state.userLogin.getIsLogin()) {
			this.state.userLogin.deleteUserLogin();
			this.props.history.push('/login');
		}
	}
	renderLogin() {

		if (this.state.userLogin.getIsLogin()) {
			return (
				<li><Link to="#" onClick={this.handleLogout}><i className="fa fa-lock"></i> Logout</Link></li>
			)
		} else {
			return (
				<li><Link to="/login"><i className="fa fa-lock"></i> Login</Link></li>

			)
		}

	}
	renderWishList() {		
		let wishList = this.context.state.numberWishList;
		return (
			<li><Link to="/wishlist"><i className="fa fa-star"></i> {wishList>0 ? '('+wishList+')':''} Wishlist</Link></li>
		)
	}
	renderCart = () => {
		let cart = this.context.state.numberCart;
		return (
			<li><Link to="/cart" className="cart"><i className="fa fa-shopping-cart"></i> {cart > 0 ? '(' + cart + ')' : ''} Cart</Link></li>
		)
	}

	render() {
		const { userLogin } = this.state;
		return (
			<header id="header">
				<div className="header_top">
					<HeaderTop />
				</div>

				<div className="header-middle">
					<div className="container">
						<div className="row">
							<div className="col-md-4 clearfix">
								<HeaderLogo />
							</div>
							<div className="col-md-8 clearfix">
								<div className="shop-menu clearfix pull-right">
									<ul className="nav navbar-nav">
										{
											userLogin.getIsLogin() ? <li><Link to="/account/profile"><i className="fa fa-user"></i> Account</Link></li> : ''
										}
										{this.renderWishList()}
										<li><Link to="/checkout"><i className="fa fa-crosshairs"></i> Checkout</Link></li>
										{this.renderCart()}
										{this.renderLogin()}
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="header-bottom">
					<HeaderBottom />
				</div>
			</header>


		);
	}
}
export default withRouter(Header)

