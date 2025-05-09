import { Container } from "@mui/material";
import { useEffect, useReducer } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Movie from "../components/Movie";
import tmdbApi from "../api/TmdbApi";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, movies: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function HomeScreen() {
  const [{ loading, error, movies }, dispatch] = useReducer(reducer, {
    movies: [],
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const params = {};
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await tmdbApi.getMoviesList({ params });
        dispatch({ type: "FETCH_SUCCESS", payload: result.results });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, []);

  return (
    <Container>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <div>
          {movies.map((movie) => (
            <Movie movie={movie} />
          ))}
        </div>
      )}
    </Container>
  );
}
