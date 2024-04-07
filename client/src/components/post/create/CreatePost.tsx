import React, { useState } from "react";
import {
  MDXEditor,
  UndoRedo,
  BoldItalicUnderlineToggles,
  CodeToggle,
  toolbarPlugin,
} from "@mdxeditor/editor";
import "@mdxeditor/editor/style.css";
import ImageIcon from "../../icons/image/ImageIcon";

const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can implement your logic to handle form submission
    console.log("Title:", title);
    console.log("Content:", content);
    // Reset form fields after submission
    setTitle("");
    setContent("");
    setImagePreview(null); // Clear the image preview
  };

  // Function to handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Read the file and set image preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Function to handle inserting an image
  // const handleInsertImage = () => {
  //   if (imagePreview) {
  //     // Append image markdown to the content
  //     setContent(content + `\n\n![Alt text](${imagePreview})`);
  //     // Clear the image preview after insertion
  //     setImagePreview(null);
  //   }
  // };

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="mt-8 space-y-6 p-4">
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="block w-full border-gray-300 h-10 px-2 border focus:outline-none rounded-lg focus:ring-primary-500 focus:border-primary-500 text-md font-regular"
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="content"
            className="block text-md font-medium text-gray-700"
          >
            Content
          </label>
          <div className="mt-1">
            <MDXEditor
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
                  className="h-64 w-64 mt-4"
                />
              </div>
            )}
          </div>
        </div>
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
