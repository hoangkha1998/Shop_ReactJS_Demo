import React from 'react';
import { Link } from 'react-router-dom';
import BlogItem from './BlogItem';
import API from '../../Config/Api'
class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listBlogs: []
        }
    }
    componentDidMount() {
        API.get('/blog')
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({
                        listBlogs: res.data.blog.data
                    })
                }
            })
            .catch(err => {
                console.log(err);

            })

    }
    render() {

        return (
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {this.state.listBlogs.map((value, index) => {
                        return (
                            <BlogItem key={index} BlogItem={value} />
                        )
                    })}

                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><Link to="" className="active">1</Link></li>
                            <li><Link to="">2</Link></li>
                            <li><Link to="">3</Link></li>
                            <li><Link to=""><i className="fa fa-angle-double-right"></i></Link></li>
                        </ul>
                    </div>
                </div>
            </div>

        )
    }
}
export default Blog