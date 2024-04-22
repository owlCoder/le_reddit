import axios, { AxiosResponse } from "axios";
import { API_ENDPOINT } from "../../../App";

const Subscribe = async (
  PostId: string,
  email: string,
  token: string
) => {
  try {
    const response: AxiosResponse = await axios.get(
      API_ENDPOINT + `post/${PostId}/${encodeURI(email)}/subscribe/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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

export default Subscribe;