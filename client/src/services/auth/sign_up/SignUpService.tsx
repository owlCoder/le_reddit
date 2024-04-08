import axios, { AxiosResponse } from "axios";
import IUser from "../../../interfaces/auth/sign_up/IUser";
import { API_ENDPOINT } from "../../../App";

const SignUpService = async (user: IUser): Promise<boolean> => {
  try {
    // Make the POST request with FormData
    const response: AxiosResponse = await axios.post(API_ENDPOINT + 'auth/signup', user, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    console.log(response);

    if (response.status === 200) {
      // User registered successfully
      return true;
    } else {
      // Handle other status codes
      console.error('Registration failed with status code:', response.status);
      return false;
    }
  } catch (error) {
    // Handle errors
    console.error('Error:', error);
    return false;
  }
};

export default SignUpService;
