import IComment from "../../comment/IComment";

interface IPost {
  Id: string;
  Author: string;
  Title: string;
  Content: string;
  HasImage: boolean;
  ImageBlobUrl: string;
  Comments: IComment[];
}

export default IPost;
