import { useEffect, useState } from "react";
import useFetch from "./hook/useFetch";
import useTimer from "./hook/useTimer";
import "./styles.css";

export default function App() {
  const { value, startTimer, pauseTimer, resetTimer } = useTimer({
    initialValue: 20
  });
  const [page, setPage] = useState(1);
  const [url, setUrl] = useState("https://api.github.com/search/users?q=masai");
  const { loading, data, isError, fetchRequest } = useFetch(
    url + `&page=${page}`
  );
  console.log(data);

  useEffect(() => {
    fetchRequest();
  }, []);
  return (
    <div className="App">
      <h1>Timer</h1>
      <h2>{value}!</h2>
      <button onClick={startTimer}>START</button>
      <button onClick={pauseTimer}>PAUSE</button>
      <button onClick={resetTimer}>RESET</button>
      <div>USE FETCH</div>
      <div>{loading && "LOADING"}</div>
      <div>
        {!loading &&
          data?.items?.map((item) => <div key={item.login}>{item.login}</div>)}
      </div>
      <div>
        <button onClick={() => setPage((prev) => prev + 1)}>NEXT</button>
      </div>
    </div>
  );
}
