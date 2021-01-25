import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { getLimitedPosts } from '../../WebAPI';
import { MainLayout } from '../../layouts';
import { Post } from '../../components';

const ArticlesSection = styled.section`
  margin-bottom: 4.5rem;
`;

const Pagination = styled.nav``;

const PaginationList = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PaginationItem = styled.li`
  margin: 0.25rem;
`;

const PaginationLink = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(171, 185, 207, 0.75);
  border-radius: 32rem;
  width: 2.5rem;
  height: 2.5rem;
  font-weight: 500;

  &:focus,
  &:hover {
    background-color: #4C566A;
  }
`;

function ArticlesPage() {
  const { page } = useParams();
  const [limitedposts, setLimitedPosts] = useState([]);
  const [postsCount, setPostsCount] = useState();
  const [pagesNumbers, setPagesNumbers] = useState([]);

  useEffect(() => {
    getLimitedPosts(page).then(res => {
      setPostsCount(res.headers.get('X-Total-Count'));
      setPagesNumbers(Array.from({ length: Math.ceil(postsCount / 5) }, (_, i) => i + 1));
      return res.json();
    }).then(posts => setLimitedPosts(posts));
  }, [page, postsCount]);

  return (
    <MainLayout>
      <ArticlesSection>
        {limitedposts.map(post => (
          <Post key={post.id} post={post} author={post.user.nickname} />
        ))}
      </ArticlesSection>

      <Pagination aria-label="pagination">
        <PaginationList>
          {pagesNumbers.map(pageNumber => (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                to={`/articles/${pageNumber}`}
                activeStyle={{ background: '#ECEFF4', color: '#2E3440' }}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          ))}
        </PaginationList>
      </Pagination>
    </MainLayout>
  );
}

export default ArticlesPage;
