import React from 'react';
import moment from 'moment'

const PostDetailed = (props) => {
  const { post, indexPost, UP, DN } = props  
 
  return (
    <li className="list-group-item list-group-item-action flex-column align-items-start border-radius">
      <div className="d-flex w-100 justify-content-between">
        <h5><i className="fa fa-angle-right" aria-hidden="true"></i> {post.title}</h5>
        {post.edited ? <small>{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="orange-focus"> - Edited</span></strong></small>
          :
          <small>{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
      </div>
      {
        <p className="mb-1-body">{post.body}</p>}
      <small className="post-details">Author: <strong>{post.author}</strong> • <strong className="score">{post.voteScore} {post.voteScore === 1 || post.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong> • <strong><span className="orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> {post.category}</span></strong> • {post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</small>
      <div className="btn-group" role="group" aria-label="up and downvote">
        <button onClick={() => props.ratePost(UP, post.id, indexPost, undefined, post.voteScore + 1)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
        <button onClick={() => props.ratePost(DN, post.id, indexPost, undefined, post.voteScore - 1)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
      </div>
      <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
        <button onClick={() => props.handleEditPost(post)} type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button onClick={() => props.deletePost(post.id)} type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
      </div>
    </li>
  );
}

export default PostDetailed;