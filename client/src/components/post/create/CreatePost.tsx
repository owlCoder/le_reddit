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
import ImageIcon from "../../icons/image/ImageIcon";
import ICreatePost from "../../../interfaces/post/create/ICreatePost";
import ValidateCreatePostData from "../../../validators/post/create_post";

const CreatePostForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const ref = React.useRef<MDXEditorMethods>(null); // grab markdown text

  // State to manage form data
  const [formData, setFormData] = useState<ICreatePost>({
    title: "",
    content: "",
    image: null, // Initially, no image is selected
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO:
    // mozda neki tailwind popup dodaj kao uspesno dodato ili redirect

    // Reset errors
    setErrorMessage("");

    // Client-Side data verification
    const errors: string[] = ValidateCreatePostData(formData);

    if (errors.length === 0) {
      // Call API
      console.log("Form Data:", formData);
      setErrorMessage("Backend is not available");
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

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      setFormData({
        ...formData,
        image: file,
      });

      // Set image preview
      setImagePreview(URL.createObjectURL(file));
    }
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
                      {/* Button to insert image */}
                      <label
                        htmlFor="imageUpload"
                        className="cursor-pointer h-5 w-5 text-gray-500 hover:bg-gray-200"
                      >
                        <ImageIcon />
                      </label>
                      {/* Input for image upload */}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                        id="imageUpload"
                      />
                    </>
                  ),
                }),
              ]}
            />
            {/* Show image preview if available */}
            {imagePreview && (
              <div className="mt-4">
                <label
                  htmlFor="content"
                  className="block text-md font-medium text-gray-700"
                >
                  Image
                </label>
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="h-56 w-64 mt-4"
                />
              </div>
            )}
          </div>
        </div>
        {errorMessage && (
          <p className="mt-4 text-primary-600">{errorMessage}</p>
        )}
        {/* Submit Button */}
        <div className="flex justify-end">
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

export default CreatePostForm;
