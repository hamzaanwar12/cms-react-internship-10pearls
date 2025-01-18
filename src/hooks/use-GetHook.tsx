import { useState, useEffect } from "react";
import axios from "axios";

type UseGetResponse<T> = {
  isLoading: boolean;
  isError: boolean;
  data: T | null;
};

function useGet<T>(url: string): UseGetResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data || error.message);
        }
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url]); // Re-run when URL changes

  return { isLoading, isError, data };
}

export default useGet;
