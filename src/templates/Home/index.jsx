import { Component } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/button';
import { TextInput } from '../../components/textInput';

export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchFor: '',
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

  handleSearch = (e) => {
    const { value } = e.target;
    this.setState({
      searchFor: value
    });
  }

  render() {
    const { posts, postsPerPage, allPosts, searchFor } = this.state;
    const noMorePosts = postsPerPage >= allPosts.length;

    const filteredPosts = !!searchFor ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(searchFor.toLowerCase());
      })
      :
      posts;

    return (
      <section className='container' >

        <div className='search-container'>
          <TextInput
            searchFor={searchFor}
            handleChange={this.handleSearch} />

        </div>

        {filteredPosts.length > 0 && (
          <Posts posts={filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <h1>No posts found! =/</h1>
        )}
        <div className='button-container'>
          {!searchFor && (
            <>
              <Button onClick={this.loadMorePosts}
                disabled={noMorePosts} />
            </>
          )}
        </div>
      </section>
    );
  }
}
