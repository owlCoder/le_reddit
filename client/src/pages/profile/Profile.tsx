import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../contexts/use_auth/UseAuth";
import GetUserByEmail from "../../services/users/profile/GetAccountDataService";
import Navbar from "../../components/navbar/Navbar";
import IUser from "../../interfaces/users/user/IUser";
import emptyUser from "../../samples/users/user";

const Profile: React.FC = () => {
  const { email, token, isLoggedIn } = useAuth();
  const [userData, setUserData] = useState<IUser | null>(emptyUser);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    setPageLoaded(true);
  }, []);

  useEffect(() => {
    if (pageLoaded && !isLoggedIn) {
      navigate("/");
    }

    const fetchData = async () => {
      try {
        if (email) {
          const userData: IUser | null = await GetUserByEmail(
            email,
            token?.token
          );
          if (userData) {
            setUserData(userData);
          }
        }
      } catch (error) {
        setErrorMessage("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [email, token, navigate]);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Validate form data and update user data
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <section className="flex items-center justify-center h-screen bg-gray-200 -mt-16 pb-12">
          <div className="max-w-lg bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-2xl font-bold text-center text-primary-600 mb-1">
              Profile
            </h1>
            <p className=" text-gray-500 text-center mb-8">
              Keep your information up-to-dated
            </p>
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <div className="space-y-2">
                <div className="flex space-x-4">
                <input
                  type="text"
                  autoFocus
                  value={userData?.FirstName}
                  onChange={(e) => handleChange(e, "FirstName")}
                  className="w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="First Name"
                />
                <input
                  type="text"
                  value={userData?.LastName}
                  onChange={(e) => handleChange(e, "LastName")}
                  className="w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="Last Name"
                />
                </div>
                <div className="flex space-x-4">
                <input
                  type="text"
                  value={userData?.Address}
                  onChange={(e) => handleChange(e, "Address")}
                  className="w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="Address"
                />
                <input
                  type="text"
                  value={userData?.City}
                  onChange={(e) => handleChange(e, "City")}
                  className="w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="City"
                />
                </div>
                <div className="flex space-x-4">
                <input
                  type="text"
                  value={userData?.Country}
                  onChange={(e) => handleChange(e, "Country")}
                  className="w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="Country"
                />
                <input
                  type="text"
                  value={userData?.Phone}
                  onChange={(e) => handleChange(e, "Phone")}
                  className="w-1/2 rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="Phone"
                />
                </div>
                <input
                  type="password"
                  value={userData?.Password}
                  onChange={(e) => handleChange(e, "Password")}
                  className="w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 p-3 text-sm"
                  placeholder="Password"
                />
              </div>
              <img src={userData?.ImageBlobUrl} alt="Profile" />
              <div className="flex justify-between items-center">
                {errorMessage && (
                  <p className="text-primary-600">{errorMessage}</p>
                )}
                <button
                  type="submit"
                  className="bg-primary-600 text-white rounded-lg py-2 px-4 font-bold text-sm shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all"
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
