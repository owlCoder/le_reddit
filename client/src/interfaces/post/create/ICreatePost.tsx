/**
 * Represents the structure of data for creating a post.
 */
interface ICreatePost {
    /**
     * The title of the post.
     */
    title: string;
  
    /**
     * The content of the post.
     */
    content: string;
  
    /**
     * An optional image file associated with the post.
     */
    image: File | null;
  }
  
  export default ICreatePost;
  