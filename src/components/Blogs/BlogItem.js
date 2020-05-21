import React from 'react';
import { Link ,withRouter} from 'react-router-dom';
import { BlogImage } from '../../Config/Constants'
class BlogItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="single-blog-post">
                <h3>{this.props.BlogItem.title}</h3>
                <div className="post-meta">
                    <ul>
                        <li><i className="fa fa-user"></i> Mac Doe</li>
                        <li><i className="fa fa-clock-o"></i> {this.props.BlogItem.created_at}</li>
                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                    </ul>
                    <span>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star"></i>
                        <i className="fa fa-star-half-o"></i>
                    </span>
                </div>
                <Link to="">
                    <img src={BlogImage + this.props.BlogItem.image} alt="" />
                </Link>
                <p>{this.props.BlogItem.description}</p>
                <Link className="btn btn-primary" to={'/blog/detail/'+this.props.BlogItem.id}>Read More</Link>
            </div>
        )
    }
}
export default BlogItem