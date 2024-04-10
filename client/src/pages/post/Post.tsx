import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import IPost from "../../interfaces/post/view/IPost";
import NoComments from "../../components/comment/empty/NoComments";
import CreateCommentForm from "../../components/comment/create/Comment";
import emptyPost from "../../samples/post/DefaultPost";
import { useParams } from "react-router-dom";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";

const Post: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost>(emptyPost);
  const content: string = `# Heading 1
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*
    This is a paragraph of text.
    
    **Bold text**
    
    *Italic text*

    `;

  useEffect(() => {
    console.log(content);
    // Fetch post data by post_id
    console.warn(id);
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-12">
        <div className="w-full max-w-screen-lg">
          <div className="p-4">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 text-black bg-gray-300/50 p-2 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <img
                className="w-8 h-8 rounded-full"
                src="https://www.gravatar.com/avatar/00000000000000000000000000000000?d=robohash&f=y"
                alt="Profile"
              />
              <div>
                <p className="text-sm font-semibold">r/kovin</p>
                <p className="text-xs text-gray-500">ludjo_01</p>
              </div>
            </div>
          </div>

          <h1 className="font-semibold text-3xl pb-4 pl-4">
            {post.title}
          </h1>
          {/* Post content */}
          <div className="p-4">
            <MDXEditor
              readOnly
              markdown={content}
              className="h-40 w-full focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500"
              plugins={[
                // Example Plugin Usage
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
              ]}
            />
          </div>
          <br />
          <hr className="h-0.5 bg-gray-100 border-0 dark:bg-gray-100" />

          {/* Comment form */}
          <div className="p-4">
            <CreateCommentForm post={post} />
          </div>
          <div className="p-4">
            {/* Render no comments if there are no comments */}
            {post.comments.length === 0 ? <NoComments /> : null}
            {/* You can add comment components with map and for each here */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
