import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import useAuth from "../../../contexts/use_auth/UseAuth";
import IPost from "../../../interfaces/post/view/IPost";
import emptyPost from "../../../samples/post/DefaultPost";
import CreateCommentForm from "../../comment/create/Comment";
import NoComments from "../../comment/empty/NoComments";
import Navbar from "../../navbar/Navbar";
import PostHeading from "../heading/PostHeading";
import GetPostByIdService from "../../../services/post/read/ReadPostService";
import GetProfilePictureByEmailService from "../../../services/users/profile/GetProfilePictureService";

const Post: React.FC = () => {
  const [authorImage, setAuthorImage] = useState<string>("/reddit.svg");
  const { email, token } = useAuth();
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<IPost>(emptyPost);

  useEffect(() => {
    // Fetch post data by post_id
    const fetchData = async () => {
      const response: IPost | null = await GetPostByIdService(
        id,
        token?.token ?? ""
      );

      if (response) {
        setPost(response);

        // now fetch profile picture of author by email
        const image: string = await GetProfilePictureByEmailService(
          response.author,
          token?.token ?? ""
        );

        setAuthorImage(image);
      }
    };

    fetchData();
  }, [id, token]);

  return (
    <>
      <Navbar />
      <div className="flex justify-center mt-12">
        <div className="w-full max-w-screen-lg">
          <PostHeading imageBlobUrl={authorImage} author={post.author} />

          <h1 className="font-semibold text-3xl pl-7">{post.title}</h1>
          {/* Post content */}
          <div className="p-4">
            <MDXEditor
              readOnly
              markdown={post.content}
              className="min-h-40 w-full focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500"
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
          <div className="p-0">
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
