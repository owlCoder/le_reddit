interface IComment {
    id: string;
    author: string;
    postId: string; // for which post comment has been made
    content: string;
}

export default IComment;