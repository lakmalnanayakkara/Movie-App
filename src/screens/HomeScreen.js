import { Button, Container, Grid, Typography } from "@mui/material";
import { useEffect, useReducer, useState } from "react";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Movie from "../components/Movie";
import tmdbApi from "../api/TmdbApi";
import { Helmet } from "react-helmet-async";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        movies: [...state.movies, ...action.payload],
        loading: false,
      };
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
  const [page, setPage] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: page,
      };
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await tmdbApi.getMoviesList({ params });
        dispatch({ type: "FETCH_SUCCESS", payload: result.results });
        console.log(result);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [page]);

  return (
    <Container>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <Helmet>
            <title>THEATER | Home</title>
          </Helmet>
          <Typography variant="h3" component="h1" gutterBottom>
            Featured Movies
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {movies.map((movie) => (
              <Grid item key={movie.title} size={{ xs: 12, sm: 3, md: 3 }}>
                <Movie movie={movie} />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            onClick={() => {
              setPage(page + 1);
            }}
          >
            Lord More
          </Button>
        </>
      )}
    </Container>
  );
}
