import React, { useState } from "react";
import { ContentType } from "../../types/ContentType";
import { Post } from "../../types/Post";
import './TitleBox.scss';
import { PostDetails } from "../PostsList/PostDetails";

type Props = {
  posts: Post[];
  type: ContentType;
  onDeletePost: (postId: number) => void;
};

export const TitleBox: React.FC<Props> = ({ posts, type, onDeletePost }) => {
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  };

  const handleDeletePost = (postId: number) => {
    onDeletePost(postId); // Викликайте проп для видалення посту
  };

  return (
    <div className="container">
      {posts.map((post) => (
        <div key={post.id} className="card">
          <div className="card-content">
            <div className="media">
              <div className="media-content">
                <p className="title is-4">{post.title}</p>
                <p className="subtitle is-6">{post.body}</p>
              </div>
            </div>
            <div className="buttons">
              <button className="button is-info is-outlined" onClick={() => openModal(post)}>Read</button>
              {type === ContentType.MyBlock && (
                <button className="button is-danger is-outlined" onClick={() => handleDeletePost(post.id)}>Delete</button>
              )}
            </div>
          </div>
        </div>
      ))}
      {isModalOpen && selectedPost && (
        <PostDetails post={selectedPost} onClose={closeModal} />
      )}
    </div>
  );
};