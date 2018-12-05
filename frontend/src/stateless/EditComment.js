import React from 'react';

const EditComments = (props) => {
  return ( 
    <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
    <form onSubmit={props.handleSubmitEditComment} className="create-post-form">
      <div className="create-post-details">
        <textarea value={props.body} onChange={(e) => props.handleChange(e)} placeholder="Post content" name="body" rows="3" cols="50" />
        <button>Edit Comment</button>
        <button onClick={props.cancelCommentEditOrAdd}>Cancel</button>
      </div>
    </form>
  </div>
  );
}
 
export default EditComments;