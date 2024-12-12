import React, { useState } from 'react';

const AddBlog = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    images.forEach((image) => {
      formData.append('images', image);
    });
    
    // Example: Replace with your API endpoint and POST logic
    fetch('/api/postBlog', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle success
        console.log('Blog posted successfully', data);
      })
      .catch((error) => {
        // Handle error
        console.error('Error posting blog:', error);
      });
  };

  return (
    <form className="bg-white w-[90vw] md:w-[50vw] p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
          Title
        </label>
        <input
          placeholder="Enter title"
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
          Content
        </label>
        <textarea
          rows="5"
          placeholder="Enter your content"
          id="content"
          value={content}
          onChange={handleContentChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        ></textarea>
      </div>
      <div className="mb-4">
        <label htmlFor="images" className="block text-gray-700 text-sm font-bold mb-2">
          Upload Images
        </label>
        <input
          type="file"
          id="images"
          multiple
          onChange={handleImageChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Post
        </button>
        <div className="flex items-center">
          <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current text-gray-700 mr-2">
            {/* Your SVG icons */}
          </svg>
        </div>
      </div>
    </form>
  );
};

export default AddBlog;
