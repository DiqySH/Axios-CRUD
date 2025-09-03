import { useCallback, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

interface User {
  name: string;
  username: string;
  age: string;
  _id: string;
}

const useGetUser = () => {
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

  return { data, error };
};

export default useGetUser;
