import React from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment'

const Post = (props) => {
  const { post, index } = props  
  const UP = { option: "upVote" };
  const DN = { option: "downVote" };


  return (
    <li className="post">
      <div className="d-flex w-100 justify-content-between">
        <Link className="mb-1" to={`/${post.category}/${post.id}`}><h5><i className="fa fa-angle-right" aria-hidden="true"></i> {post.title}</h5></Link>
        {post.edited ? <small className="timestamp">{moment.utc(post.timestamp).format("ddd, MMM Do YYYY, h:mm a")}<strong><span className="orange-focus"> - Edited</span></strong></small>
          :
          <small className="timestamp">{moment.utc(post.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>}
      </div>
      {
        post.body.length > 75 ? <p className="mb-1">{post.body.substring(0, 75)}... <Link className="orange-focus" to={`/${post.category}/${post.id}`}><small>Read more.</small></Link></p>
          :
          <p className="mb-1">{post.body}</p>
      }
      <div className="details">
      <small className="post-details">Author: <strong>{post.author}</strong>&nbsp;&nbsp;&nbsp;<strong className="score">{post.voteScore}{post.voteScore === 1 || post.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong>&nbsp;&nbsp;&nbsp;<strong><span className="orange-focus"><i className="fa fa-tag" aria-hidden="true"></i> {post.category}</span></strong> <Link to={`/${post.category}/${post.id}`}>&nbsp;&nbsp;&nbsp;{post.comments.length} {post.comments.length === 1 ? "comment" : "comments"}</Link></small>
      <div className="btn-group" role="group" aria-label="up and downvote">
        <button onClick={() => props.ratePost(UP, post.id, index, props.sortFactor, post.voteScore + 1)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
        <button onClick={() => props.ratePost(DN, post.id, index, props.sortFactor, post.voteScore - 1)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
      </div>
      <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
        <button onClick={() => props.handleEdit(post, index)} type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button onClick={() => props.deletePost(post.id)} type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
      </div>
      </div>
    </li>
  );
}

export default Post;