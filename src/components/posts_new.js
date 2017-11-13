import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { createPost } from "../actions/index";

class PostsNew extends Component {
  renderField(field) {
    const { meta: { touched, error} } = field
    const className= `form-group ${touched && error ? 'has-danger' : ''}`
    
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type="text"
          {...field.input}
        />
         {/*Touched means the user has interacted with the field*/}
         <div className="text-help">
        {touched ? error : ""}
         </div>
      </div>
    )
  }
  
  onSubmit(values) {
    this.props.createPost(values, () => {
      this.props.history.push('/')
    })
  }
  
  render() {
    // HandleSubmit comes from redux-form
    const { handleSubmit } = this.props
    return (
      // Check if the form is fine and, in that case, submit it
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <Field
          label="Title"
          name="title"
          component={this.renderField}
        />
        <Field
          label="Categories"
          name="categories"
          component={this.renderField}
        />
        <Field
          label="Post Content"
          name="content"
          component={this.renderField}
        />
        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    )
  }
}

//Validation section

function validate(values) {
  const errors = {};
  
  // Validate the inputs from 'values'
  if (!values.title || values.title.length < 3) {
    errors.title = "Enter a title that is at least 3 characters long!"
  }
  if (!values.categories) {
    errors.categories = "Enter some categories"
  }
  if (!values.content) {
    errors.content = 'Enter some content please'
  }
  
  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  validate,
  form: 'PostsNewForm'
})(
  // In case you want to use both redux and react-form, you connect them passing
  // connect as the second argument of reduxForm
  connect(null, { createPost })(PostsNew)
)