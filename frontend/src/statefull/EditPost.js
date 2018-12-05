import React from "react";

class EditPost extends React.Component {
  state = {};

  render() {
    return (
      <div className="list-group-item list-group-item-action flex-column align-items-start add-post-form">
        <form
          onSubmit={this.props.handleSubmitEdit}
          className="create-post-form"
        >
          <div className="create-post-details">
            <input
              value={this.props.title}
              onChange={event => this.props.handleChange(event, "title")}
              type="text"
              name="title"
              placeholder="Title"
            />
            <textarea
              value={this.props.body}
              onChange={event => this.props.handleChange(event, "body")}
              placeholder="Post content"
              name="body"
              rows="3"
              cols="50"
            />
            <button>Edit Post</button>
            <button onClick={this.props.cancelEdit}>Cancel</button>
          </div>
        </form>
      </div>
    );
  }
}

export default EditPost;
