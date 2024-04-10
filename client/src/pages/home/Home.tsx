import React from "react";
import Navbar from "../../components/navbar/Navbar";
import CreateCommentForm from "../../components/comment/create/Comment";

const Home: React.FC = () => {

  return (
    <>
      <Navbar />
      <CreateCommentForm id="1" author="me" title="" hasImage={false} imageBlobUrl="dsds" comments={[]} content="1" />

     
    </>
  );
};

export default Home;
