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
import CreateCommentForm from "../../comment/create/Comment";
import NoComments from "../../comment/empty/NoComments";
import PostHeading from "../heading/PostHeading";
import GetPostByIdService from "../../../services/post/read/ReadPostService";
import GetProfilePictureByEmailService from "../../../services/users/profile/GetProfilePictureService";
import IPostProp from "../../../interfaces/post/prop/IPostProp";
import Comment from "../../comment/view/Comment";

const Post: React.FC<IPostProp> = ({ postId }) => {
  const [authorImage, setAuthorImage] = useState<string>("/reddit.svg");
  const { token, isLoggedIn } = useAuth();
  const [post, setPost] = useState<IPost>(emptyPost);
  const [loaded, setLoaded] = useState<boolean>(false);

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
      }

      setLoaded(true);
    };

    fetchData();
  }, [postId, token, isLoggedIn]);

  return (
    <>
      {loaded && (
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
          {isLoggedIn && (
            <div className="p-0">
              <CreateCommentForm post={post} />
            </div>
          )}
          
            {/* Render no comments if there are no comments */}
            {post.Comments?.length === 0 ? (
              <div className="p-4 mt-2">
              <NoComments />
              </div>
            ) : (
              <>
                {post.Comments.map((comment) => (
                  <Comment key={comment.Id} comment={comment} />
                ))}
              </>
            )}
            {/* You can add comment components with map and for each here */}
          </div>
        
      )}
    </>
  );
};

export default Post;
