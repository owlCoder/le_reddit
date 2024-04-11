import React, { useEffect, useState } from "react";
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
import CreateCommentForm from "../../comment/create/CreateCommentForm";
import NoComments from "../../comment/empty/NoComments";
import PostHeading from "../heading/PostHeading";
import GetPostByIdService from "../../../services/post/read/ReadPostService";
import GetProfilePictureByEmailService from "../../../services/users/profile/GetProfilePictureService";
import IPostProp from "../../../interfaces/post/prop/IPostProp";
import Comment from "../../comment/view/Comment";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../spinner/LoadingSpinner";

const Post: React.FC<IPostProp> = ({ postId }) => {
  const [authorImage, setAuthorImage] = useState<string>("/reddit.svg");
  const { token, isLoggedIn } = useAuth();
  const [post, setPost] = useState<IPost>(emptyPost);
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch post data by post_id
    const fetchData = async () => {
      const response: IPost | null = await GetPostByIdService(postId);

      if (response) {
        setPost(response);

        // now fetch profile picture of author by email
        const image: string = await GetProfilePictureByEmailService(
          response.Author
        );

        setAuthorImage(image);
      } else {
        navigate("/404");
      }

      setLoaded(true);
    };

    fetchData();
  }, [postId, token, isLoggedIn, navigate]);

  return (
    <>
      {loaded ? (
        <div>
          <PostHeading
            imageBlobUrl={authorImage}
            author={"u/" + post.Author.split("@")[0]}
          />

          <h1 className="font-semibold text-3xl pl-7">{post.Title}</h1>
          {/* Post content */}
          <div className="p-4">
            <MDXEditor
              readOnly
              markdown={post.Content}
              className="min-h-12 w-full focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500"
              plugins={[
                headingsPlugin(),
                listsPlugin(),
                quotePlugin(),
                thematicBreakPlugin(),
                markdownShortcutPlugin(),
              ]}
            />
          </div>
          <br />
          <hr className="mx-4" />

          {/* Comment form */}
          {isLoggedIn && (
            <div className="p-0 mb-4">
              <CreateCommentForm post={post} />
            </div>
          )}

          {/* Render no comments if there are no comments */}
          {post.Comments?.length === 0 ? (
            <div className="mb-8">
              <div className="p-4 mt-2">
                <NoComments />
              </div>
            </div>
          ) : (
            <div className="mb-12">
              {post.Comments.map((comment) => (
                <Comment key={comment.Id} comment={comment} />
              ))}
            </div>
          )}
        </div>
      ) : (
        <LoadingSpinner />
      )}
    </>
  );
};

export default Post;
