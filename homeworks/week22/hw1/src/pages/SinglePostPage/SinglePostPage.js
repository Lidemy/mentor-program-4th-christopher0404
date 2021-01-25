import React, { useState, useEffect, useContext } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts';
import { getSinglePost, deletePost } from '../../WebAPI';
import { ReactComponent as Dots } from '../../assets/images/dots.svg';

const Main = styled.main`
  flex-grow: 1;
  margin-bottom: 4rem;
`;

const Article = styled.article`
  height: 100%;
  max-width: 50rem;
  margin: 0 auto;
`;

const ArticleTitle = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 2.5rem;
  line-height: 1.5;
`;

const ArticleHeader = styled.header`
  position: relative;
  margin-bottom: 2rem;
`;

const ArticleAuthor = styled.h3`
  margin-bottom: 1rem;
  padding-right: 2rem;
  color: #81A1C1;
  font-size: 1.25rem;

  a:hover {
    text-decoration: underline;
  }
`;

const ArticleTime = styled.time`
  font-size: 1rem;
  color: rgba(171, 185, 207, 0.75);
`;

const ArticleContent = styled.p`
  font-size: 1.125rem;
  line-height: 2;
`;

const MoreOptionsButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  padding: 0.25rem;
`;

const MoreOptionsIcon = styled(Dots)`
  fill: #ECEFF4;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const Popover = styled.div`
  position: absolute;
  top: 2rem;
  right: 0;
  border: 1px solid #ECEFF4;
  border-radius: 0.5rem;
  background: #2E3440;
  box-shadow: 0px 1px 0.5rem #2E3440;
`;

const MoreOptionsList = styled.ul`
  padding: 0.5rem 0;
`;

const MoreOptionsItem = styled.li``;

const OptionButton = styled.button`
  border: none;
  padding: 0.5rem 1.5rem;
  width: 100%;
  font-size: 1rem;
  font-weight: 500;

  &:focus,
  &:hover {
    background-color: #ECEFF4;
    color: #2E3440;
  }
`;

function SinglePost({ post, user, onDelete }) {
  const [isMoreOptionsActive, setIsMoreOptionsActive] = useState(false);

  const handleMoreOptionsActive = () => {
    isMoreOptionsActive ? setIsMoreOptionsActive(false) : setIsMoreOptionsActive(true);
  }

  const removePopover = () => {
    setIsMoreOptionsActive(false);
  }

  if (!post) return null;

  return (
    <Article>
      <ArticleTitle>{post.title}</ArticleTitle>

      <ArticleHeader>
        <ArticleAuthor>
          <Link to={`/authors/${post.userId}`} replace>{post.user.nickname}</Link>
        </ArticleAuthor>
        <ArticleTime>{new Date(post.createdAt).toLocaleString()}</ArticleTime>

        {user && user.id === post.user.id &&
          <MoreOptionsButton aria-label="More options" title="More options" onClick={handleMoreOptionsActive}>
            <MoreOptionsIcon />
          </MoreOptionsButton>
        }

        {isMoreOptionsActive && <>
          <Overlay onClick={removePopover} />
          <Popover>
            <MoreOptionsList>
              <MoreOptionsItem>
                <Link to={`/posts/${post.id}/edit`}>
                  <OptionButton>Edit</OptionButton>
                </Link>
              </MoreOptionsItem>
              <MoreOptionsItem>
                <OptionButton onClick={onDelete}>Delete</OptionButton>
              </MoreOptionsItem>
            </MoreOptionsList>
          </Popover>
        </>}
      </ArticleHeader>

      <ArticleContent>{post.body}</ArticleContent>
    </Article>
  )
}

function SinglePostPage() {
  const history = useHistory();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [post, setPost] = useState();

  const handleDelete = () => {
    deletePost(id).then(() => {
      history.push('/articles');
    });
  };

  useEffect(() => {
    getSinglePost(id).then(post => setPost(post));
  }, [id]);

  return (
    <Main>
      <SinglePost post={post} user={user} onDelete={handleDelete} />
    </Main>
  );
}

export default SinglePostPage;
