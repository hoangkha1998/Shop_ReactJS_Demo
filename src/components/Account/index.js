import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from 'react-router-dom';
import App from './App';
import Profile from './Profile'
import ListProduct from '../Product/ListProduct';
import AddProduct from '../Product/AddProduct';
import EditProduct from '../Product/EditProduct';

class Index extends React.Component {
    render() {
        return (
            <Router>
                <App>
                    <Switch>
                        {/* <Route path="/account/profile" component={Profile} /> */}
                        <Route path="/account/product/list" component={ListProduct} />
                        <Route path="/account/product/add" component={AddProduct} />
                        <Route path="/account/product/edit/:id" component={EditProduct} />
                    </Switch>
                </App>
            </Router>
        )

    }
}
export default Index