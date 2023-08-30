import React, { useState, useEffect } from "react";
import AddPost from "./components/addPost";
import Post from "./components/post";

function App() {
  const [posts, setPosts] = useState([]);
  const API =
    "&api_key=live_Orpeue0bGfbaDCGkcgngK9yLg4GTSlDYfO4BpuZmcp5GStTktEjVPaltmaCa6b8A";

  const fetchPosts = async () => {
    const response = await fetch(
      `https://api.thecatapi.com/v1/images/search?limit=10&has_breeds=1${API}`
    );
    const data = await response.json();
    setPosts(data);
  };
  

  useEffect(() => {
    fetchPosts();
  }, []);

  const addPost = async (name, description, catId, randomCat) => {
    const newCatPost = {
      name: name,
      description: description,
      url: randomCat,
      id: catId,
      createdAt: Date.now(),
    };
    setPosts([newCatPost, ...posts]);
  };
  
  const deletePost = async (id) => {
    const deleteCat = posts.filter((post) => post.id !== id);
    setPosts(deleteCat);
  };

  const editPost = async (id, editedData) => {
    const updatedPosts = posts.map((post) =>
      post.id === id ? { ...post, ...editedData } : post
    );
    setPosts(updatedPosts);
  };

  return (
    <main>
      <h1>Rest API tutorial</h1>
      <AddPost addPost={addPost} />
      {/* <button onClick={} */}
      <section className="posts-container">
        <h2>Posts</h2>
        {posts.map((post) => (
          <Post
            img={post.url}
            key={post.id}
            id={post.id}
            name={
              post.breeds && post.breeds.length > 0
                ? post.breeds[0].name
                : post.name
            }
            description={
              post.breeds && post.breeds.length > 0
                ? post.breeds[0].description
                : post.description
            }
            deletePost={deletePost}
            editPost={editPost}
          />
        ))}
      </section>
    </main>
  );
}

export default App;
