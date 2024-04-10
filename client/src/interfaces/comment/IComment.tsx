interface IComment {
    Id: string;
    Author: string;
    PostId: string; // for which post comment has been made
    Content: string;
}

export default IComment;