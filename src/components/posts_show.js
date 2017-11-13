import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPost, deletePost } from '../actions/index'

class PostsShow extends Component {
  componentDidMount() {
    // Provided by react-router
    // match is the parent object
    // params includes all the wildcards we can use (specified with :WILDCARD, in this case :id)
    
    if (!this.props.post){
      const { id } = this.props.match.params
      this.props.fetchPost(id)
    }
  }
  
  onDeleteClick = () => {
    const { id } = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }
  
  render() {
    const { post } = this.props
    
    if (!post) {
      return <div>Loading...</div>
    }
    
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.onDeleteClick}
        >Delete</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

// mapStateToProps can accept a second argument
// the first one is our application's state
// the second argument, ownProps, is the props object headed to the component
function mapStateToProps({ posts }, ownProps) {
  return{ post: posts[ownProps.match.params.id] }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)