import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createPost } from '../../WebAPI';
import { EditPost } from '../../components';

function NewPostPage() {
  const history = useHistory();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!title.trim() || !body.trim()) return;

    createPost({ title, body }).then(data => {
      if (!data.id) return;
      history.push(`/posts/${data.id}`);
    });
  };

  return <EditPost title={title} setTitle={setTitle} body={body} setBody={setBody} onPost={handleSubmit} submitButtonValue={'Post'} />
}

export default NewPostPage;
