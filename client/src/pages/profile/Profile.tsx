import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/use_auth/UseAuth";
import GetUserByEmail from "../../services/users/profile/GetAccountDataService";
import Navbar from "../../components/navbar/Navbar";
import IUser from "../../interfaces/users/user/IUser";
import emptyUser from "../../samples/users/user";

const Profile: React.FC = () => {
  const { email, token } = useAuth();
  const [userData, setUserData] = useState<IUser | null>(emptyUser);
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading indicator
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data using email from JWT token
    const fetchData = async () => {
      try {
        if (email) {
          const userData: IUser | null = await GetUserByEmail(email, token?.token);
          if (userData) {
            setUserData(userData);
          }
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data.");
      } finally {
        setLoading(false); // Set loading to false after fetching user data
      }
    };
    fetchData();
  }, [email, token, navigate]);

  // Function to handle changes in form inputs
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    key: keyof IUser
  ) => {
    if (userData) {
      setUserData({
        ...userData,
        [key]: event.target.value,
      });
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate form data and update user data
  };

  return (
    <>
      <Navbar />
      {loading ? ( // Render loading indicator if loading is true
        <div>Loading...</div>
      ) : (
        <section className="relative flex flex-wrap lg:h-screen lg:items-center">
          {/* Render profile form when loading is false */}
          <div className="w-full px-4 py-12 sm:px-6 sm:py-16 lg:w-1/2 lg:px-8 lg:py-24">
            <div className="mx-auto max-w-lg text-center">
              <h1 className="text-2xl font-bold sm:text-3xl text-primary-600">
                Profile
              </h1>
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
                  value={userData?.FirstName}
                  onChange={(e) => handleChange(e, "FirstName")}
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
                  value={userData?.LastName}
                  onChange={(e) => handleChange(e, "LastName")}
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
                  value={userData?.Address}
                  onChange={(e) => handleChange(e, "Address")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Address"
                />
              </div>
              <div className="w-1/2">
                <label htmlFor="city" className="sr-only">
                  City
                </label>
                <input
                  type="text"
                  value={userData?.City}
                  onChange={(e) => handleChange(e, "City")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="City"
                />
              </div>
            </div>

            <div>
            <div className="mb-4">
                <label htmlFor="country" className="sr-only">
                  Country
                </label>
                <input
                  type="text"
                  value={userData?.Country}
                  onChange={(e) => handleChange(e, "Country")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Country"
                />
              </div>
              <div>
                <label htmlFor="Phone" className="sr-only">
                  City
                </label>
                <input
                  type="text"
                  value={userData?.Phone}
                  onChange={(e) => handleChange(e, "Phone")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Phone"
                />
              </div>
            </div>
            <div>
                <label htmlFor="Password" className="sr-only">
                  City
                </label>
                <input
                  type="password"
                  value={userData?.Password}
                  onChange={(e) => handleChange(e, "Password")}
                  className="w-full rounded-lg border-2 focus:outline-none focus:ring-0 focus:border-primary-500 p-3 text-sm shadow-sm"
                  placeholder="Password"
                />
              </div>

              <img src={userData?.ImageBlobUrl} />
            <div className="flex items-center justify-between">
              {errorMessage && (
                <p className="text-primary-600">{errorMessage}</p>
              )}

              <button
                type="submit"
                className="rounded-lg bg-gradient-to-tr from-primary-600 to-primary-600 py-2 px-4 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-primary-900/10 transition-all hover:shadow-lg hover:shadow-primary-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none inline-block"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </section>
       )}
    </>
  );
};

export default Profile;
