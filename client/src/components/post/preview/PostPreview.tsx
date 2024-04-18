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
import ReadNumberOfCommentsByPostId from "../../../services/post/read/ReadNumberOfCommentsByPostId";
import ReadNumberOfVotes from "../../../services/post/read/ReadNumberOfVotes";

const PostPreview: React.FC<{ post: IPost }> = ({
  post: { Id, Author, Title, Content, HasImage, ImageBlobUrl },
}) => {
  const [authorImage, setAuthorImage] = useState<string>("");
  const [comments, setComments] = useState<number>(0);
  const { email } = useAuth();
  const navigate = useNavigate();
  const [isUpvoted, setIsUpvoted] = useState<boolean>(false);
  const [isDownvoted, setIsDownvoted] = useState<boolean>(false);
  const [voteCount, setVoteCount] = useState<number>(0);

  const handleUpvote = async () => {
    if(!email){
      return;
    }
    if(isUpvoted){
      setIsUpvoted(false);
      setVoteCount(voteCount-1);
    }
    else{
      if(isDownvoted){
        setVoteCount(voteCount+2);
      }
      else{
        setVoteCount(voteCount+1);
      }
      setIsUpvoted(true);
      setIsDownvoted(false);
    }

    //await upvoteFunction(); // ovde da pozovem bcknd funkciju
  };

  const handleDownvote = async () => {
    if(!email){
      return;
    }
    if(isDownvoted){
      setIsDownvoted(false);
      setVoteCount(voteCount+1);
    }
    else{
      if(isUpvoted){
        setVoteCount(voteCount-2);
      }
      else{
        setVoteCount(voteCount-1);
      }
      setIsDownvoted(true);
      setIsUpvoted(false);
    }

    //await df() // isto pozivam back
  };

  useEffect(() => {
    const fetch = async () => {
      // fetch profile picture
      const picture: string = await GetProfilePictureByEmailService(Author);
      setAuthorImage(picture);
    };

    fetch();
  }, [Author, email]);
  useEffect(() => {}, []);

  useEffect(() => {
    const fetch = async () => {
      // fetch comment number
      const commentNum: number = await ReadNumberOfCommentsByPostId(Id);
      setComments(commentNum);
      const votes: number = await ReadNumberOfVotes(Id);
      setVoteCount(votes);
    };

    fetch();
  }, [Id, Title]);

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
        className="cursor-pointer flex"
        onClick={() => {
          navigate(`/post/${Id}`);
        }}
      >
        <div className="flex flex-col items-start w-full">
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
          </div>
        </div>
        {/* Picture for post */}
        {HasImage && (
          <img src={ImageBlobUrl} className="w-40 h-40 rounded-2xl" />
        )}
      </div>
      {/* Upvote, downvote comments count */}
      <div className="ml-4">
      <PostStats upvotesDownvotesCount={voteCount} numberOfComments={comments} 
      onUpvote={handleUpvote}
      onDownvote={handleDownvote}
      isUpvoted={isUpvoted}
      isDownvoted={isDownvoted}
      />
      </div>

      <br />

      <hr className="mx-4 mt-4 mb-8" />
    </>
  );
};

export default PostPreview;
