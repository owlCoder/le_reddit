import axios, { AxiosResponse } from "axios";
import { API_ENDPOINT } from "../../../App";
import IComment from "../../../interfaces/comment/IComment";


const CreateCommentService = async (
  post: IComment,
  token: string
): Promise<string> => {

  try {
    const response: AxiosResponse = await axios.post(
      API_ENDPOINT + "comment/create",
      post,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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

export default CreateCommentService;
