import React from "react";
import { useContext } from "react";
import { Store } from "../components/Store";
import { Container, Grid, Typography } from "@mui/material";
import { Helmet } from "react-helmet-async";
import Movie from "../components/Movie";
import MessageBox from "../components/MessageBox";

export default function FavMoviesScreen() {
  const { state } = useContext(Store);
  const { savedMovies } = state;
  console.log(savedMovies.length);

  return (
    <Container>
      {savedMovies == 0 ? (
        <MessageBox severity="info">
          {"There is no any favorite movie."}
        </MessageBox>
      ) : (
        <>
          <Helmet>
            <title>THEATER | favorites</title>
          </Helmet>
          <Typography variant="h3" component="h1" gutterBottom>
            Your Favorites
          </Typography>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "row" }}
          >
            {savedMovies.map((movie) => (
              <Grid item key={movie.title} size={{ xs: 12, sm: 3, md: 3 }}>
                <Movie movie={movie} />
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
}
