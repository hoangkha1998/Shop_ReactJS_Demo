import React from 'react';
import{Link} from 'react-router-dom';
class HeaderBottom extends React.Component{
    render(){
        return(
<div className="container">
						<div className="row">
							<div className="col-sm-9">
								<div className="navbar-header">
									<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
										<span className="sr-only">Toggle navigation</span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
										<span className="icon-bar"></span>
									</button>
								</div>
								<div className="mainmenu pull-left">
									<ul className="nav navbar-nav collapse navbar-collapse">
										<li><Link to="/" className="active">Home</Link></li>
										<li className="dropdown"><Link to="#">Shop<i className="fa fa-angle-down"></i></Link>
											<ul role="menu" className="sub-menu">
												<li><Link to="/product/list">Products</Link></li>
												{/* <li><Link to="product-details.html">Product Details</Link></li> */}
												{/* <li><Link to="checkout.html">Checkout</Link></li> */}
												<li><Link to="/cart">Cart</Link></li>
												{/* <li><Link to="login.html">Login</Link></li> */}
											</ul>
										</li>
										<li><Link to="/blog/list">Blog</Link>
										</li>
										<li><Link to="404.html">404</Link></li>
										<li><Link to="contact-us.html">Contact</Link></li>
									</ul>
								</div>
							</div>
							<div className="col-sm-3">
								<div className="search_box pull-right">
									<input type="text" placeholder="Search" />
								</div>
							</div>
						</div>
					</div>
        )
    }
}
export default HeaderBottom