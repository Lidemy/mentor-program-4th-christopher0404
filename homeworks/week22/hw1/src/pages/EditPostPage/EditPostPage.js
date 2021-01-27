import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getSinglePost, updatePost } from '../../WebAPI';
import { EditPost } from '../../components';

function EditPostPage() {
  const history = useHistory();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;

    updatePost(id, { title, body }).then(data => {
      if (!data.id) return;
      history.push(`/posts/${data.id}`);
    });
  };

  useEffect(() => {
    getSinglePost(id).then(post => {
      setTitle(post.title);
      setBody(post.body);
    });
  }, [id]);

  return <EditPost title={title} setTitle={setTitle} body={body} setBody={setBody} onPost={handleSubmit} submitButtonValue={'Update'} />
}

export default EditPostPage;
