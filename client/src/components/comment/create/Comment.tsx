import React, { useState } from "react";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  toolbarPlugin,
  MDXEditorMethods,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import ICreatePost from "../../../interfaces/post/create/ICreatePost";
import ValidateCreatePostData from "../../../validators/post/create_post";
import useAuth from "../../../contexts/use_auth/UseAuth";
import CreatePostService from "../../../services/posts/create/CreatePostService";
import IComment from "../../../interfaces/comment/IComment";
import IPost from "../../../interfaces/post/view/IPost";
import ValidateCommentData from "../../../validators/comment/create_comment_validator";

const CreateCommentForm: React.FC<IPost> = ({id, author}) => {
  const { token, email } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const ref = React.useRef<MDXEditorMethods>(null); // grab markdown text

  // State to manage form data
  const [formData, setFormData] = useState<IComment>({
    id: "",
    author: author,
    content: "",
    postId: id
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
      author: formData.author || (email ?? formData.author),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset errors
    setErrorMessage("");

    // Client-Side data verification
    const errors: string[] = ValidateCommentData(formData);

    if (errors.length === 0) {
      // Call API
      const post_id: string = await CreateCommentService(
        formData,
        token?.token ?? ""
      );

      if (post_id !== "") {
        // Navigate to the created post page or perform any other necessary action
      } else {
        setErrorMessage("Comment can't be created.");
      }
    } else {
      // Show all errors
      setErrorMessage((prevErrorMessage) => {
        let newErrorMessage = prevErrorMessage + "Check next fields: ";
        errors.forEach((error, index) => {
          newErrorMessage += error;
          if (index !== errors.length - 1) {
            newErrorMessage += ", ";
          } else {
            newErrorMessage += ".";
          }
        });
        return newErrorMessage;
      });
    }
  };

  const handleCancel = () => {
    // Reset form data
    setFormData({
      author: "",
      title: "",
      content: "",
    });
  };

  const handleContentChange = (markdown: string) => {
    // Handle MDXEditor changes
    // Update state or perform any necessary actions with the markdown content
    setFormData({
      ...formData,
      content: markdown,
    });
  };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg">
      <form
        onSubmit={handleSubmit}
        className="mt-8 space-y-6 p-4"
        encType="multipart/form-data"
      >
        {/* Title input */}
        <div>
          <label
            htmlFor="title"
            className="block text-md font-medium text-gray-700"
          >
            Title
          </label>
          <div className="mt-1">
            <input
              id="title"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="block w-full border-gray-300 h-10 px-2 border focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500 text-md font-regular"
            />
          </div>
        </div>
        {/* MDX Editor */}
        <div>
          <label
            htmlFor="content"
            className="block text-md font-medium text-gray-700"
          >
            Content
          </label>
          <div className="mt-1">
            <MDXEditor
              onChange={handleContentChange}
              ref={ref}
              markdown=""
              className="h-72 w-full border border-gray-300 focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500"
              plugins={[
                toolbarPlugin({
                  toolbarContents: () => (
                    <>
                      {" "}
                      <UndoRedo />
                      <BoldItalicUnderlineToggles />
                      <CodeToggle />
                    </>
                  ),
                }),
              ]}
            />
          </div>
        </div>
        {errorMessage && (
          <p className="mt-4 text-primary-600">{errorMessage}</p>
        )}
        {/* Button group */}
        <div className="flex justify-between">
          {/* Cancel Button */}
          <button
            type="button"
            onClick={handleCancel}
            className="inline-flex justify-center w-24 rounded-full px-4 py-2 text-base text-gray-700 bg-gray-300 border border-transparent font-semibold shadow-sm hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          {/* Submit Button */}
          <button
            type="submit"
            className="inline-flex justify-center w-24 rounded-full px-4 py-2 text-base text-white bg-primary-600 border border-transparent font-semibold shadow-sm hover:bg-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateCommentForm;
