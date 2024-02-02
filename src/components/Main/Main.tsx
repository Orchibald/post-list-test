import React, { useState, useEffect } from "react";
import { Post } from "../../types/Post";
import { TitleBox } from "../TitleBox/TitleBox";
import './Main.scss';
import { ContentType } from "../../types/ContentType";
import { AddPost } from "../AddPost/AddPost";

export const Main: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedContentType, setSelectedContentType] = useState<ContentType | null>(ContentType.NASA);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);

  const nasa: Post[] = [
    {
      userId: 1,
      id: 1,
      title: "Krym NASA",
      body: "Ялта. Лето. 2012"
    },
    {
      userId: 2,
      id: 2,
      title: "elon mask ne NASA",
      body: "Осень. Симферополь. 2014"
    },
  ]

  useEffect(() => {
    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Post[] = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Помилка:', error);
      }
    };

    fetchData();
  }, []);

  const handleContentTypeChange = (contentType: ContentType) => {
    setSelectedContentType(contentType);
    setIsDropdownVisible(false); // Ховаємо випадаючий список після вибору
  };

  const toggleDropdownVisibility = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const openAddPostModal = () => {
    setIsAddPostModalOpen(true);
  };

  const closeAddPostModal = () => {
    setIsAddPostModalOpen(false);
  };

  const handleAddPost = (post: Post) => {
    setPosts([...posts, post]);
    closeAddPostModal();
  };

  const handleDeletePost = (postId: number) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== postId));
  };

  return (
    <div className="main-container">
      <div className={`dropdown ${isDropdownVisible ? 'is-active' : ''}`}>
        <div className="flex-container">
          <div className="dropdown-trigger">
            <button className="button" aria-haspopup="true" aria-controls="dropdown-menu" onClick={toggleDropdownVisibility}>
              <span>{selectedContentType ? `${selectedContentType}` : 'Choose feeds list'}</span>
              <span className="icon is-small">
                <i className="fas fa-angle-down" aria-hidden="true"></i>
              </span>
            </button>
            {selectedContentType === ContentType.MyBlock && (
              <button className="button is-success is-outlined" onClick={openAddPostModal}>Add post</button>
            )}
          </div>
          <div className="dropdown-menu" id="dropdown-menu" role="menu">
            <div className="dropdown-content">
              <a href="#" className="dropdown-item" onClick={() => handleContentTypeChange(ContentType.NASA)}>
                {ContentType.NASA}
              </a>
              <a className="dropdown-item" onClick={() => handleContentTypeChange(ContentType.MyBlock)}>
                {ContentType.MyBlock}
              </a>
            </div>
          </div>
        </div>
      </div>

      {selectedContentType === ContentType.MyBlock && (
        <TitleBox type={selectedContentType} posts={posts} onDeletePost={handleDeletePost}/>
      )}
      {selectedContentType === ContentType.NASA && (
        <TitleBox type={selectedContentType} posts={nasa} onDeletePost={handleDeletePost}/>
      )}

      {isAddPostModalOpen && (
        <div className="modal is-active">
          <div className="modal-background" onClick={closeAddPostModal}></div>
          <div className="modal-card">
            <header className="modal-card-head">
              <p className="modal-card-title">Add Post</p>
              <button className="delete" aria-label="close" onClick={closeAddPostModal}></button>
            </header>
            <section className="modal-card-body">
              <AddPost onAddPost={handleAddPost} />
            </section>
          </div>
        </div>
      )}
    </div>
  );
};
