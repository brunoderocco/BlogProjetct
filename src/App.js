import { Component } from 'react';

import './App.css';

import { loadPosts } from './utils/load-posts';
import { Posts } from './components/posts';

class App extends Component {
  state = {
    posts: []
  }

  async componentDidMount() {
    await this.loadPosts();
  };

  loadPosts = async () => {
    const postsPhotos = await loadPosts();
    this.setState({ posts: postsPhotos });
  }

  render() {
    const { posts } = this.state;

    return (
      <section className='container' >
        <Posts posts={posts} />
      </section>
    );
  }
}

export default App;
