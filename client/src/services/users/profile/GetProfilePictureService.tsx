import axios, { AxiosResponse } from "axios";
import { API_ENDPOINT } from "../../../App";

const GetProfilePictureByEmailService = async (
    email: string,
    token: string
  ): Promise<string> => {
  
    try {
      const response: AxiosResponse = await axios.get(
        API_ENDPOINT + `user/images/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 200 || response.status === 204) {
        return response.data;
      } else {
        return "";
      }
    } catch {
      return "";
    }
  };
  
  export default GetProfilePictureByEmailService;
  