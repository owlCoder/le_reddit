import IComment from "../../comment/IComment";

interface IPost {
  id: string;
  author: string;
  title: string;
  content: string;
  hasImage: boolean;
  imageBlobUrl: string;
  comments: IComment[];
}

export default IPost;
