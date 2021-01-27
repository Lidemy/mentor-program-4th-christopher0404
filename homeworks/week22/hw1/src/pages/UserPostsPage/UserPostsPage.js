import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getUserPosts } from '../../WebAPI';
import { MainLayout } from '../../layouts';
import { Post } from '../../components';

const Author = styled.h1`
  margin-bottom: 3.5rem;
  color: #8FBCBB;
  font-size: 2.5rem;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
`;

function UserPostsPage() {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [author, setAuthor] = useState();

  useEffect(() => {
    getUserPosts(userId).then(user => {
      setPosts(user.posts.sort((a, b) => b.createdAt - a.createdAt));
      setAuthor(user.nickname);
    });
  }, [userId]);

  return (
    <MainLayout>
      <Author>{author}</Author>
      {posts.map(post => (
        <Post key={post.id} post={post} author={author} />
      ))}
    </MainLayout>
  );
}

export default UserPostsPage;
