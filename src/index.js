import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Home from './components/Home/index';
import Account from './components/Account';
import Login from './components/Member/Login';
import Blog from './components/Blogs/Blog';
import BlogDetail from './components/Blogs/BlogDetail';
import WishList from './components/WishList';
import Cart from './components/Cart';
import ProductDetail from './components/Home/ProductDetail';
import ProductList from './components/Home/ProductList';


ReactDOM.render(
  <div>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/login' component={Login} />
          <Route path="/blog/list" component={Blog} />
          <Route path="/blog/detail/:id" component={BlogDetail} />
          <Route path="/wishlist" component={WishList} />
          <Route path="/product/detail/:id" component={ProductDetail} />
          <Route path="/product/list" component={ProductList} />
          <Route path="/cart" component={Cart} />
          <Route component={Account} />
          
        </Switch>
      </App>
    </Router>
  </div>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
