import React from "react";
import { MDXEditor } from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import IComment from "../../../interfaces/comment/IComment";
import PostHeading from "../../post/heading/PostHeading";
const Comment: React.FC<{ comment: IComment }> = ({
  comment: { Author, Content },
}) => {
  return (
    <div className="bg-white rounded-lg ml-4">
      <form className="space-y-6 p-4 border border-gray-200 rounded-xl mb-2">
        {/* MDX Editor */}
        <div>
            <PostHeading imageBlobUrl="/reddit.svg" author={Author} isCommentHeading={true} />
          <div className="mt-1">
            <MDXEditor
              readOnly
              markdown={Content}
              placeholder="Add a comment"
              className="min-h-px w-full focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Comment;
