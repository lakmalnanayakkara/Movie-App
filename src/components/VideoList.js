import React, { useEffect, useState } from "react";
import tmdbApi from "../api/TmdbApi";
import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

export default function VideoList(props) {
  const { id } = props;
  const [videoList, setVideoList] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await tmdbApi.getVideos(id);
      setVideoList(result.results.slice(0, 5));
    };
    fetchData();
  }, [id]);
  return (
    <Grid
      container
      spacing={4}
      justifyContent="center"
      sx={{ display: "flex", flexDirection: "row", width: "100%" }}
    >
      {videoList.map((item, i) => (
        <Grid
          item
          xs={12}
          key={i}
          sx={{ display: "flex", flexDirection: "row", width: "100%" }}
        >
          <Card sx={{ boxShadow: 3, borderRadius: 3, width: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.name}
              </Typography>
            </CardContent>
            <Box
              sx={{
                position: "relative",
                paddingTop: "56.25%",
              }}
            >
              <iframe
                src={`https://www.youtube.com/embed/${item.key}`}
                title={item.name}
                allowFullScreen
                frameBorder="0"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  border: "none",
                  borderRadius: "0 0 12px 12px",
                }}
              />
            </Box>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
