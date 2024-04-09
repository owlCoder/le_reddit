import IUser from "../../../auth/sign_up/IUser";

interface IUpdateUser extends IUser {
  imageBlobUrl: string;

  /** The partition key of the user. */
  PartitionKey: string;

  /** The row key of the user. */
  RowKey: string;

  /** The timestamp of the user record. */
  Timestamp: string;

  /** The ETag of the user record. */
  ETag: string;

  newImage: boolean;
}

export default IUpdateUser;
