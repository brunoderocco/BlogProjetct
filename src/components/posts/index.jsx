
import { PostCard } from '../postcard';

export const Posts = (props) => {
  const posts = props.posts;
  return (
    <div className='posts'>
      {posts.map(post => (
        <PostCard
          key={post.id}
          title={post.title}
          body={post.body}
          id={post.id}
          cover={post.cover}
        //post={post}
        />
      ))}
    </div>
  );
}
