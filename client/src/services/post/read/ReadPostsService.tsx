import axios, { AxiosResponse } from "axios";
import IPost from "../../../interfaces/post/view/IPost";
import { API_ENDPOINT } from "../../../App";

const GetPostsService = async (id: string | undefined, search: string | undefined): Promise<IPost[] | null> => {
  try {
    const response: AxiosResponse = await axios.get(API_ENDPOINT + `post/${id}/${search}/pagination/${2}/${"~"}`);

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
