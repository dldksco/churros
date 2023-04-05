// useFetch.js
import { useState, useEffect, useCallback } from "react";
import { api } from "../axios-instance/api";
function useFetch(searchData, pageNum) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const fetchData = async () => {
    try {
      const response = await api.post(`/news/search`, {
        text: searchData,
        page: pageNum,
        size: 10,
      });
      const { content, empty, size } = response.data;
      console.log(
        `loading sample search result ${searchData}: ${empty} ${size}`
      );
      setSearchList((prev) => [...prev, ...content]);
    } catch (error) {
      console.log(error);
    }
  };
  const sendQuery = useCallback(async () => {
    try {
      await setLoading(true);
      await setError(false);
      fetchData();
      setLoading(false);
    } catch (err) {
      setError(err);
    }
  }, [searchData, pageNum]);

  useEffect(() => {
    sendQuery(searchData);
  }, [searchData, sendQuery, pageNum]);

  return { loading, error, searchList };
}

export default useFetch;
