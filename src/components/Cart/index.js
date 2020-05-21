import React from 'react';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import { AppContext } from '../../ContextApi/AppContext';
import CheckOut from './CheckOut';
class Cart extends React.Component {
    static contextType = AppContext;

    renderCartItem = () => {
        const carts = this.context.state.cart;
        if (Object.keys(carts).length > 0) {
            return Object.keys(carts).map((index, key) => {
                return (
                    <CartItem key={key} cart={carts[index]} />
                )
            })
        } else {
            return (
                <tr>
                    <td className="text-center" colSpan="6">
                        <h1>No cart Item</h1>
                    </td>
                </tr>
            )
        }
    }
    renderTotalPrice = () => {
        const cart = this.context.state.cart;
        let result = 0;
        if (Object.keys(cart).length > 0) {
             Object.keys(cart).map((index, key) => {
                if (cart[index].status == 2) {
                     result += (Number(cart[index].price) - Number(cart[index].sale)) * Number(cart[index].quantity);
                }
                 result += Number(cart[index].price) * Number(cart[index].quantity);
            })
        }
        return result;
    }
    render() {
        return (
            <div className="col-sm-9">
                <div className="breadcrumbs">
                    <ol className="breadcrumb">
                        <li><Link to="/">Home</Link></li>
                        <li className="active">Shopping Cart</li>
                    </ol>
                </div>
                <div className="table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr className="bg-primary">
                                <td className="text-center">Images</td>
                                <td className="text-center">Title</td>
                                <td className="text-center">Price</td>
                                <td className="text-center">Quantity</td>
                                <td className="text-center">Total</td>
                                <td>Action</td>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            {this.renderCartItem()}
                            <tr>
                                <td colSpan="3" className="text-center">
                                    <h3>Total Price:</h3>
                            </td>
                                <td colSpan="3" className="text-center">
                                    <h1>${this.renderTotalPrice()}</h1>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                {/* <CheckOut/> */}
            </div>

        )
    }
}
export default Cart