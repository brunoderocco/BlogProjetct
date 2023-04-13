import { useCallback, useEffect, useState } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/load-posts';
import { Posts } from '../../components/posts';
import { Button } from '../../components/button';
import { TextInput } from '../../components/textInput';


export const Home = () => {

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [searchFor, setSearchFor] = useState('');

  const noMorePosts = postsPerPage >= allPosts.length;

  const filteredPosts = !!searchFor ?
    allPosts.filter(post => {
      return post.title.toLowerCase().includes(searchFor.toLowerCase());
    })
    :
    posts;

  const handleSearch = (e) => {
    const { value } = e.target;

    setSearchFor(value);
  };

  const loadMorePosts = () => {
    const newPostsPerPage = postsPerPage + 10;

    setPosts(allPosts.slice(page, newPostsPerPage));
    setPostsPerPage(newPostsPerPage);

  }

  const handleloadPosts = useCallback(async (page, postsPerPage) => {
    const postsPhotos = await loadPosts();

    setPosts(postsPhotos.slice(page, postsPerPage));
    setAllPosts(postsPhotos);
  }, []);

  useEffect(() => {
    console.log('oi');
    handleloadPosts(page, postsPerPage);
  }, [handleloadPosts, page, postsPerPage]);


  return (

    <section className='container' >

      <div className='search-container'>
        <TextInput
          searchFor={searchFor}
          handleChange={handleSearch} />

      </div>

      {filteredPosts.length > 0 && (
        <Posts posts={filteredPosts} />
      )
      }

      {filteredPosts.length === 0 && (
        <h1>No posts found! =/</h1>
      )
      }

      <div className='button-container'>
        {!searchFor && (
          <>
            <Button onClick={loadMorePosts}
              disabled={noMorePosts} />
          </>
        )}
      </div>
    </section >
  );

}