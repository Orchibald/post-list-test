import React from "react";
import { Post } from "../../types/Post";
import './PostDetails.scss';

type Props = {
  post: Post;
  onClose: () => void;
};

export const PostDetails: React.FC<Props> = ({ post, onClose }) => {
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">User#{post.userId}</p>
        </header>
        <section className="modal-card-body">
          <p className="modal-card-title post">{post.title}</p>

          {post.body}
        </section>
        <footer className="modal-card-foot">
          <button className="button is-success" onClick={onClose}>Close</button>
        </footer>
      </div>
    </div>
  );
};