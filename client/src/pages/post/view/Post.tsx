import React from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../../components/navbar/Navbar";
import Post from "../../../components/post/view/Post";

const PostPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-12">
        <div className="w-full max-w-screen-lg">
          <Post postId={id} />
        </div>
      </div>
    </>
  );
};

export default PostPage;
