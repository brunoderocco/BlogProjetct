import './styles.css';

export const PostCard = (props) => {

  //const {post} = props;

  const post = {
    id: props.id,
    title: props.title,
    body: props.body,
    cover: props.cover,
  };


  return (

    <div className='post'>
      <img src={post.cover} alt={post.title} />
      <div className='post-content'>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </div>
    </div>
  );
}