import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface User {
  name: string;
  username: string;
  age: number;
}

const useUser = () => {
  const [data, setData] = useState<User[]>([]);
  const [error, setError] = useState<AxiosError | null>(null);

  const getUser = useCallback(async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}${import.meta.env.VITE_API_KEY}/users`
      );
      setData(res.data);
      setError(null);
    } catch (err) {
      setError(err as AxiosError);
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getUser();
  }, [getUser]);

  const createUser = async (name: string, username: string, age: number) => {
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
    // Realtime
    // getUser()
  };

  return { createUser, data, error };
};

export default useUser;
