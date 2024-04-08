import axios, { AxiosResponse } from "axios";
import IUser from "../../../interfaces/auth/sign_up/IUser";
import { API_ENDPOINT } from "../../../App";

const SignUpService = async (user: IUser): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.post(
      API_ENDPOINT + "auth/signup",
      user,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200 || response.status === 204) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export default SignUpService;
