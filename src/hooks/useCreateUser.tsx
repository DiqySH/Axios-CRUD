import axios, { AxiosError } from "axios";
import { useState } from "react";

const useCreateUser = () => {
  const [error, setError] = useState<AxiosError | null>(null);

  const createUser = async (name: string, username: string, age: string) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_KEY}/users`,
        { name: name, username: username, age: age }
      );
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
      console.log(error);
    }
  };

  return { createUser, error };
};

export default useCreateUser;
