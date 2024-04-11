import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import IPost from "../../interfaces/post/view/IPost";
import PostPreview from "../../components/post/preview/PostPreview";
import GetPostsService from "../../services/post/read/ReadPostsService";

const Home: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);

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
        >
          <PostPreview post={post} />
        </div>
      ))}
    </>
  );
};

export default Home;
