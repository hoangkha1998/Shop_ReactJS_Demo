import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import { AvatarImage } from '../../Config/Constants'
class ListComments extends React.Component {
    constructor(props) {
        super(props);   
        
        this.handleReplay = this.handleReplay.bind(this);
        this.renderListCmt = this.renderListCmt.bind(this);
    }   
    handleReplay(e){
        let id_comment = e.target.getAttribute('data-id-comment');
        if(id_comment){
            this.props.updateIdComment(id_comment);
        }     

    }
    renderListCmt() {
        let {comments} = this.props;           
        return comments.map((value,index)=>{
                if(value.id_comment == 0){
                    return (
                        <div key={index}>
                            <li className="media">
                                <Link className="pull-left" to="#">
                                    <img className="media-object" src={AvatarImage + value.image_user} alt="" width="150px" height="auto" />
                                </Link>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user"></i>{value.name_user}</li>
                                        <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                        <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                    </ul>
                                    <p>{value.comment}</p>                        
                                    <button className="btn btn-primary" onClick={this.handleReplay} data-id-comment={value.id}><i className="fa fa-reply"></i>Replay</button>
                                </div>
                            </li>
                        {comments.map((comment, index) => {
                            if (comment.id_comment == value.id) {
                                return (
                                    <li key={index} className="media second-media">
                                        <Link className="pull-left" to="#">
                                            <img className="media-object" src={AvatarImage + comment.image_user} alt="" width="150px" height="auto" />
                                        </Link>
                                        <div className="media-body">
                                            <ul className="sinlge-post-meta">
                                                <li><i className="fa fa-user"></i>{comment.name_user}</li>
                                                <li><i className="fas fa-clock"></i> 1:33 pm</li>
                                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                                            </ul>
                                            <p>{comment.comment}</p>                                   
                                            <button className="btn btn-primary" onClick={this.handleReplay} data-id-comment={comment.id_comment}><i className="fa fa-reply"></i>Replay</button>
                                        </div>
                                    </li>
                                )
                            }
                        })}
                    </div>
                       
                    )
                }
                
            })
      
    }
    render() {        
       
        return (
            <div className="response-area text-left">
                <h2>{this.props.comments.length} RESPONSES</h2>
                <ul className="media-list">       
                    {this.renderListCmt()}
                </ul>
            </div>
            
        )
    }
}
export default ListComments