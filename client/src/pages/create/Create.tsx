import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CreatePostForm from "../../components/post/create/CreatePost";

const Create: React.FC = () => {

  return (
    <>
      <Navbar />
      <CreatePostForm />
    </>
  );
};

export default Create;
