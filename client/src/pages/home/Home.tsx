import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import IPost from "../../interfaces/post/view/IPost";
import PostPreview from "../../components/post/preview/PostPreview";
import GetPostsService from "../../services/post/read/ReadPostsService";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const response: IPost[] | null = await GetPostsService();

      if (response) {
        setPosts(response);
      }
    };

    fetch();
  }, []);

  return (
    <>
      <Navbar />
      <br/>
      {/* all posts  */}
      {posts.map((post: IPost, index: number) => (
        <div className="mx-48"
          key={index}
          onClick={() => {
            navigate(`/post/${post.Id}`);
          }}
        >
          <PostPreview post={post} />
        </div>
      ))}
    </>
  );
};

export default Home;
