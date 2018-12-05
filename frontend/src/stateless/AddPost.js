import React from "react";

const AddPost = (props) => {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
        <form onSubmit={props.handleSubmitAdd} className="create-post-form">
          <div className="create-post-details">
            <input type="text" name="author" placeholder="Username" />
            <input type="text" name="title" placeholder="Title" />
            <textarea placeholder="Post content" name="body" rows="3" cols="50" />
            <label>
              Category:
                    <select name="category">
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </select>
            </label>
            <button>Add Post</button>
            <button onClick={props.toggleAdd}>Cancel</button>
          </div>
        </form>
      </div>
    );
}

export default AddPost;
