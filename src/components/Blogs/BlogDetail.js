import React from 'react';
import MenuLeft from '../Menus/MenuLeft';
import API from '../../Config/Api';
import { Link, withRouter } from 'react-router-dom';
import { BlogImage } from '../../Config/Constants';
import ListComments from '../Blogs/ListComments';
import CommentRelay from '../Blogs/CommentRelay';
import StarRatings from 'react-star-ratings';
import CheckLogin from '../../Config/CheckLogin';

class BlogDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            blogDetail: {},
            comments: [],
            id_comment: 0,
            prev: 0,
            next: 0,
            rating: 0,
            userLogin: new CheckLogin()
        }
        this.handleSetIdCommnet = this.handleSetIdCommnet.bind(this);
        this.handleUpdateComment = this.handleUpdateComment.bind(this);
        this.renderPage = this.renderPage.bind(this);
        this.changePage = this.changePage.bind(this);
    }
    componentDidMount() {
        API.get('/blog/detail/' + this.state.id)
            .then(res => {
                if (res.data.status === 200) {
                    this.setState({
                        blogDetail: res.data.data,
                        comments: res.data.data.comment,
                        prev: res.data.previous,
                        next: res.data.next
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
        API.get('/blog/rate/' + this.state.id)
            .then(res => {             
                if (res.data.response == 'success') {
                    if (Object.keys(res.data.data).length > 0) {
                        let totalRating = this.handleTotalRating(res.data.data);    
                                        
                        this.setState({
                            rating: totalRating
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err);

            })
    }
    handleTotalRating = (array) => {
        let totalRate = 0;
        Object.keys(array).map((value, index) => {
            totalRate += array[value].rate;
        })      
        
        return totalRate / Object.keys(array).length;
    }
    handleSetIdCommnet(id) {
        this.setState({
            id_comment: id
        })
    }
    handleUpdateComment(comment) {
        this.setState({
            comments: this.state.comments.concat(comment)
        })
    }
    changePage(e) {
        let id_page = e.target.getAttribute('data-id');
        if (id_page != null) {
            API.get('/blog/detail/' + id_page)
                .then(res => {
                    if (res.data.status === 200) {
                        this.setState({
                            blogDetail: res.data.data,
                            comments: res.data.data.comment,
                            prev: res.data.previous,
                            next: res.data.next
                        })
                    }
                })
                .catch(err => {
                    console.log(err);

                })
            API.get('/blog/rate/' + id_page)
                .then(res => {
                    if (res.data.response === 'success') {
                        if (res.data.data.length > 0) {
                            let totalRating = this.handleTotalRating(res.data.data);
                            this.setState({
                                rating: totalRating
                            })
                        }

                    }
                })
                .catch(err => {
                    console.log(err);

                })
            this.props.history.push('/blog/detail/' + id_page);
        }

    }

    renderPage() {
        return (
            <ul className="pager pull-right">
                <li><Link to="#" onClick={this.changePage} data-id={this.state.prev}>Pre</Link></li>
                <li><Link to="#" onClick={this.changePage} data-id={this.state.next}>Next</Link></li>
            </ul>
        )

    }
    changeRating = (newRating, name) => {
        let { userLogin } = this.state;
        let config = {
            headers: {
                'Authorization': 'Bearer ' + userLogin.getToken(),
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'

            }
        }
        if (userLogin.getIsLogin()) {
            let formData = new FormData();
            formData.append('user_id', userLogin.getProfile().id);
            formData.append('blog_id', this.state.id);
            formData.append('rate', newRating);
            API.post('/blog/rate/' + this.state.id, formData, config)
                .then(res => {
                    if (res.data.status === 200) {
                        this.setState({
                            rating: newRating
                        })                        
                    }
                })
                .catch(err => {
                    console.log(err);

                })
        } else {
            this.props.history.push("/login")
        }
    }

    render() {
        let object = this.state.blogDetail;
        return (           
                <div className="col-sm-9">                  
                        <div className="blog-post-area">
                            <h2 className="title text-center">Latest From our Blog</h2>
                            <div className="single-blog-post">
                                <h3>{object.title}</h3>
                                <div className="post-meta">
                                    <ul>
                                        <li><i className="fa fa-user"></i> Mac Doe</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <span>
                                        <StarRatings
                                            rating={this.state.rating}
                                            starRatedColor="yellow"
                                            changeRating={this.changeRating}
                                            numberOfStars={5}
                                            name='rating'
                                            starHoverColor="yellow"
                                        />
                                    </span>
                                </div>
                                <Link to="">
                                    <img src={BlogImage + object.image} alt="" />
                                </Link>
                                <p>{object.description}</p>
                                <p>{ String.fromCharCode(object.content)}</p>
                                <div className="pager-area">
                                    {this.renderPage()}
                                </div>
                            </div>

                        </div>
                        {/* rating block */}

                        <div className="rating-area">
                            <ul className="ratings">
                                <li className="rate-this">Rate this item:</li>
                                <li>
                                    <StarRatings
                                        rating={this.state.rating}
                                        starRatedColor="#FE980F"
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                </li>

                                <li className="color">( votes)</li>
                            </ul>
                            <ul className="tag">
                                <li>TAG:</li>
                                <li><Link className="color" to="">Pink <span>/</span></Link></li>
                                <li><Link className="color" to="">T-Shirt <span>/</span></Link></li>
                                <li><Link className="color" to="">Girls</Link></li>
                            </ul>
                        </div>
                        {/* end rating */}

                        {/* comment block */}
                        <ListComments
                            comments={this.state.comments}
                            updateIdComment={this.handleSetIdCommnet}
                        />
                        {/* end Comment block */}

                        {/* relay block */}
                        <CommentRelay
                            id_comment={this.state.id_comment}
                            id_blog={this.state.id}
                            updateListComment={this.handleUpdateComment}
                        />
                        {/* end  */}
                    </div>                
        )
    }
}
export default withRouter(BlogDetail)