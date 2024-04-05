/**
 * SignUp Component
 *
 * This component provides a sign-up form for users to register with their information.
 *
 * It uses the IUser interface to define the shape of the form data and defaultUser
 * for initializing the form with default values.
 *
 * @returns JSX.Element
 */
import React, { useState } from "react";
import IUser from "../../../interfaces/auth/sign_up/IUser";
import defaultUser from "../../../samples/auth/sign_up/SignUp";
import { ValudateSignupData } from "../../../validators/auth/sign_up/validate_signup";

const SignUp: React.FC = () => {
  // State variables to manage form data, image, and error messages
  const [formData, setFormData] = useState<IUser>(defaultUser);
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Function to handle changes in form inputs
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof IUser
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  // Function to handle image file change
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Reset errors
    setErrorMessage("");

    // Client-Side data verification
    const errors: string[] = ValudateSignupData(formData);

    if (errors.length === 0 && image != null) {
      // Call API
      console.log("Form Data:", formData);
      console.log("Image:", image);
      setErrorMessage("Backend is not available");
    } else {
      // Show all errors
      setErrorMessage((prevErrorMessage) => {
        let newErrorMessage = prevErrorMessage + "Check next fields: ";
        errors.forEach((error, index) => {
          newErrorMessage += error;
          if (index !== errors.length - 1) {
            newErrorMessage += ", ";
          }
        });
        if (image == null) {
          newErrorMessage += " and image.";
        }
        else {
          newErrorMessage += ".";
        }
        return newErrorMessage;
      });
    }
  };

  // Render the sign-up form
  return (
    <>
      <section className="relative flex flex-wrap lg:h-screen lg:items-center">
        <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-lg text-center">
            <h1 className="text-2xl font-bold sm:text-3xl text-primary-600">
              Sign Up
            </h1>

            <p className="mt-4 text-gray-500">
              Join us and discover endless possibilities!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mb-0 mt-8 max-w-md space-y-4"
          >
            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="firstName" className="sr-only">
                  First Name
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleChange(e, "firstName")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="First Name"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="lastName" className="sr-only">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleChange(e, "lastName")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="w-1/2">
                <label htmlFor="address" className="sr-only">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => handleChange(e, "address")}
                  className="w-full rounded-lg border-2  focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Address"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="city" className="sr-only">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange(e, "city")}
                  className="w-full rounded-lg border-2  focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="City"
                />
              </div>
            </div>

            {Object.entries(formData).map(([key, value]) => {
              if (["firstName", "lastName", "address", "city"].includes(key)) {
                return null; // Skip first name, last name, address, and city
              }
              return (
                <div key={key}>
                  <label htmlFor={key} className="sr-only">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    type={key === "email" ? "email" : "text"}
                    value={value}
                    onChange={(e) => handleChange(e, key as keyof IUser)}
                    className="w-full rounded-lg border-2  focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  />
                </div>
              );
            })}
            <div className="relative flex items-center">
  <input
    type="file"
    onChange={handleImageChange}
    className="hidden"
    id="image"
  />
  <label
    htmlFor="image"
    className="inline-block bg-primary-400 hover:bg-primary-500 focus:bg-primary-500 rounded-lg border focus:outline-none focus:ring-0 text-white font-semibold py-2 px-4 cursor-pointer shadow-sm transition duration-300 ease-in-out mr-2"
  >
    Choose Image
  </label>
  <span className="text-sm text-primary-500 mr-2">
    {image && image.name}
  </span>
  {image && (
    <div className="mt-2 ml-auto">
      <img
        src={URL.createObjectURL(image)}
        alt="Image Preview"
        className="w-16 h-16 rounded-lg object-cover"
      />
    </div>
  )}
</div>


            {errorMessage && (
              <p className="mt-4 text-primary-600">{errorMessage}</p>
            )}

            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Already have an account?
                <a
                  className="text-primary-600 hover:text-primary-700"
                  href="/login"
                >
                  &nbsp;Log in
                </a>
              </p>

              <button
                type="submit"
                className="w-32 inline-block bg-primary-500 hover:bg-primary-600 px-4 py-2 text-md font-medium rounded-xl text-white"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>

        <div className="relative h-64 w-full sm:h-96 lg:h-full lg:w-1/2">
          <img
            alt=""
            src="/images/login.jpg"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>
    </>
  );
};

export default SignUp;
