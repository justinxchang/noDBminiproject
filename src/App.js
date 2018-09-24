//weather, date, location, emoji

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import Emoji from './Components/Emoji.js';
import Header from './Components/Header.js'


class App extends Component {
  constructor() {
    super();

    this.state = {
      post: '',
      date: '',
      posts: [],
      edit: ''
    }
  }

  handleNewPost(value) {
    this.setState({
      post: value
    }) 
  }

  handlePostChange(value){
    this.setState({
      edit: value
    })
  }

  componentDidMount(){
    axios.get('/api/posts')
         .then(res => this.setState({posts: res.data}))
  }

  addPost() {
    const newPost = {post: this.state.post};
    axios.post('/api/posts', newPost)
         .then(res => this.setState({posts: res.data}))
  }

  editPost(id) {
    axios.put(`/api/posts/${id}`, {text: this.state.edit})
         .then(res => this.setState({posts: res.data}))
  }

  deletePost(id){
    axios.delete(`/api/posts/${id}`)
         .then(res => this.setState({posts: res.data}))
  }
  render() {
    const posts = this.state.posts.map((post) => {
      return (
        <div className="post" key={post.id}>
          <h5>{post.post}</h5>
          <div class="editDelete">
            <button className="button" onClick={() => this.editPost(post.id)}>Edit</button>
            <button className="button" onClick={() => this.deletePost(post.id)}>Delete</button>
          </div>
          {/* <figure> 
          </figure>       */}
        </div>
      )
    })

    return (
      <div className="App">
        <Header />
        <section>
          <div className="inputs">
            <label>
              Post: <input value={this.state.post} onChange={(event) => {this.handleNewPost(event.target.value)}} placeholder="Type your thoughts here"/>
            </label>
            <label>
              Edit: <input value={this.state.edit} onChange={(event) => {this.handlePostChange(event.target.value)}} placeholder='Type your revised thought. Click "Edit"'/>
            </label>
          </div>
          <button className="add" onClick={() => {this.addPost()}}>Add Post</button>
        </section>
        <div className="posts">
          <Emoji className="emoji"/>
          {posts}

          {/* <img className="emoji" src="https://cdn.shopify.com/s/files/1/1061/1924/files/Thinking_Face_Emoji.png?9898922749706957214"></img> */}

        </div>
      </div>
    );
  }
}


export default App;

