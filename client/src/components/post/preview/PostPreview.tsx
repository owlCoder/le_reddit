import { useEffect, useState } from "react";
import IPost from "../../../interfaces/post/view/IPost";
import {
  MDXEditor,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
} from "@mdxeditor/editor";
import SubscribeButton from "../../button/SubscribeButton";
import PostHeading from "../heading/PostHeading";
import PostStats from "../stats/PostStats";
import GetProfilePictureByEmailService from "../../../services/users/profile/GetProfilePictureService";
import useAuth from "../../../contexts/use_auth/UseAuth";
import { useNavigate } from "react-router-dom";

const PostPreview: React.FC<{ post: IPost }> = ({
  post: { Id, Author, Title, Content, HasImage, ImageBlobUrl },
}) => {
  const [authorImage, setAuthorImage] = useState<string>("");
  const { email } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      // fetch profile picture
      const picture: string = await GetProfilePictureByEmailService(Author);
      setAuthorImage(picture);
    };

    fetch();
  }, [Author, email]);
  useEffect(() => {}, []);

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <div>
          <PostHeading
            imageBlobUrl={authorImage}
            author={"u/" + Author.split("@")[0]}
            isPreviewMode={true}
          />
        </div>
        <div className="flex items-center">
          <SubscribeButton
            onClick={() => {
              alert("Implementiraj me");
            }}
          />
        </div>
      </div>
      <div
        className="cursor-pointer"
        onClick={() => {
          navigate(`/post/${Id}`);
        }}
      >
        <h1 className="font-semibold text-3xl pl-7">{Title}</h1>
        {/* Post content */}
        <div className="p-4">
          <MDXEditor
            readOnly
            markdown={Content}
            className="min-h-12 w-full focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500"
            plugins={[
              headingsPlugin(),
              listsPlugin(),
              quotePlugin(),
              thematicBreakPlugin(),
              markdownShortcutPlugin(),
            ]}
          />

          {/* picture for post */}
          {HasImage && <img src={ImageBlobUrl} />}
        </div>
      </div>
      {/* upvote, downvote comments count */}
      <PostStats upvotesDownvotesCount={100} numberOfComments={0} />

      <br />

      <hr className="mx-4" />
    </>
  );
};

export default PostPreview;
