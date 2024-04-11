import axios, { AxiosResponse } from "axios";
import IPost from "../../../interfaces/post/view/IPost";
import { API_ENDPOINT } from "../../../App";

const GetPostsService = async (): Promise<IPost[] | null> => {
  try {
    const response: AxiosResponse = await axios.get(API_ENDPOINT + `post/all`);

    if (response.status === 200 || response.status === 204) {
      return response.data;
    } else {
      return null;
    }
  } catch {
    return null;
  }
};

export default GetPostsService;
