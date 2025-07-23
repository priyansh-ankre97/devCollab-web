import React, { use, useEffect } from "react";
import { BASE_URL } from "../utils/constant";

const useGetRequest = ({ url, method = "GET", body = {} }) => {
  const [respnseData, setResponseData] = useState(null);
  const [responseError, setResponseError] = useState(null);
  const handleGetRequest = async () => {
    try {
      const response = await fetch(BASE_URL + url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      });
      const { data = null, error = null } = await response.json();
      if (data) {
        setResponseData(data);
      } else if (!response.ok || error) {
        throw new Error(error);
      }
    } catch (error) {
      setResponseError(error.message);
      console.error(error.message);
    }
  };
  useEffect(() => {
    handleGetRequest();
  }, []);
  return { respnseData, responseError };
};

export default useGetRequest;
