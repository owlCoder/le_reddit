import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CreatePostForm from "../../components/post/create/CreatePost";

const Create: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-primary-200 py-12">
        <CreatePostForm />
      </div>
    </>
  );
};

export default Create;
