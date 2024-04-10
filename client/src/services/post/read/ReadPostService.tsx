import { AxiosResponse } from "axios";
import IPost from "../../../interfaces/post/view/IPost";
import { API_ENDPOINT } from "../../../App";

const ReadPostById = async (
    id: string,
    token: string
  ): Promise<IPost | null> => {
  
    try {
      const response: AxiosResponse = await axios.post(
        API_ENDPOINT + "post/create",
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
  
  export default CreatePostService;
  