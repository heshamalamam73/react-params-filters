import axios from "axios";
import { useCallback, useEffect, useMemo, useState } from "react";
export type Book = {
  title: string;
  url: string;
  thumbnailUrl: string;
};
const useFetchData = (filterQuery: string, page: number = 1) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState(false);
  const url1 = "https://jsonplaceholder.typicode.com/photos";
  const url2 = useMemo(
    () => ({ page, filterQuery }: { page: number; filterQuery: string }) =>
      `https://openlibrary.org/search.json?page=${page}&q=${filterQuery}`,
    [page, filterQuery]
  );
  useEffect(() => {
    setBooks([]);
  }, [filterQuery]);

  // useEffect(() => {
  //   setLoading(true);
  //   setError(false);
  //   let cancelToken;
  //   axios({
  //     method: "GET",
  //     url: `https://openlibrary.org/search.json?page=${page}&q=${filterQuery}`,
  //     cancelToken: new axios.CancelToken((c) => (cancelToken = c))
  //   })
  //     .then((res) => {
  //       setBooks((prevBooks) => {
  //         return [
  //           ...new Set([...prevBooks, ...res.data.docs.map((b) => b.title)])
  //         ];
  //       });
  //       setLoading(false);
  //       setHasMore(res.data.docs.length > 0);
  //     })
  //     .catch((err) => {
  //       if (axios.isCancel(err)) return;
  //     });
  //   return () => cancelToken();
  // }, [filterQuery, page]);
  const execute = useCallback(
    (page, filterQuery) => {
      setSuccess(false);
      setLoading(true);
      setError(false);
      setBooks([]);
      let cancelToken;
      axios({
        method: "GET",
        url: url1,
        cancelToken: new axios.CancelToken((c) => (cancelToken = c))
      })
        .then((res) => {
          setBooks(res.data);
          setSuccess(true);
          setLoading(false);
          setHasMore(res.data.docs.length > 0);
        })
        .catch((err) => {
          if (axios.isCancel(err)) {
            console.log("request cancelled", err.message);
          }
        });
      return () => cancelToken();
    },
    [filterQuery, page]
  );

  return { books, loading, hasMore, success, error, execute };
};

export default useFetchData;
