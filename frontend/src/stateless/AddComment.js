import React from 'react';

const AddComment = (props) => {
  return ( 
    <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
      <form onSubmit={props.handleSubmitAdd} className="create-post-form">
        <div className="create-post-details">
          <input type="text" name="author" placeholder="Username" />
          <textarea placeholder="Comment" name="body" rows="3" cols="50" />
          <button>Add Comment</button>
          <button onClick={props.cancelCommentEditOrAdd}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
 
export default AddComment;