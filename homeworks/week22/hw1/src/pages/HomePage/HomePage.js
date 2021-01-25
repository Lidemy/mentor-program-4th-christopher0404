import React, { useState, useEffect } from 'react';
import { getAllPosts } from '../../WebAPI';
import { MainLayout } from '../../layouts';
import { Post } from '../../components';

function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getAllPosts().then(posts => setPosts(posts));
  }, []);

  return (
    <MainLayout>
      {posts.map(post => (
        <Post key={post.id} post={post} author={post.user.nickname} />
      ))}
    </MainLayout>
  );
}

export default HomePage;
