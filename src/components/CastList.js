import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import tmdbApi from "../api/TmdbApi";
import apiConfig from "../api/ApiConfig";

export default function CastList(props) {
  const [castList, setCastList] = useState([]);
  const { id } = props;
  useEffect(() => {
    const fetchData = async () => {
      const result = await tmdbApi.credits(id);
      setCastList(result.cast.slice(0, 5));
    };
    fetchData();
  }, [id]);
  return (
    <Grid container spacing={2} sx={{ justifyContent: "center" }}>
      {castList.map((cast, index) => (
        <Grid item key={index}>
          <Avatar
            alt={cast.name}
            src={apiConfig.w500Image(cast.profile_path)}
            sx={{
              width: 100,
              height: 100,
              borderRadius: 2,
            }}
          />
          <Typography variant="body2" align="center" sx={{ width: 100 }}>
            {cast.name}
          </Typography>
        </Grid>
      ))}
    </Grid>
  );
}
