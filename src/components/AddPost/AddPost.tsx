import { useState } from "react";
import { Post } from "../../types/Post";

export const AddPost: React.FC<{ onAddPost: (post: Post) => void }> = ({ onAddPost }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newPost: Post = {
      id: Date.now(),
      title,
      body,
      userId: 0
    };
    onAddPost(newPost);
    setTitle('');
    setBody('');
  };

  return (
    <form className="box" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Hello world"
          />
        </div>
      </div>

      <div className="field">
        <label className="label">Body</label>
        <div className="control">
          <textarea
            className="textarea"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="e.g. Lorem ipsum dolor sit amet"
          ></textarea>
        </div>
      </div>

      <button className="button is-success" type="submit">Add post</button>
    </form>
  );
};