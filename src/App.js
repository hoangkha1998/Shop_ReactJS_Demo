import React, { Component } from 'react';
import './App.css';
import Header from './Layouts/Header';
import Footer from './Layouts/Footer';

import { withRouter } from 'react-router-dom';
import MenuLeft from './components/Menus/MenuLeft';
import Slider from './components/Sliders/Slider';
import { AppContext } from './ContextApi/AppContext';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wishList: localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : {},
      numberWishList: localStorage.getItem('numberWishList') ? JSON.parse(localStorage.getItem('numberWishList')) : 0,
      cart: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {},
      numberCart: localStorage.getItem('numberCart') ? JSON.parse(localStorage.getItem('numberCart')) : 0    

    }
    // this.stateWishListContext = this.stateWishListContext.bind(this)
    // this.numberWishList = this.numberWishList.bind(this)
  }
  handleRenderMenu = () => {
    let route = this.props.location.pathname;
    return route.includes('account') ? '' : <MenuLeft />;
  }
  handleRenderSilder = () => {
    let route = this.props.location.pathname;
    return route == '/' ? <Slider /> : '';
  }
  stateWishListContext = (number) =>{    
    localStorage.setItem('numberWishList', JSON.stringify(number));   
    this.setState({
      numberWishList: number,
      wishList:JSON.parse(localStorage.getItem('wishList'))
    })
  }
  
  stateCartContext = (number) => {
    localStorage.setItem('numberCart', JSON.stringify(number));
    this.setState({
      numberCart: number,
      cart: JSON.parse(localStorage.getItem('cart'))
    })
  }
  render() {
    return (
      <div className="App">
        <AppContext.Provider value={{          
          state: this.state,
          numberWishList: this.stateWishListContext,
          numberCart:this.stateCartContext          

        }}>
          <Header />
          {/* slider */}
          {this.handleRenderSilder()}
          {/* endslider */}
          <div className="container">
            <div className="row">
              {this.handleRenderMenu()}
              {this.props.children}
            </div>
          </div>

          <Footer />
        </AppContext.Provider>

      </div >
    );
  }

}

export default withRouter(App);