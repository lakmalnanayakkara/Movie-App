import React, { useEffect, useState } from "react";
import tmdbApi from "../api/TmdbApi";
import Movie from "./Movie";
import { Box, Grid } from "@mui/material";

export default function MovieList(props) {
  const { id } = props;
  const [similaMovies, setSimilarMovies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await tmdbApi.similar(id);
      setSimilarMovies(result.results);
    };
    fetchData();
  }, [id]);
  return (
    <Box sx={{ overflowX: "auto", padding: 2 }}>
      <Grid container spacing={2} wrap="nowrap">
        {similaMovies.map((item, i) => (
          <Grid
            item
            key={i}
            sx={{
              flex: "0 0 auto",
              width: { xs: "40%", sm: "30%", md: "15%" },
            }}
          >
            <Movie movie={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
