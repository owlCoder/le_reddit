import React, { useState } from "react";
import IUser from "../../../interfaces/auth/sign_up/IUser";
import defaultUser from "../../../samples/auth/sign_up/signup";

type FormDataKeys = keyof IUser;

const Register: React.FC = () => {
  const [formData, setFormData] = useState<IUser>(defaultUser);
  const [image, setImage] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: FormDataKeys
  ) => {
    setFormData({
      ...formData,
      [key]: event.target.value,
    });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Handle form submission, API calls, etc.
    // proveri da li su sva polja prazna
    // da li je sifra min duzine 6 i te gluposti
    // mozda regex za email
    // najbolje napravi validators i njoj samo prosledi form data i cao
    console.log("Form Data:", formData);
    console.log("Image:", image);
    setErrorMessage("Backend is not available");
  };

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
                  className="w-full rounded-lg border-2 border-reddit-400 focus:border-reddit-600 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="First Name"
                  required
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
                  className="w-full rounded-lg border-2 border-reddit-400 focus:border-reddit-600 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Last Name"
                  required
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
                  className="w-full rounded-lg border-2 border-reddit-400 focus:border-reddit-600 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Address"
                  required
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
                  className="w-full rounded-lg border-2 border-reddit-400 focus:border-reddit-600 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="City"
                  required
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
                    onChange={(e) => handleChange(e, key as FormDataKeys)}
                    className="w-full rounded-lg border-2 border-reddit-400 focus:border-reddit-600 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    required
                  />
                </div>
              );
            })}

            <div>
              <label htmlFor="image" className="sr-only">
                Image
              </label>
              <input
                type="file"
                onChange={handleImageChange}
                className="w-full rounded-lg border-2 border-reddit-400 focus:border-reddit-600 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
              />
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

export default Register;
