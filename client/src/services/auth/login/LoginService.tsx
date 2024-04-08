import axios, { AxiosResponse } from "axios";
import IToken from "../../../interfaces/auth/jwt/IToken";
import { API_ENDPOINT } from "../../../App";
import ILogin from "../../../interfaces/auth/login/ILogin";
import { saveTokenToLocalstorage } from "../../jwt/JWTTokenizationService";

/**
 * Logs in a user and saves the JWT token to local storage if successful.
 * @param credentials The user's login credentials.
 * @returns A Promise that resolves to a boolean indicating whether the login was successful.
 */
const LoginService = async (credentials: ILogin): Promise<boolean> => {
  try {
    const response: AxiosResponse<IToken> = await axios.post(
      API_ENDPOINT + "auth/login",
      credentials
    );

    if (response.status === 200) {
      // Save the token to local storage if login is successful
      saveTokenToLocalstorage({ token: response.data.token });
      return true; // Return true if login is successful
    } else {
      return false; // Return false if login fails
    }
  } catch {
    return false; // Return false if an error occurs during login
  }
};

export default LoginService;
