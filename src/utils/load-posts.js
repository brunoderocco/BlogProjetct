export const loadPosts = async () => {
  const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
  const PhotosResponse = fetch('https://jsonplaceholder.typicode.com/photos');

  const [posts, photos] = await Promise.all([postsResponse, PhotosResponse]);

  const postsJson = await posts.json();
  const photosJson = await photos.json();

  const postsPhotos = postsJson.map((post, index) => {
    return { ...post, cover: photosJson[index].url }
  });

  return postsPhotos;

}