import axios, { AxiosResponse } from "axios";
import IToken from "../../../interfaces/auth/jwt/IToken";
import { API_ENDPOINT } from "../../../App";
import ILogin from "../../../interfaces/auth/login/ILogin";

const LoginService = async (credentials: ILogin): Promise<boolean> => {
  try {
    const response: AxiosResponse<IToken> = await axios.post(
      API_ENDPOINT + "auth/login",
      credentials
    );

    if (response.status === 200) {
      saveTokenToLocalstorage({ token: response.data.token });
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
};

export default LoginService;
