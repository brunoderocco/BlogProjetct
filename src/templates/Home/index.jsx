import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/button';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
  }

  async componentDidMount() {
    await this.loadPosts();
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsPhotos = await loadPosts();
    this.setState({
      posts: postsPhotos.slice(page, postsPerPage),
      allPosts: postsPhotos,
    });
  }

  loadMorePosts = () => {
    const { page, postsPerPage, allPosts } = this.state;
    const newPostsPerPage = postsPerPage + 10;

    this.setState({
      posts: allPosts.slice(page, newPostsPerPage),
      postsPerPage: newPostsPerPage,
    });
  }

  render() {
    const { posts, postsPerPage, allPosts } = this.state;
    const noMorePosts = postsPerPage >= allPosts.length;

    return (
      <section className='container' >
        <Posts posts={posts} />
        <div className='button-container'>
          <Button onClick={this.loadMorePosts}
            disabled={noMorePosts} />
        </div>
      </section>
    );
  }
}
