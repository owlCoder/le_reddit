import axios, { AxiosResponse, AxiosError } from "axios";
import IUser from "../../../interfaces/auth/sign_up/IUser";
import { API_ENDPOINT } from "../../../App";

const SignUpService = async (user: IUser): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(API_ENDPOINT + "auth/signup", user);
    if (response.status === 200) {
      // User registered successfully
      return true;
    } else {
      // Handle other status codes
      console.error("Registration failed with status code:", response.status);
      return false;
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle Axios errors
      const axiosError: AxiosError = error;
      if (axiosError.response) {
        // Server responded with an error status code
        console.error(
          "Registration failed with status code:",
          axiosError.response.status
        );
      } else if (axiosError.request) {
        // The request was made but no response was received
        console.error("No response received from server");
      } else {
        // Something happened in setting up the request
        console.error("Error:", axiosError.message);
      }
    } else {
      // Handle other types of errors
      console.error("Error:");
    }
    return false;
  }
};

export default SignUpService;
