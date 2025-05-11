import { useEffect, useReducer, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import tmdbApi from "../api/TmdbApi";
import {
  Box,
  Typography,
  Button,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  Container,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import Movie from "../components/Movie";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        movies: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
        loading: false,
      };

    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ratings = [
  {
    name: "9 stars & up",
    rating: 9,
  },
  {
    name: "8 stars & up",
    rating: 8,
  },
  {
    name: "7 stars & up",
    rating: 7,
  },
  {
    name: "6 stars & up",
    rating: 6,
  },
  {
    name: "5 stars & up",
    rating: 5,
  },
  {
    name: "4 stars & up",
    rating: 4,
  },
  {
    name: "3 stars & up",
    rating: 3,
  },
  {
    name: "2 stars & up",
    rating: 2,
  },
  {
    name: "1 stars & up",
    rating: 1,
  },
];

export default function SearchMoviesScreen() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const rating = sp.get("rating") || "all";
  const page = sp.get("page") || 1;

  const [{ loading, movies, error, pages }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    movies: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: page,

        with_genres: category,
        with_keywords: query,
      };
      try {
        const result = await tmdbApi.search({ params });
        dispatch({ type: "FETCH_SUCCESS", payload: result.results });
        console.log(result);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [error, category, page, query, rating]);

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await tmdbApi.getGenres();
        console.log(result);

        setCategories(result.genres);
      } catch (error) {
        //toast.error(getError(error));
      }
    };
    fetchCategories();
  }, [dispatch]);

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || page;
    const filterCategory = filter.category || category;
    const filterQuery = filter.query || query;
    const filterRating = filter.rating || rating;

    const searchParams = new URLSearchParams({
      category: filterCategory,
      query: filterQuery,
      rating: filterRating,
      page: filterPage,
    });

    return `/search?${searchParams.toString()}`;
  };
  return (
    <Box sx={{ padding: 2 }}>
      <Helmet>
        <title>Search Products</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="category-label">Movie Genre</InputLabel>
            <Select
              labelId="category-label"
              value={category}
              label="Movie Genre"
              onChange={(e) =>
                navigate(getFilterUrl({ category: e.target.value, page: 1 }))
              }
            >
              <MenuItem value="all">Any</MenuItem>
              {categories.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="rating-label">Rating</InputLabel>
            <Select
              labelId="rating-label"
              value={rating}
              label="Rating"
              onChange={(e) =>
                navigate(getFilterUrl({ rating: e.target.value, page: 1 }))
              }
            >
              <MenuItem value="all">Any</MenuItem>
              {ratings.map((r) => (
                <MenuItem key={r.rating} value={r.rating}>
                  {r.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Container>
          {loading ? (
            <LoadingBox />
          ) : error ? (
            <MessageBox severity="error">{error}</MessageBox>
          ) : (
            <>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Grid item>
                  <Typography variant="subtitle1">
                    Results
                    {query !== "all" && ` : ${query}`}
                    {category !== "all" && ` : ${category}`}
                    {rating !== "all" && ` : ${rating} & up`}
                    {(query !== "all" ||
                      category !== "all" ||
                      rating !== "all") && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate("/search")}
                        sx={{ ml: 1 }}
                      >
                        <i className="fas fa-times-circle" />
                      </Button>
                    )}
                  </Typography>
                </Grid>
              </Grid>
              {movies.length === 0 ? (
                <Alert severity="info">No Product Found</Alert>
              ) : (
                <>
                  <Grid
                    container
                    spacing={2}
                    sx={{ display: "flex", flexDirection: "row" }}
                  >
                    {movies.map((movie) => (
                      <Grid
                        item
                        key={movie.title}
                        size={{ xs: 12, sm: 3, md: 3 }}
                      >
                        <Movie movie={movie} />
                      </Grid>
                    ))}
                  </Grid>
                  <Button
                    sx={{ mt: 3 }}
                    variant="contained"
                    onClick={() => {
                      getFilterUrl({ page: page + 1 });
                    }}
                  >
                    Lord More
                  </Button>
                </>
              )}

              <Box
                mt={3}
                display="flex"
                justifyContent="center"
                flexWrap="wrap"
              >
                {[...Array(pages).keys()].map((x) => (
                  <Button
                    key={x + 1}
                    variant={Number(page) === x + 1 ? "contained" : "outlined"}
                    sx={{ m: 0.5 }}
                    component={Link}
                    to={getFilterUrl({ page: x + 1 })}
                  >
                    {x + 1}
                  </Button>
                ))}
              </Box>
            </>
          )}
        </Container>
      </Grid>
    </Box>
  );
}
