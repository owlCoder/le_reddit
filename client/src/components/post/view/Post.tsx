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
import Popup from "../../PopUp/PopUp";
import IPopUp from "../../../interfaces/popup/IPopUp";
import DefaultPopUp from "../../../samples/popup/DefaultPop";
import IComment from "../../../interfaces/comment/IComment";
import IPopUpProp from "../../../interfaces/popup/IPopUpProp";
import TrashButton from "../../button/TrashButton";
import DeletePostService from "../../../services/post/delete/DeletePostService";
import PostStats from "../stats/PostStats";

const Post: React.FC<IPostProp> = ({ postId }) => {
  const [authorImage, setAuthorImage] = useState<string>("/reddit.svg");
  const { token, isLoggedIn, email } = useAuth();
  const [post, setPost] = useState<IPost>(emptyPost);
  const [loaded, setLoaded] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isDeletePostAvailable, setIsDeletePostAvailable] =
    useState<boolean>(false);
  const [popup, setPopup] = useState<IPopUp>(DefaultPopUp);
  const [open, setOpen] = useState<boolean>(false);
  const [popupfunc, setpopupfunc] = useState<IPopUpProp>({
    SetUpPopup: () => {},
  });
  const SetUpPopup = (
    title: string,
    description: string,
    titleColor: string,
    buttonConfirmColor: string,
    buttonConfirmBackground: string,
    onConfirm: () => void
  ) => {
    setPopup({
      title: title,
      description: description,
      titleColor: titleColor,
      buttonConfirmColor: buttonConfirmColor,
      buttonConfirmBackground: buttonConfirmBackground,
      onConfirm: onConfirm,
      onClose: () => {
        setOpen(false);
      },
      isOpen: true,
    });

    setOpen(true);
  };

  const DeletePost = async () => {
    const success: boolean = await DeletePostService(
      postId,
      token?.token ?? ""
    );

    if (success) {
      navigate("/");
    }
  };

  const ConfirmPostDelete = async () => {
    SetUpPopup(
      "Delete post",
      "Are you sure that you want to delete a post, all comments will be deleted too?",
      "text-black",
      "text-white",
      "bg-red",
      () => {
        DeletePost();
      }
    );
  };

  useEffect(() => {
    // set up popup
    setpopupfunc({
      SetUpPopup: SetUpPopup,
    });

    // Fetch post data by post_id
    const fetchData = async () => {
      const response: IPost | null = await GetPostByIdService(postId);

      if (response) {
        setPost(response);

        // if author access post, enable delete post
        if (response.Author === email) {
          setIsDeletePostAvailable(true);
        }

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
  }, [postId, token, isLoggedIn, navigate, open, email]);

  return (
    <>
      {loaded ? (
        <div>
          {open && <Popup popup={popup} />}

          <div className="flex justify-between items-center mb-4">
            <div>
              <PostHeading
                imageBlobUrl={authorImage}
                author={"u/" + post.Author.split("@")[0]}
              />
            </div>
            <div>
              {isDeletePostAvailable && (
                <TrashButton onClick={ConfirmPostDelete} />
              )}
            </div>
          </div>

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
            {/* upvote, downvore comments count */}
           <PostStats upvotesDownvotesCount={100} numberOfComments={post.Comments.length} />
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
              {post.Comments.map((comment: IComment, index: number) => (
                <div key={index}>
                  <Comment comment={comment} PopUp={popupfunc} />
                </div>
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
