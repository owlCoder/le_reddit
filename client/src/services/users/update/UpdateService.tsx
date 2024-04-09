import axios, { AxiosResponse } from "axios";
import IUser from "../../../interfaces/users/user/IUser";
import { API_ENDPOINT } from "../../../App";
import IUpdateUser from "../../../interfaces/users/user/update/IUpdateUser";

const UpdateUserInformationService = async (user: IUser, image: File | null, token: string): Promise<boolean> => {
    try {
        // Convert from user data to RegisteredUser
        const updateUser: IUpdateUser = {
            firstName: user.FirstName,
            lastName: user.LastName,
            address: user.Address,
            city: user.City,
            country: user.Country,
            phone: user.Phone,
            email: user.Email,
            password: user.Password,
            image: image,
            imageBlobUrl: user.ImageBlobUrl,
            PartitionKey: user.PartitionKey,
            RowKey: user.RowKey,
            Timestamp: user.Timestamp,
            ETag: user.ETag,
            newImage: (image ? true : false)
        }

        console.log(updateUser)

      const response: AxiosResponse = await axios.post(
        API_ENDPOINT + "user/update",
        updateUser,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.status === 200 || response.status === 204) {
        return true; // Return true if update is successful
      } else {
        return false; // Return false if update fails
      }
    } catch {
      return false; // Return false if an error occurs during update
    }
  };
  
  export default UpdateUserInformationService;