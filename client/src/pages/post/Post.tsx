import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import IPost from "../../interfaces/post/view/IPost";
import NoComments from "../../components/comment/empty/NoComments";
import CreateCommentForm from "../../components/comment/create/Comment";
import emptyPost from "../../samples/post/DefaultPost";
import { useParams } from "react-router-dom";

const Post: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [post, setPost] = useState<IPost>(emptyPost)

  useEffect(() => {
    // get post by post_id
    alert(id);
  }, [id]);

  return (
    <>
      <Navbar />
      {/* create comment form */}
      <CreateCommentForm post={post} />
      {/* post content parsed */}
      {post.comments.length === 0 ? <NoComments /> : <></>}{" "}
      {/* add comment component with map and for each */}
    </>
  );
};

export default Post;
