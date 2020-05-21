import React from 'react';
import { Link } from 'react-router-dom';
import ProductItem from './ProductItem';
import API from '../../Config/Api';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            listProduct: []
        })
    }
    componentDidMount() {
        API.get('/product')
            .then(res => {
                if (res.data.response == 'success') {
                    this.setState({
                        listProduct: res.data.data
                    })
                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    renderListProduct = () => {
        var { listProduct } = this.state;
        if (listProduct.length > 0) {
            return listProduct.map((value, index) => {
                return (
                    <ProductItem key={index} product={value}/>
                )
            })
        }
    }
    render() {        
        return (
            <div className="features_items">
                <h2 className="title text-center">Features Items</h2>
                {this.renderListProduct()}               
            </div>
        )
    }
}
export default Home