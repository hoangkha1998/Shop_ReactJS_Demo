import React from 'react';
import { AppContext } from '../../ContextApi/AppContext';
import WishListItem from './WishListItem';
class WishList extends React.Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            // wishLists: localStorage.getItem('wishList') ? JSON.parse(localStorage.getItem('wishList')) : {}
        }
    }
    renderWishList = () => {
        const wishLists = this.context.state.wishList;      
        if (Object.keys(wishLists).length > 0) {
            return(               
                Object.keys(wishLists).map((index, key) => {
                    return (                        
                        <WishListItem key={key} item={wishLists[index]}/>                      
                    )
                })
            )           
        }
        return(
            <h1 className="text-center">No wishList</h1>
        )
    }
    render() {
        return (
            <div className="features_items">
                <h2 className="title text-center">My WishLists</h2>               
                {this.renderWishList()}
            </div>
        )
    }
}
export default WishList