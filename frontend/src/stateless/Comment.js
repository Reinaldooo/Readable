import React from 'react';
import moment from 'moment'

const Comment = (props) => {
  const { comment, UP, DN, indexComment, indexPost, post } = props
  return (
    <li className="list-group-item list-group-item-action flex-column align-items-start comments">
      <div className="d-flex w-100 justify-content-between">
        <small className="post-details">Comment by: <strong>{comment.author}</strong></small>
        <small>{moment.utc(comment.timestamp).format("ddd, MMMM Do YYYY, h:mm a")}</small>
      </div>
      <p className="mb-1-body"><i className="fa fa-angle-right" aria-hidden="true"></i> {comment.body}</p>
      <small className="post-details"><strong className="score">{comment.voteScore} {comment.voteScore === 1 || comment.voteScore === -1 ? <span className="post-count">point</span> : <span className="post-count">points</span>}</strong></small>
      <div className="btn-group" role="group" aria-label="up and downvote">
        <button onClick={() => props.rateComment(UP, comment.id, indexComment, indexPost)} type="button" className="button"><i className="fa fa-thumbs-up" aria-hidden="true"></i></button>
        <button onClick={() => props.rateComment(DN, comment.id, indexComment, indexPost)} type="button" className="button"><i className="fa fa-thumbs-down" aria-hidden="true"></i></button>
      </div>
      <div className="btn-group btn-custom" role="group" aria-label="Edit and Delete">
        <button onClick={() => props.handleEditComment(comment, indexComment, post)} type="button" className="button"><i className="fa fa-pencil-square-o" aria-hidden="true"></i></button>
        <button onClick={() => props.deleteComment(comment.id, indexComment, indexPost)} type="button" className="button delete"><i className="fa fa-trash-o" aria-hidden="true"></i></button>
      </div>
    </li>
  );
}

export default Comment;