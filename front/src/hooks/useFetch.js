import { useCallback, useState } from "react";

function useFetch() {
  const [isLoading, setIsLoading] = useState();
  const [error, setError] = useState();

  const getData = useCallback(async function (applyFn, type) {
    setIsLoading(true);

    const url = `https://textiles-hy2022.herokuapp.com/api/${type}`;

    try {
      const res = await fetch(url);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      console.log(data);
      applyFn(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  const setData = useCallback(async function (dataToSend, applyFn, type) {
    setIsLoading(true);

    const url = `https://textiles-hy2022.herokuapp.com/${type}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          authorization: "Basic " + window.btoa("user:password"),
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(res);

      if (!res.ok) throw new Error("Something went wrong");

      const data = await res.json();

      console.log(data);
      applyFn(data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
    setIsLoading(false);
  }, []);

  return { getData, setData, error, isLoading };
}
export default useFetch;
