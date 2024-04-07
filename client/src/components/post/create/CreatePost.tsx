import React, { useState } from 'react';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import * as marked from 'marked'; // Import marked as a named import

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleEditorChange = ({ text }: { text: string }) => {
    setContent(text);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can implement your logic to handle form submission
    console.log('Title:', title);
    console.log('Content:', content);
    // Reset form fields after submission
    setTitle('');
    setContent('');
  };

  // Custom function to convert Markdown to HTML
  const renderHTML = (markdownText: string) => {
    return marked.parse(markdownText);
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <div className="mt-1">
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <div className="mt-1">
            <MdEditor
              value={content}
              style={{ height: '200px' }} // Adjust height as needed
              onChange={handleEditorChange}
              renderHTML={renderHTML}
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostForm;
