import { useState } from "react";
import axios, { AxiosError } from "axios";
import useGetUser from "./useGetUser";

interface User {
  name: string;
  username: string;
  age: string;
}

const useEditUser = () => {
  const [error, setError] = useState<AxiosError | null>(null);
  const { data: users } = useGetUser();

  const editUser = async (idx: number, newValue: User) => {
    try {
      if (!users || users.length === 0) {
        throw new Error("User data is not available.");
      }

      const userToUpdate = users[idx];
      if (!userToUpdate || !userToUpdate._id) {
        throw new Error("User to update or its ID not found.");
      }

      const dataWithoutId = { ...newValue };

      await axios.put(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_KEY}/users/${userToUpdate._id}`,
        dataWithoutId
      );
    } catch (err) {
      setError(err as AxiosError);
      console.log(err);
    }
  };

  return { editUser, error };
};

export default useEditUser;