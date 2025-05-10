import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import tmdbApi from "../api/TmdbApi";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import apiConfig from "../api/ApiConfig";
import { Helmet } from "react-helmet-async";
import {
  Box,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Rating,
  Stack,
  Typography,
} from "@mui/material";
import CastList from "../components/CastList";
import VideoList from "../components/VideoList";
import MovieList from "../components/MovieList";
import roundNumber from "./../components/Util";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, movie: action.payload, loading: false };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default function MovieScreen() {
  const params = useParams();
  const { id } = params;

  const [{ loading, error, movie }, dispatch] = useReducer(reducer, {
    movie: {},
    loading: true,
    error: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      const params = {};
      dispatch({ type: "FETCH_REQUEST" });
      try {
        const result = await tmdbApi.detail(id, { params });
        dispatch({ type: "FETCH_SUCCESS", payload: result });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: err.message });
      }
    };
    fetchData();
  }, [id]);

  return (
    <Container sx={{ padding: 0 }}>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox severity="error">{error}</MessageBox>
      ) : (
        <>
          <Helmet>
            <title>THEATER | {movie.title}</title>
          </Helmet>
          <Grid
            container
            sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <Grid size={{ xs: 12, sm: 6, md: 6 }}>
              <img
                src={apiConfig.w500Image(movie.poster_path)}
                alt="img"
                style={{ borderRadius: 20, width: "100%", height: "auto" }}
              />
            </Grid>
            <Grid
              size={{ xs: 12, sm: 12, md: 6 }}
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <Stack direction="column">
                <Box sx={{ width: "100%" }}>
                  <List>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h2" component="h2">
                          {movie.title}
                        </Typography>
                        <Typography
                          variant="h4"
                          component="h2"
                          sx={{ fontStyle: "italic" }}
                        >
                          {movie.tagline}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="p" component="p">
                          {movie.overview}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <ListItem>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                        {movie.genres.map((item, i) => (
                          <Box
                            key={i}
                            sx={{
                              padding: "6px 14px",
                              backgroundColor: "#333",
                              color: "#fff",
                              borderRadius: "16px",
                              fontSize: "14px",
                              fontWeight: 500,
                            }}
                          >
                            {item.name}
                          </Box>
                        ))}
                      </Box>
                    </ListItem>
                    <ListItem>
                      <Rating
                        name="half-rating-read"
                        defaultValue={roundNumber(movie.vote_average)}
                        precision={0.5}
                        max={10}
                        readOnly
                      />
                    </ListItem>
                  </List>
                </Box>
                <Box sx={{ width: "100%" }}>
                  <Grid xs={12}>
                    <ListItem>
                      <ListItemText>
                        <Typography variant="h4" component="h2">
                          Casts
                        </Typography>
                      </ListItemText>
                    </ListItem>
                    <CastList id={movie.id} />
                  </Grid>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <Box sx={{ width: "100%", mt: 4 }}>
            <VideoList id={movie.id} />
          </Box>
          {/* <Box sx={{ display: "flex", width: "100%", mt: 4 }}>
            <MovieList id={movie.id}></MovieList>
          </Box> */}
        </>
      )}
    </Container>
  );
}
