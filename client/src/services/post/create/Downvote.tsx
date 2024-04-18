import axios, { AxiosResponse } from "axios";
import { API_ENDPOINT } from "../../../App";

const Downvote = async (
  PostId: string,
  email: string
): Promise<boolean> => {
  try {
    const response: AxiosResponse = await axios.get(
      API_ENDPOINT + `vote/downvote/${PostId}/${email}`
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

export default Downvote;