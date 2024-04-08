import React from "react";
import Navbar from "../../../components/navbar/Navbar";
import CreatePostForm from "../../../components/post/create/CreatePost";

const Create: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="bg-slate-200 py-8 h-screen" style={{overflow: 'hidden'}}>
        <CreatePostForm />
      </div>
    </>
  );
};

export default Create;
