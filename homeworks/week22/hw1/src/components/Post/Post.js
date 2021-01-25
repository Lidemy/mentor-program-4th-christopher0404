import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Article = styled.article`
  margin-bottom: 3.5rem;
`;

const ArticleTitle = styled.h2`
  margin-bottom: 0.5rem;
  font-size: 1.75rem;
  line-height: 1.5;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  a:hover {
    color: rgba(236, 239, 244, 0.75);
  }
`;

const ArticleAuthor = styled.h3`
  margin-bottom: 1rem;
  color: #81A1C1;
  font-size: 1.25rem;
  overflow-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;

  a:hover {
    text-decoration: underline;
  }
`;

const ArticleTime = styled.time`
  color: rgba(171, 185, 207, 0.75);
  font-size: 1rem;
`;

function Post({ post, author }) {
  return (
    <Article>
      <ArticleTitle>
        <Link to={`/posts/${post.id}`}>{post.title}</Link>
      </ArticleTitle>
      <ArticleAuthor>
        <Link to={`/authors/${post.userId}`} replace>{author}</Link>
      </ArticleAuthor>
      <ArticleTime>{new Date(post.createdAt).toDateString()}</ArticleTime>
    </Article>
  )
}

export default Post;
